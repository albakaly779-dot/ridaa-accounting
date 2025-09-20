import JournalEntryForm from '../components/JournalEntryForm';

export default function JournalEntryPage() {
  return (
    <div className="p-6 font-[Tajawal]" dir="rtl">
      <h1 className="text-2xl mb-4">إضافة قيد يومي</h1>
      <JournalEntryForm />
    </div>
  );
}
