<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('/projects', [\App\Http\Controllers\Api\ProjectsController::class, 'list']);
Route::get('/projects/{id}', [\App\Http\Controllers\Api\ProjectsController::class, 'get']);

Route::get('/settings', [\App\Http\Controllers\Api\SettingsController::class, 'get']);

Route::post('/form-request', [\App\Http\Controllers\Api\FormController::class, 'form']);
