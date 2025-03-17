<?php

namespace App\Http\Controllers\Api;

use App\Models\Client;
use App\Models\HomeSlide;
use App\Models\Service;
use App\Models\Setting;
use App\Utils\Utils;

class SettingsController extends Controller
{
    public function get()
    {
        $settings = [];
        foreach (Setting::all() as $setting) {
            /** @var Setting $setting */
            $settings[$setting->key] = $setting->value;
        }

        $settings['clients'] = Client::all()->toArray();
        $settings['services'] = Service::all()->toArray();
        $settings['home_slides'] = HomeSlide::all()->toArray();
        $settings['contacts_image_url'] = Utils::resourceUrl(Setting::getByCode('contacts_image'));
        $settings['team_image_url'] = Utils::resourceUrl(Setting::getByCode('team_image'));

        return response()->json($settings);
    }
}
