import React from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, className, iconColor }) => {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {trend && (
              <div className={`flex items-center text-sm ${
                trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-full", iconColor)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;