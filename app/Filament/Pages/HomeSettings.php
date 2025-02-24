<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class HomeSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationLabel = 'Главная';
    protected static ?string $navigationGroup = 'Настройки';
    protected static string $view = 'filament.pages.home-settings';

    public array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'manifest' => Setting::getByCode('manifest'),
            'state_title' => Setting::getByCode('state_title'),
            'state_1' => Setting::getByCode('state_1'),
            'state_2' => Setting::getByCode('state_2'),
            'state_3' => Setting::getByCode('state_3'),
            'formMessage' => Setting::getByCode('formMessage'),
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
            MarkdownEditor::make('manifest')
                ->label('Манифест')
                ->required()
                ->columnSpanFull(),
            MarkdownEditor::make('state_title')
                ->label('Заголовок преимуществ')
                ->required()
                ->columnSpanFull(),
            Grid::make(3)->schema([
                Textarea::make('state_1')
                    ->label('Преимущество 1')
                    ->required()
                    ->columnSpan(1),
                Textarea::make('state_2')
                    ->label('Преимущество 1')
                    ->required()
                    ->columnSpan(1),
                Textarea::make('state_3')
                    ->label('Преимущество 1')
                    ->required()
                    ->columnSpan(1),
            ]),
            MarkdownEditor::make('formMessage')
                ->label('Заголовок в форме контактов')
                ->required()
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
