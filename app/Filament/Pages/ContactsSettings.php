<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ContactsSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationLabel = 'Контакты';
    protected static ?string $navigationGroup = 'Настройки';
    protected static string $view = 'filament.pages.home-settings';

    public array $data = [];

    protected $keys = [
        'contacts_description',
        'contacts_sub_description',
        'contacts_image',
        'contacts_image_description',
    ];

    public function mount(): void
    {
        $data = [];
        foreach ($this->keys as $key) {
            $data[$key] = Setting::getByCode($key);
        }
        $this->form->fill($data);
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
            MarkdownEditor::make('contacts_description')
                ->label('Текст 1й блок')
                ->columnSpanFull(),
            MarkdownEditor::make('contacts_sub_description')
                ->label('Текст над изображением')
                ->columnSpanFull(),
            FileUpload::make('contacts_image')
                ->label('Изображение')
                ->image(),
            MarkdownEditor::make('contacts_image_description')
                ->label('Текст под изображением')
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
            if ($val) Setting::set($key, $val);
        }

        Notification::make()
            ->title('Настройки сохранены')
            ->success()
            ->send();
    }
}
