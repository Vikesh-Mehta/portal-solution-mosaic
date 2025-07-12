
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
  children
}) => {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6 mx-auto py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {children}
            {actionLabel && onAction && (
              <Button onClick={onAction}>
                {ActionIcon && <ActionIcon className="w-4 h-4 mr-2" />}
                {actionLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
