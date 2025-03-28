<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;

class ProjectsController extends Controller
{
    public function list()
    {
        return Project::paginate(20);
    }

    public function get($id)
    {
        return Project::where('id', $id)
            ->orWhere('seo_alias', $id)
            ->firstOrFail();
    }
}
