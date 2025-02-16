<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingResource\Pages;
use App\Filament\Resources\SettingResource\RelationManagers;
use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SettingResource extends Resource
{
    protected static ?string $model = Setting::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $modelLabel = 'Настройки';
    protected static ?string $pluralModelLabel = 'Настройки';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('type')
                    ->disabledOn('edit')
                    ->options([
                        'bool' => 'Переключатель',
                        'string' => 'Строка',
                        'markdown' => 'Текст с форматированием',
                        'tags' => 'Список',
                        'text' => 'Многострочный текст',
                    ])
                    ->default('markdown')
                    ->live()
                    ->afterStateUpdated(fn(Select $component) => $component
                        ->getContainer()
                        ->getComponent('dynamicTypeFields')
                        ->getChildComponentContainer()
                        ->fill()),
                Forms\Components\TextInput::make('key')
                    ->disabledOn('edit')
                    ->label('Код')
                    ->required()
                    ->maxLength(255),
                Grid::make(2)
                    ->schema(fn(Get $get): array => match ($get('type')) {
                        'bool' => [
                            Forms\Components\Toggle::make('value')
                                ->label('Значение'),
                        ],
                        'markdown' => [
                            Forms\Components\MarkdownEditor::make('value')
                                ->label('Значение')
                                ->required()
                                ->columnSpanFull(),
                        ],
                        'tags' => [
                            TagsInput::make('value')
                                ->label('Значение')
                                ->required()
                                ->columnSpanFull(),
                        ],
                        'text' => [
                            Forms\Components\Textarea::make('value')
                                ->label('Значение')
                                ->required()
                                ->columnSpanFull(),
                        ],
                        default => [
                            TextInput::make('value')
                                ->label('Значение')
                                ->required()
                                ->columnSpanFull(),
                        ],
                    })
                    ->key('dynamicTypeFields'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('key')
                    ->label('Код')
                    ->searchable(),
                Tables\Columns\TextColumn::make('value')
                    ->label('Значение')
                    ->limit(30)
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSettings::route('/'),
            'create' => Pages\CreateSetting::route('/create'),
            'edit' => Pages\EditSetting::route('/{record}/edit'),
        ];
    }
}
