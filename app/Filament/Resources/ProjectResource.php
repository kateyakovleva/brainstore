<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $modelLabel = 'Проект';
    protected static ?string $pluralModelLabel = 'Проекты';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Название')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('seo_alias')
                    ->label('url проекта')
                    ->placeholder('project-inbrig')
                    ->hint('Можно вводить только лат. символы, цифры, тире и подчеркивание')
                    ->regex('/[a-zA-Z0-9-_]+/')
                    ->unique()
                    ->required()
                    ->validationMessages(['unique' => 'Проект с таким url уже существует'])
                    ->maxLength(255),
                Forms\Components\MarkdownEditor::make('short_description')
                    ->label('Краткое описание')
                    ->maxLength(65535)
                    ->columnSpanFull(),
                Forms\Components\FileUpload::make('image')
                    ->label('Изображение(превью)')
                    ->image(),
                TagsInput::make('tags')
                    ->label('Теги')
                    ->required()
                    ->columnSpanFull(),
                Builder::make('description')
                    ->label('Блоки')
                    ->blocks([
                        Builder\Block::make('block')
                            ->label('Блок')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Заголовок')
                                            ->required(),
                                        Forms\Components\Textarea::make('link')
                                            ->label('Ссылка на видео'),
                                    ])->columnSpan(2),
                                Forms\Components\FileUpload::make('image')
                                    ->label('Изображение')
                                    ->image(),
                                Forms\Components\MarkdownEditor::make('image_description')
                                    ->label('Подпись к изображению'),
                                Forms\Components\MarkdownEditor::make('description')
                                    ->columnSpanFull(),
                            ])->columns(2)
                    ])->columns(2)
                    ->default([
                        [
                            'data' => ['title' => 'Задача'],
                            'type' => 'block'
                        ],
                        [
                            'data' => ['title' => 'Что мы сделали'],
                            'type' => 'block'
                        ],
                        [
                            'data' => ['title' => 'Исследование'],
                            'type' => 'block'
                        ],
                        [
                            'data' => ['title' => 'Нейминг'],
                            'type' => 'block'
                        ],
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\ImageColumn::make('image'),
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
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
