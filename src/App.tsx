import { useEffect, useState, useCallback } from 'react';
import { HeroPage } from './pages/HeroPage';
import { WeddingPage } from './pages/WeddingPage';
import { supabase } from './services/supabase.service';
import { WEDDING_COUPLE } from './config/wedding.config';
import type { Todo } from './types/supabase.types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'hero' | 'wedding'>('hero');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (WEDDING_COUPLE.groom.shortName && WEDDING_COUPLE.bride.shortName) {
      const gInit = WEDDING_COUPLE.groom.shortName.charAt(0);
      const bInit = WEDDING_COUPLE.bride.shortName.charAt(0);
      document.title = `${gInit}&${bInit} — The Journey of Love, We Begin Together`;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function getTodos() {
      const { data, error } = await supabase.from('todos').select('id, name');

      if (error) {
        console.error('Unable to load todos from Supabase:', error.message);
        return;
      }

      if (isMounted) {
        setTodos((data as Todo[]) ?? []);
      }
    }

    void getTodos();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenInvitation = useCallback(() => {
    setCurrentPage('wedding');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleBackToHero = useCallback(() => {
    setCurrentPage('hero');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Keep the sample query wired up without changing the existing wedding design.
  const hiddenTodoList = (
    <ul hidden>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  );

  return (
    <>
      {hiddenTodoList}
      {currentPage === 'wedding' ? (
        <WeddingPage onBackToTech={handleBackToHero} />
      ) : (
        <HeroPage onOpenInvitation={handleOpenInvitation} />
      )}
    </>
  );
}
