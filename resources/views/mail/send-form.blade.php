<x-mail::message>
    <p>Имя: {{ $name }}</p>
    <p>Телефон: {{ $phone }}</p>
    <p>Email: {{ $email }}</p>
    <p>Сообщение: {{ $message }}</p>

    {{ config('app.name') }}
</x-mail::message>
