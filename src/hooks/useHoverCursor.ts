import { useEffect } from 'react';

export function useHoverCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const addHoverEffect = () => cursor.classList.add('hover');
    const removeHoverEffect = () => cursor.classList.remove('hover');

    document.addEventListener('mousemove', updateCursor);
    document.querySelectorAll('a, button, [role="button"]').forEach(element => {
      element.addEventListener('mouseenter', addHoverEffect);
      element.addEventListener('mouseleave', removeHoverEffect);
    });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.querySelectorAll('a, button, [role="button"]').forEach(element => {
        element.removeEventListener('mouseenter', addHoverEffect);
        element.removeEventListener('mouseleave', removeHoverEffect);
      });
      document.body.removeChild(cursor);
    };
  }, []);
}