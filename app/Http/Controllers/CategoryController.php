<?php

namespace App\Http\Controllers;

use App\Models\Invertory;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    use CommonTrait;

    public function index(){
        $categories = Invertory::all();
        return $this->sendResponse($categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $this->validator($input)->validate();
        $inventory = new Invertory();
        $inventory->name = $request->input('name');
        $inventory->description = $request->input('description');
        $inventory->user_id = Auth::id();
        $inventory->save();

        
        return $this->sendResponse(['message' => 'Inventory added successfully!',
        'data' => $inventory]);
    }

    protected function validator(Array $data)
    {
        return Validator::make($data, [
            'name'=>'required|max:150'
        ]);
    }
}
