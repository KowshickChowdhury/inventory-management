<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    use CommonTrait;

    public function index(){
        $items = Item::with('inventory')->get();
        return $this->sendResponse($items);
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
        $imageUrl = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/images');
            $imageUrl = Storage::url($imagePath);
        }
        $item = new Item();
        $item->inventory_id = $request->input('category_id');
        $item->name = $request->input('item_name');
        $item->description = $request->input('description');
        if ($imageUrl){
            $item->image_url = $imageUrl;
        }
        $item->quantity = $request->input('quantity');
        $item->save();

        
        return $this->sendResponse(['message' => 'Item added successfully!',
        'data' => $item]);
    }

    protected function validator(Array $data)
    {
        return Validator::make($data, [
            'item_name'=>'required|max:150',
            'quantity' => 'required|integer|min:0',
        ]);
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $this->validator($input)->validate();
        $itemId = $request->input('item_id');
        $item = Item::find($itemId);

        // Check if the item exists
        if (!$item) {
            return $this->sendError('Item not found.', [], 404);
        }

        // Update the item attributes
        $item->name = $request->input('item_name');
        $item->description = $request->input('description');
        $item->inventory_id = $request->input('category_id');

        $imageUrl = $request->input('image_url');
        if ($imageUrl && filter_var($imageUrl, FILTER_VALIDATE_URL)) {
            $item->image_url = $imageUrl;
        } elseif ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/images');
            $imageUrl = Storage::url($imagePath);
            $item->image_url = $imageUrl;
        }

        $item->save();

        return $this->sendResponse([
            'message' => 'Item updated successfully!',
            'data' => $item
        ]);
    }

    public function destroy($id)
    {
        Item::destroy($id);
        return $this->sendResponse(['message' => 'item deleted successfully']);
    }
}
