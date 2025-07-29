<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use App\Services\TelegramBot;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class TelegramSettings extends Page
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';
    protected static ?string $navigationGroup = 'Настройки';
    protected static ?string $title = 'Настройки Telegram';
    protected static ?string $slug = 'telegram-settings';
    protected static string $view = 'filament.pages.home-settings';

    public ?array $data = [];
    public ?string $telegram_bot_token = '';
    public ?string $telegram_chat_id = '';

    public function mount(): void
    {
        $this->form->fill($this->getFormData());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Настройки Telegram бота')
                    ->description('Настройте параметры для работы с Telegram ботом')
                    ->schema([
                        Forms\Components\TextInput::make('telegram_bot_token')
                            ->label('Токен бота')
                            ->required()
                            ->autocomplete('new-password')
                            ->helperText('Получите токен у @BotFather в Telegram')
                            ->password(),

                        Forms\Components\TextInput::make('telegram_chat_id')
                            ->autocomplete('new-password')
                            ->label('ID группы')
                            ->helperText('ID группы, куда будут отправляться сообщения (отрицательное число). Можно заполнить позже после получения ID.'),

                        Forms\Components\Placeholder::make('webhook_url_info')
                            ->label('URL webhook')
                            ->content(fn() => config('app.url') . '/api/telegram/webhook')
                            ->helperText('URL webhook формируется автоматически на основе адреса приложения'),
                    ])
                    ->columns(1),

                Forms\Components\Section::make('Тестирование')
                    ->description('Проверьте работу бота')
                    ->schema([
                        Forms\Components\Actions::make([
                            Forms\Components\Actions\Action::make('test_bot')
                                ->label('Тест бота')
                                ->icon('heroicon-o-play')
                                ->action('testBot')
                                ->color('success'),

                            Forms\Components\Actions\Action::make('set_webhook')
                                ->label('Установить webhook')
                                ->icon('heroicon-o-link')
                                ->action('setWebhook')
                                ->color('info'),

                            Forms\Components\Actions\Action::make('delete_webhook')
                                ->label('Удалить webhook')
                                ->icon('heroicon-o-trash')
                                ->action('deleteWebhook')
                                ->color('danger'),

                            Forms\Components\Actions\Action::make('get_updates')
                                ->label('Последние updates')
                                ->icon('heroicon-o-chat-bubble-left-ellipsis')
                                ->action('getUpdates')
                                ->color('warning'),
                        ])
                    ])
            ]);
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach ($data as $code => $value) {
            // Преобразуем NULL в пустую строку для сохранения в БД
            $value = $value ?? '';
            Setting::set($code, $value);
        }

        Notification::make()
            ->title('Настройки сохранены')
            ->success()
            ->send();
    }

    private function getFormData(): array
    {
        $this->telegram_bot_token = Setting::getByCode('telegram_bot_token') ?? '';
        $this->telegram_chat_id = Setting::getByCode('telegram_chat_id') ?? '';

        return [
            'telegram_bot_token' => $this->telegram_bot_token,
            'telegram_chat_id' => $this->telegram_chat_id,
        ];
    }

    protected function getFormActions(): array
    {
        return [
            \Filament\Actions\Action::make('save')
                ->label('Сохранить настройки')
                ->submit('save')
                ->color('primary'),
        ];
    }


    public function testBot(): void
    {
        try {
            $telegramBot = new TelegramBot();
            $testMessage = "🧪 <b>Тестовое сообщение</b>\n\n";
            $testMessage .= "Это тестовое сообщение от панели администратора.\n";
            $testMessage .= "🕐 Время: " . now()->format('d.m.Y H:i:s');

            if ($telegramBot->sendMessage($testMessage)) {
                Notification::make()
                    ->title('Тест успешен')
                    ->body('Сообщение отправлено в Telegram')
                    ->success()
                    ->send();
            } else {
                Notification::make()
                    ->title('Ошибка отправки')
                    ->body('Не удалось отправить сообщение')
                    ->danger()
                    ->send();
            }
        } catch (\Exception $e) {
            Notification::make()
                ->title('Ошибка')
                ->body('Произошла ошибка: ' . $e->getMessage())
                ->danger()
                ->send();
        }
    }

    public function setWebhook(): void
    {
        try {
            $telegramBot = new TelegramBot();

            if ($telegramBot->setWebhook()) {
                Notification::make()
                    ->title('Webhook установлен')
                    ->body('Webhook успешно настроен')
                    ->success()
                    ->send();
            } else {
                Notification::make()
                    ->title('Ошибка')
                    ->body('Не удалось установить webhook')
                    ->danger()
                    ->send();
            }
        } catch (\Exception $e) {
            Notification::make()
                ->title('Ошибка')
                ->body('Произошла ошибка: ' . $e->getMessage())
                ->danger()
                ->send();
        }
    }

    public function deleteWebhook(): void
    {
        try {
            $telegramBot = new TelegramBot();

            if ($telegramBot->deleteWebhook()) {
                Notification::make()
                    ->title('Webhook удален')
                    ->body('Webhook успешно удален')
                    ->success()
                    ->send();
            } else {
                Notification::make()
                    ->title('Ошибка')
                    ->body('Не удалось удалить webhook')
                    ->danger()
                    ->send();
            }
        } catch (\Exception $e) {
            Notification::make()
                ->title('Ошибка')
                ->body('Произошла ошибка: ' . $e->getMessage())
                ->danger()
                ->send();
        }
    }

    public function getUpdates(): void
    {
        try {
            $telegramBot = new TelegramBot();
            $updates = $telegramBot->getUpdates();

            if ($updates && $updates['ok']) {
                $result = $updates['result'];
                $count = count($result);

                if ($count > 0) {
                    $message = "📋 <b>Последние updates ({$count}):</b>\n\n";

                    foreach ($result as $index => $update) {
                        $message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
                        $message .= "<b>Update #" . ($index + 1) . "</b>\n";
                        $message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
                        $message .= "🆔 <b>Update ID:</b> " . $update['update_id'] . "\n";

                        if (isset($update['message'])) {
                            $msg = $update['message'];
                            $chat = $msg['chat'];

                            $message .= "📨 <b>Тип:</b> Сообщение\n";
                            $message .= "👤 <b>От:</b> " . ($msg['from']['first_name'] ?? 'Unknown') . "\n";
                            $message .= "💬 <b>Текст:</b> " . ($msg['text'] ?? 'Нет текста') . "\n";
                            $message .= "🕐 <b>Время:</b> " . date('d.m.Y H:i:s', $msg['date']) . "\n";
                            $message .= "📱 <b>Chat ID:</b> " . ($chat['id'] ?? 'Unknown') . "\n";
                            $message .= "🏷️ <b>Chat Type:</b> " . ($chat['type'] ?? 'Unknown') . "\n";

                            if (isset($chat['title'])) {
                                $message .= "📛 <b>Chat Title:</b> " . $chat['title'] . "\n";
                            }

                        } elseif (isset($update['callback_query'])) {
                            $callback = $update['callback_query'];
                            $chat = $callback['message']['chat'];

                            $message .= "🔘 <b>Тип:</b> Callback Query\n";
                            $message .= "👤 <b>От:</b> " . ($callback['from']['first_name'] ?? 'Unknown') . "\n";
                            $message .= "📝 <b>Данные:</b> " . ($callback['data'] ?? 'Нет данных') . "\n";
                            $message .= "📱 <b>Chat ID:</b> " . ($chat['id'] ?? 'Unknown') . "\n";
                            $message .= "🏷️ <b>Chat Type:</b> " . ($chat['type'] ?? 'Unknown') . "\n";

                            if (isset($chat['title'])) {
                                $message .= "📛 <b>Chat Title:</b> " . $chat['title'] . "\n";
                            }
                        }

                        $message .= "\n";
                    }
                } else {
                    $message = "📭 <b>Нет новых updates</b>\n\n";
                    $message .= "Бот не получал новых сообщений или команд.\n";
                    $message .= "Попробуйте отправить сообщение боту и нажать кнопку снова.";
                }

                Notification::make()
                    ->title('Updates получены')
                    ->body($message)
                    ->success()
                    ->send();
            } else {
                Notification::make()
                    ->title('Ошибка получения updates')
                    ->body('Не удалось получить updates от Telegram')
                    ->danger()
                    ->send();
            }
        } catch (\Exception $e) {
            Notification::make()
                ->title('Ошибка')
                ->body('Произошла ошибка: ' . $e->getMessage())
                ->danger()
                ->send();
        }
    }
}
