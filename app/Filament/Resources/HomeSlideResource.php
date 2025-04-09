<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HomeSlideResource\Pages;
use App\Filament\Resources\HomeSlideResource\RelationManagers;
use App\Models\HomeSlide;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class HomeSlideResource extends Resource
{
    protected static ?string $model = HomeSlide::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $modelLabel = 'Слайд';
    protected static ?string $pluralModelLabel = 'Слайды на главной';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Изображение')
                            ->image()
                            ->columnSpan(1),
                        Forms\Components\FileUpload::make('video')
                            ->acceptedFileTypes(['video/*'])
                            ->label('Видео')
                            ->columnSpan(1),
                    ])->columns(2),

                Section::make()
                    ->schema([
                        Forms\Components\FileUpload::make('image_mob')
                            ->label('Изображение для моб.')
                            ->image()
                            ->columnSpan(1),
                        Forms\Components\FileUpload::make('video_mob')
                            ->acceptedFileTypes(['video/*'])
                            ->label('Видео для моб.')
                            ->columnSpan(1),
                    ])->columns(2),

                Forms\Components\MarkdownEditor::make('description')
                    ->label('Описание')
                    ->maxLength(65535)
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('link')
                    ->label('Ссылка на описании')
                    ->maxLength(255),
                Forms\Components\TextInput::make('time')
                    ->numeric()
                    ->label('Время')
                    ->hint('Время до след. слайда в секундах')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Toggle::make('apply_blur')
                    ->label('Применять блюр'),
                Forms\Components\Toggle::make('show_logo')
                    ->label('Показывать лого'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('video')
                    ->label('Ссылка на видео')
                    ->searchable(),
                Tables\Columns\ToggleColumn::make('show_logo')
                    ->label('Показывать лого'),
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
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListHomeSlides::route('/'),
            'create' => Pages\CreateHomeSlide::route('/create'),
            'edit' => Pages\EditHomeSlide::route('/{record}/edit'),
        ];
    }
}
