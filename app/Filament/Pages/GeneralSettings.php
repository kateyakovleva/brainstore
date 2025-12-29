<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class GeneralSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationLabel = 'Общие';
    protected static ?string $navigationGroup = 'Настройки';
    protected static string $view = 'filament.pages.general-settings';

    public array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'header_menu' => Setting::getByCode('header_menu'),
            'phone' => Setting::getByCode('phone'),
            'address' => Setting::getByCode('address'),
            'tg' => Setting::getByCode('tg'),
            'vk' => Setting::getByCode('vk'),
            'email' => Setting::getByCode('email'),
            'meta_title' => Setting::getByCode('meta_title'),
            'meta_description' => Setting::getByCode('meta_description'),
            'meta_keywords' => Setting::getByCode('meta_keywords'),
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema($this->getFormSchema())
            ->statePath('data');
    }

    protected function getFormSchema(): array
    {
        return [
            Builder::make('header_menu')
                ->label('Меню')
                ->blocks([
                    Builder\Block::make('link')
                        ->label('Ссылка')
                        ->schema([
                            TextInput::make('name')
                                ->placeholder('Название')
                                ->hiddenLabel()
                                ->columnSpan(1),
                            TextInput::make('link')
                                ->hiddenLabel()
                                ->placeholder('Ссылка')
                                ->columnSpan(1),
                            Toggle::make('status')
                                ->label('Включено'),
                        ])->columns(3)
                ])->columns(3)
                ->addActionLabel('Добавить ссылку')
                ->columnSpanFull(),
            TextInput::make('phone')
                ->label('Телефон')
                ->required()
                ->columnSpanFull(),
            TextInput::make('email')
                ->label('Email')
                ->required()
                ->columnSpanFull(),
            TextInput::make('address')
                ->label('Адрес')
                ->required()
                ->columnSpanFull(),
            TextInput::make('tg')
                ->label('Телеграм')
                ->required()
                ->columnSpanFull(),
            TextInput::make('vk')
                ->label('VK')
                ->required()
                ->columnSpanFull(),
            Section::make('Мета-теги')
                ->description('Настройки для SEO оптимизации сайта')
                ->schema([
                    TextInput::make('meta_title')
                        ->label('Meta Title')
                        ->placeholder('Заголовок страницы для поисковых систем')
                        ->maxLength(60)
                        ->helperText('Рекомендуемая длина: 50-60 символов')
                        ->columnSpanFull(),
                    Textarea::make('meta_description')
                        ->label('Meta Description')
                        ->placeholder('Описание страницы для поисковых систем')
                        ->rows(3)
                        ->maxLength(160)
                        ->helperText('Рекомендуемая длина: 150-160 символов')
                        ->columnSpanFull(),
                    TextInput::make('meta_keywords')
                        ->label('Meta Keywords')
                        ->placeholder('Ключевые слова через запятую')
                        ->helperText('Введите ключевые слова, разделенные запятыми')
                        ->columnSpanFull(),
                ])
                ->columnSpanFull(),
        ];
    }

    protected function getFormActions(): array
    {
        return [
            \Filament\Actions\Action::make('save')
                ->label('Сохранить')
                ->submit('save')
        ];
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach ($data as $key => $val) {
            Setting::set($key, $val);
        }

        Notification::make()
            ->title('Настройки сохранены')
            ->success()
            ->send();
    }
}
