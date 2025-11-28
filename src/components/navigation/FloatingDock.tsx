'use client';

import { Home, ShoppingBag, Heart, User, Search } from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Search, label: 'Buscar', path: '/busca' },
  { icon: ShoppingBag, label: 'Categorias', path: '/categorias' },
  { icon: Heart, label: 'Favoritos', path: '/favoritos' },
  { icon: User, label: 'Conta', path: '/auth' },
];

export function FloatingDock() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <Dock className="border border-white/20" magnification={60} distance={100} panelHeight={56}>
        {navItems.map((item) => (
          <DockItem key={item.label}>
            <DockLabel>{item.label}</DockLabel>
            <DockIcon>
              <div 
                onClick={() => navigate(item.path)}
                className="w-full h-full flex items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <item.icon className="w-5 h-5" />
              </div>
            </DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
