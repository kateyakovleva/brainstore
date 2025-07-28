<?php

namespace App\Console\Commands;

use App\Services\TelegramBot;
use Illuminate\Console\Command;

class TelegramBotCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'telegram:bot {action : Action to perform (set-webhook, delete-webhook, info, test, updates)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manage Telegram bot webhook and settings';

    private TelegramBot $telegramBot;

    public function __construct(TelegramBot $telegramBot)
    {
        parent::__construct();
        $this->telegramBot = $telegramBot;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $action = $this->argument('action');

        switch ($action) {
            case 'set-webhook':
                $this->setWebhook();
                break;
            case 'delete-webhook':
                $this->deleteWebhook();
                break;
            case 'info':
                $this->getBotInfo();
                break;
            case 'test':
                $this->testMessage();
                break;
            case 'updates':
                $this->getUpdates();
                break;
            default:
                $this->error("Unknown action: {$action}");
                $this->info('Available actions: set-webhook, delete-webhook, info, test, updates');
                return 1;
        }

        return 0;
    }

    /**
     * Установка webhook
     */
    private function setWebhook(): void
    {
        $this->info('Setting Telegram webhook...');

        if ($this->telegramBot->setWebhook()) {
            $this->info('✅ Webhook set successfully!');
        } else {
            $this->error('❌ Failed to set webhook');
        }
    }

    /**
     * Удаление webhook
     */
    private function deleteWebhook(): void
    {
        $this->info('Deleting Telegram webhook...');

        if ($this->telegramBot->deleteWebhook()) {
            $this->info('✅ Webhook deleted successfully!');
        } else {
            $this->error('❌ Failed to delete webhook');
        }
    }

    /**
     * Получение информации о боте
     */
    private function getBotInfo(): void
    {
        $this->info('Getting bot info...');

        $botInfo = $this->telegramBot->getBotInfo();

        if ($botInfo && $botInfo['ok']) {
            $bot = $botInfo['result'];
            $this->info('✅ Bot info:');
            $this->line("Name: {$bot['first_name']}");
            $this->line("Username: @{$bot['username']}");
            $this->line("ID: {$bot['id']}");
            $this->line("Can join groups: " . ($bot['can_join_groups'] ? 'Yes' : 'No'));
            $this->line("Can read all group messages: " . ($bot['can_read_all_group_messages'] ? 'Yes' : 'No'));
            $this->line("Webhook URL: " . $this->telegramBot->getCurrentWebhookUrl());
        } else {
            $this->error('❌ Failed to get bot info');
        }
    }

    /**
     * Тестовая отправка сообщения
     */
    private function testMessage(): void
    {
        $this->info('Sending test message...');

        $testMessage = "🧪 <b>Тестовое сообщение</b>\n\n";
        $testMessage .= "Это тестовое сообщение от бота.\n";
        $testMessage .= "🕐 Время: " . now()->format('d.m.Y H:i:s');

        if ($this->telegramBot->sendMessage($testMessage)) {
            $this->info('✅ Test message sent successfully!');
        } else {
            $this->error('❌ Failed to send test message');
        }
    }

    /**
     * Получение последних updates
     */
    private function getUpdates(): void
    {
        $this->info('Getting recent updates...');

        $updates = $this->telegramBot->getUpdates();

        if ($updates && $updates['ok']) {
            $result = $updates['result'];
            $count = count($result);
            
            $this->info("✅ Found {$count} updates:");
            
            if ($count > 0) {
                foreach ($result as $index => $update) {
                    $this->line("\n--- Update #" . ($index + 1) . " ---");
                    $this->line("ID: " . $update['update_id']);
                    
                    if (isset($update['message'])) {
                        $msg = $update['message'];
                        $this->line("Type: Message");
                        $this->line("Chat ID: " . ($msg['chat']['id'] ?? 'Unknown'));
                        $this->line("Chat Type: " . ($msg['chat']['type'] ?? 'Unknown'));
                        if (isset($msg['chat']['title'])) {
                            $this->line("Chat Title: " . $msg['chat']['title']);
                        }
                        $this->line("From: " . ($msg['from']['first_name'] ?? 'Unknown'));
                        $this->line("Text: " . ($msg['text'] ?? 'No text'));
                        $this->line("Time: " . date('d.m.Y H:i:s', $msg['date']));
                    } elseif (isset($update['callback_query'])) {
                        $callback = $update['callback_query'];
                        $this->line("Type: Callback Query");
                        $this->line("Chat ID: " . ($callback['message']['chat']['id'] ?? 'Unknown'));
                        $this->line("From: " . ($callback['from']['first_name'] ?? 'Unknown'));
                        $this->line("Data: " . ($callback['data'] ?? 'No data'));
                    }
                }
            } else {
                $this->line("📭 No recent updates found");
            }
        } else {
            $this->error('❌ Failed to get updates');
        }
    }
} 