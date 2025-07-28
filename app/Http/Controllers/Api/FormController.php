<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\FormRequest;
use App\Services\TelegramBot;
use Illuminate\Http\JsonResponse;

class FormController extends Controller
{
    private TelegramBot $telegramBot;

    public function __construct(TelegramBot $telegramBot)
    {
        $this->telegramBot = $telegramBot;
    }

    public function form(FormRequest $request): JsonResponse
    {
        try {
            // Форматируем данные формы для Telegram
            $formData = $request->validated();
            $message = $this->telegramBot->formatFormMessage($formData);

            // Отправляем сообщение в Telegram группу
            $success = $this->telegramBot->sendMessage($message);

            if ($success) {
                return response()->json([
                    'success' => true,
                    'message' => 'Заявка успешно отправлена'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Ошибка отправки заявки'
                ], 500);
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Внутренняя ошибка сервера'
            ], 500);
        }
    }
}
