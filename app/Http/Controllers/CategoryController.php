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

    public function update(Request $request)
    {
        $input = $request->all();
        $this->validator($input)->validate();
        $cat_id = $request->input('cat_id');
        $inventory = Invertory::where('id', $cat_id)->first();

        if (!$inventory) {
            return $this->sendError('Inventory not found.', [], 404);
        }

        $inventory->name = $request->input('name');
        $inventory->description = $request->input('description');
        $inventory->user_id = Auth::id();
        // You might want to add validation or checks here if necessary before updating

        $inventory->save();

        return $this->sendResponse([
            'message' => 'Inventory updated successfully!',
            'data' => $inventory
        ]);
    }

    public function destroy($id)
    {
        Invertory::destroy($id);
        return $this->sendResponse(['message' => 'Inventory deleted successfully']);
    }

}
