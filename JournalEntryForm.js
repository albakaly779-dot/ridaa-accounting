import { useState, useEffect } from 'react';
import axios from 'axios';

export default function JournalEntryForm() {
  const [entries, setEntries] = useState([{ account_id: '', debit: 0, credit: 0, narration: '' }]);
  const [accounts, setAccounts] = useState([]);
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  useEffect(()=> {
    axios.get(`${api}/accounts`).then(r => setAccounts(r.data)).catch(()=> setAccounts([]));
  },[]);

  const addLine = () => setEntries([...entries, { account_id: '', debit: 0, credit: 0, narration: '' }]);

  const updateLine = (i, key, value) => {
    const copy = JSON.parse(JSON.stringify(entries));
    copy[i][key] = value;
    setEntries(copy);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/journal-entries`, { date: new Date().toISOString().slice(0,10), description_ar: 'قيد يدوي', lines: entries });
      alert('تم حفظ القيد');
    } catch (err) {
      console.error(err);
      alert('خطأ في الحفظ');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {entries.map((ln, idx) => (
        <div key={idx} className="flex gap-2">
          <select value={ln.account_id} onChange={e=>updateLine(idx,'account_id',e.target.value)} className="border p-2 flex-1">
            <option value="">اختر حساب</option>
            {accounts.map(a=> <option key={a.id} value={a.id}>{a.name_ar} ({a.code})</option>)}
          </select>
          <input type="number" value={ln.debit} onChange={e=>updateLine(idx,'debit',e.target.value)} placeholder="مدين" className="border p-2 w-24" />
          <input type="number" value={ln.credit} onChange={e=>updateLine(idx,'credit',e.target.value)} placeholder="دائن" className="border p-2 w-24" />
          <input value={ln.narration} onChange={e=>updateLine(idx,'narration',e.target.value)} placeholder="ملاحظة" className="border p-2 w-40" />
        </div>
      ))}
      <div className="flex gap-2">
        <button type="button" onClick={addLine} className="bg-blue-600 text-white px-4 py-2 rounded">+ إضافة سطر</button>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">حفظ القيد</button>
      </div>
    </form>
  );
}
