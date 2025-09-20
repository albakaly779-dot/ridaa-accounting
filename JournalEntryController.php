<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JournalEntryController extends Controller
{
    public function index()
    {
        $entries = DB::table('journal_entries')->orderBy('date','desc')->limit(100)->get();
        return response()->json($entries);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'date' => 'required|date',
            'description_ar' => 'nullable|string',
            'lines' => 'required|array|min:1',
        ]);

        DB::transaction(function() use ($data) {
            $jeId = DB::table('journal_entries')->insertGetId([
                'date' => $data['date'],
                'description_ar' => $data['description_ar'] ?? null,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            foreach ($data['lines'] as $line) {
                DB::table('journal_lines')->insert([
                    'journal_entry_id' => $jeId,
                    'account_id' => $line['account_id'] ?? null,
                    'debit' => $line['debit'] ?? 0,
                    'credit' => $line['credit'] ?? 0,
                    'narration' => $line['narration'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        });

        return response()->json(['status' => 'ok'], 201);
    }
}
