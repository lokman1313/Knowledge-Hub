"use client"
import React from 'react';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
  Legend,
  Tooltip
} from 'recharts';

// Delivered এর জন্য Tailwind Green (#10B981) এবং Pending এর জন্য Amber (#F59E0B)
const COLORS = ['#10B981', '#F59E0B']; 
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null || percent === 0) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
  
  let fillOpacity;
  if (isAnyPieActive && !isThisPieActive) {
    fillOpacity = 0.5;
  } else {
    fillOpacity = 1;
  }
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      fillOpacity={fillOpacity}
      style={{ transition: 'fill-opacity 0.3s ease' }}
    />
  );
};

export default function RechartSection({ chartData = [], isAnimationActive = true }) {
  return (
    <div className="w-full max-w-[360px] mx-auto">
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart>
          <Pie
            data={chartData}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={isAnimationActive}
            shape={MyCustomPie}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              border: '1px solid #e4e4e7',
              fontSize: '14px'
            }} 
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}