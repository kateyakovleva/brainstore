<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TelegramBot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TelegramWebhookController extends Controller
{
    private TelegramBot $telegramBot;

    public function __construct(TelegramBot $telegramBot)
    {
        $this->telegramBot = $telegramBot;
    }

    /**
     * Обработка webhook от Telegram
     */
    public function handle(Request $request)
    {
        try {
            $update = $request->all();
            Log::info('Telegram webhook received', ['update' => $update]);

            // Проверяем, что это валидный update от Telegram
            if (!isset($update['update_id'])) {
                return response()->json(['error' => 'Invalid update format'], 400);
            }

            // Обрабатываем различные типы updates
            if (isset($update['message'])) {
                $this->handleMessage($update['message']);
            } elseif (isset($update['callback_query'])) {
                $this->handleCallbackQuery($update['callback_query']);
            }

            return response()->json(['ok' => true]);

        } catch (\Exception $e) {
            Log::error('Error processing Telegram webhook', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }

    /**
     * Обработка входящих сообщений
     */
    private function handleMessage(array $message): void
    {
        $chatId = $message['chat']['id'];
        $text = $message['text'] ?? '';
        $from = $message['from'] ?? [];

        Log::info('Processing Telegram message', [
            'chat_id' => $chatId,
            'text' => $text,
            'from' => $from
        ]);

        // Обрабатываем команды
        if (str_starts_with($text, '/')) {
            $this->handleCommand($chatId, $text, $from);
            return;
        }

        // Обрабатываем обычные сообщения
        $this->handleRegularMessage($chatId, $text, $from);
    }

    /**
     * Обработка callback query (кнопки)
     */
    private function handleCallbackQuery(array $callbackQuery): void
    {
        $chatId = $callbackQuery['message']['chat']['id'];
        $data = $callbackQuery['data'] ?? '';
        $from = $callbackQuery['from'] ?? [];

        Log::info('Processing Telegram callback query', [
            'chat_id' => $chatId,
            'data' => $data,
            'from' => $from
        ]);

        // Отвечаем на callback query
        $this->telegramBot->answerCallbackQuery($callbackQuery['id']);

        // Обрабатываем данные кнопки
        $this->handleButtonAction($chatId, $data, $from);
    }

    /**
     * Обработка команд бота
     */
    private function handleCommand(int $chatId, string $text, array $from): void
    {
        $command = strtolower(trim($text));

        switch ($command) {
            case '/start':
                $this->sendWelcomeMessage($chatId);
                break;
            case '/help':
                $this->sendHelpMessage($chatId);
                break;
            case '/status':
                $this->sendStatusMessage($chatId);
                break;
            default:
                $this->sendUnknownCommandMessage($chatId);
                break;
        }
    }

    /**
     * Обработка обычных сообщений
     */
    private function handleRegularMessage(int $chatId, string $text, array $from): void
    {
        // Здесь можно добавить логику обработки обычных сообщений
        // Например, сохранение в базу данных, пересылка администратору и т.д.
        
        $response = "📨 Получено сообщение: " . htmlspecialchars($text);
        $this->telegramBot->sendMessage($response);
    }

    /**
     * Обработка действий кнопок
     */
    private function handleButtonAction(int $chatId, string $data, array $from): void
    {
        // Здесь можно добавить логику обработки нажатий на кнопки
        Log::info('Button action received', [
            'chat_id' => $chatId,
            'data' => $data,
            'from' => $from
        ]);
    }

    /**
     * Отправка приветственного сообщения
     */
    private function sendWelcomeMessage(int $chatId): void
    {
        $message = "👋 <b>Добро пожаловать!</b>\n\n";
        $message .= "Я бот для обработки заявок с сайта.\n";
        $message .= "Используйте /help для получения справки.";
        
        $this->telegramBot->sendMessage($message);
    }

    /**
     * Отправка справки
     */
    private function sendHelpMessage(int $chatId): void
    {
        $message = "📋 <b>Доступные команды:</b>\n\n";
        $message .= "/start - Начать работу с ботом\n";
        $message .= "/help - Показать эту справку\n";
        $message .= "/status - Проверить статус бота";
        
        $this->telegramBot->sendMessage($message);
    }

    /**
     * Отправка статуса бота
     */
    private function sendStatusMessage(int $chatId): void
    {
        $botInfo = $this->telegramBot->getBotInfo();
        
        if ($botInfo && $botInfo['ok']) {
            $bot = $botInfo['result'];
            $message = "🤖 <b>Статус бота:</b>\n\n";
            $message .= "✅ Бот активен\n";
            $message .= "👤 Имя: " . $bot['first_name'] . "\n";
            $message .= "🔗 Username: @" . $bot['username'] . "\n";
            $message .= "🆔 ID: " . $bot['id'];
        } else {
            $message = "❌ <b>Ошибка получения статуса бота</b>";
        }
        
        $this->telegramBot->sendMessage($message);
    }

    /**
     * Отправка сообщения о неизвестной команде
     */
    private function sendUnknownCommandMessage(int $chatId): void
    {
        $message = "❓ <b>Неизвестная команда</b>\n\n";
        $message .= "Используйте /help для получения списка доступных команд.";
        
        $this->telegramBot->sendMessage($message);
    }
} 