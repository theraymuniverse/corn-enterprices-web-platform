import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const SupabaseRealtime = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const channel = supabase
            .channel('realtime:entries')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'NewsLetter' }, (payload) => {
                console.log('New entry:', payload.new);
                setMessages((prev) => [payload.new, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div>
            <h1>Realtime Entries</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{JSON.stringify(msg)}</li>
                ))}
            </ul>
        </div>
    );
};

export default SupabaseRealtime;