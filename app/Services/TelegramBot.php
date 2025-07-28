<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramBot
{
    private ?string $token;
    private ?string $chatId;
    private string $webhookUrl;

    public function __construct()
    {
        // Получаем настройки только из базы данных
        $this->token = $this->getSetting('telegram_bot_token');
        $this->chatId = $this->getSetting('telegram_chat_id');
        $this->webhookUrl = $this->getWebhookUrl();
    }

    /**
     * Формирование URL webhook на основе адреса приложения
     */
    private function getWebhookUrl(): string
    {
        $baseUrl = config('app.url');
        
        if (empty($baseUrl) || $baseUrl === 'http://localhost') {
            Log::warning('APP_URL не настроен или установлен localhost. Webhook может не работать.');
        }
        
        $webhookPath = '/api/telegram/webhook';
        return rtrim($baseUrl, '/') . $webhookPath;
    }

    /**
     * Получение настройки из базы данных
     */
    private function getSetting(string $code): ?string
    {
        try {
            $value = \App\Models\Setting::getByCode($code);
            return $value ? (string) $value : null;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Отправка сообщения в группу
     */
    public function sendMessage(string $message): bool
    {
        if (empty($this->token)) {
            Log::warning('Telegram bot token not configured. Cannot send message.');
            return false;
        }

        if (empty($this->chatId)) {
            Log::warning('Telegram chat ID not configured. Cannot send message.');
            return false;
        }

        try {
            $response = Http::post("https://api.telegram.org/bot{$this->token}/sendMessage", [
                'chat_id' => $this->chatId,
                'text' => $message,
                'parse_mode' => 'HTML'
            ]);

            if ($response->successful()) {
                Log::info('Telegram message sent successfully', [
                    'chat_id' => $this->chatId,
                    'response' => $response->json()
                ]);
                return true;
            }

            Log::error('Failed to send Telegram message', [
                'response' => $response->json(),
                'status' => $response->status()
            ]);
            return false;
        } catch (\Exception $e) {
            Log::error('Exception while sending Telegram message', [
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Установка webhook для получения updates
     */
    public function setWebhook(): bool
    {
        if (empty($this->token)) {
            Log::warning('Telegram bot token not configured. Cannot set webhook.');
            return false;
        }

        try {
            $response = Http::post("https://api.telegram.org/bot{$this->token}/setWebhook", [
                'url' => $this->webhookUrl,
                'allowed_updates' => ['message', 'callback_query']
            ]);

            if ($response->successful()) {
                Log::info('Telegram webhook set successfully', [
                    'webhook_url' => $this->webhookUrl,
                    'response' => $response->json()
                ]);
                return true;
            }

            Log::error('Failed to set Telegram webhook', [
                'response' => $response->json(),
                'status' => $response->status()
            ]);
            return false;
        } catch (\Exception $e) {
            Log::error('Exception while setting Telegram webhook', [
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Удаление webhook
     */
    public function deleteWebhook(): bool
    {
        if (empty($this->token)) {
            Log::warning('Telegram bot token not configured. Cannot delete webhook.');
            return false;
        }

        try {
            $response = Http::post("https://api.telegram.org/bot{$this->token}/deleteWebhook");

            if ($response->successful()) {
                Log::info('Telegram webhook deleted successfully');
                return true;
            }

            Log::error('Failed to delete Telegram webhook', [
                'response' => $response->json(),
                'status' => $response->status()
            ]);
            return false;
        } catch (\Exception $e) {
            Log::error('Exception while deleting Telegram webhook', [
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Получение информации о боте
     */
    public function getBotInfo(): ?array
    {
        if (empty($this->token)) {
            Log::warning('Telegram bot token not configured. Cannot get bot info.');
            return null;
        }

        try {
            $response = Http::get("https://api.telegram.org/bot{$this->token}/getMe");

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Failed to get bot info', [
                'response' => $response->json(),
                'status' => $response->status()
            ]);
            return null;
        } catch (\Exception $e) {
            Log::error('Exception while getting bot info', [
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    /**
     * Получение последних updates
     */
    public function getUpdates(): ?array
    {
        if (empty($this->token)) {
            Log::warning('Telegram bot token not configured. Cannot get updates.');
            return null;
        }

        try {
            $response = Http::get("https://api.telegram.org/bot{$this->token}/getUpdates", [
                'limit' => 10,
                'timeout' => 0
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Failed to get updates', [
                'response' => $response->json(),
                'status' => $response->status()
            ]);
            return null;
        } catch (\Exception $e) {
            Log::error('Exception while getting updates', [
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    /**
     * Форматирование сообщения формы для Telegram
     */
    public function formatFormMessage(array $formData): string
    {
        $message = "📝 <b>Новая заявка с сайта</b>\n\n";
        $message .= "👤 <b>Имя:</b> " . htmlspecialchars($formData['name']) . "\n";
        $message .= "📞 <b>Телефон:</b> " . htmlspecialchars($formData['phone']) . "\n";
        
        if (!empty($formData['email'])) {
            $message .= "📧 <b>Email:</b> " . htmlspecialchars($formData['email']) . "\n";
        }
        
        $message .= "💬 <b>Сообщение:</b>\n" . htmlspecialchars($formData['message']) . "\n\n";
        $message .= "🕐 <b>Время:</b> " . now()->format('d.m.Y H:i:s');

        return $message;
    }

    /**
     * Получение текущего webhook URL
     */
    public function getCurrentWebhookUrl(): string
    {
        return $this->webhookUrl;
    }

    /**
     * Ответ на callback query
     */
    public function answerCallbackQuery(string $callbackQueryId, ?string $text = null): bool
    {
        if (empty($this->token)) {
            Log::warning('Telegram bot token not configured. Cannot answer callback query.');
            return false;
        }

        try {
            $data = [];
            if ($text) {
                $data['text'] = $text;
            }

            $response = Http::post("https://api.telegram.org/bot{$this->token}/answerCallbackQuery", [
                'callback_query_id' => $callbackQueryId,
                ...$data
            ]);

            return $response->successful();
        } catch (\Exception $e) {
            Log::error('Exception while answering callback query', [
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }
} 