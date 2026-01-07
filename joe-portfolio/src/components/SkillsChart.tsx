import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Language } from '../types';

interface Props {
  language: Language;
}

const SkillsChart: React.FC<Props> = ({ language }) => {
  const radarData = [
    { subject: language === 'en' ? 'Finance' : '金融知识', A: 90, fullMark: 100 },
    { subject: language === 'en' ? 'Data Analysis' : '数据分析', A: 85, fullMark: 100 },
    { subject: language === 'en' ? 'Communication' : '沟通能力', A: 95, fullMark: 100 },
    { subject: language === 'en' ? 'English' : '英语能力', A: 90, fullMark: 100 },
    { subject: language === 'en' ? 'Product Design' : '产品设计', A: 80, fullMark: 100 },
    { subject: language === 'en' ? 'Tech Stack' : '技术栈', A: 75, fullMark: 100 },
  ];

  const toolsData = [
    { name: 'SQL', level: 85 },
    { name: 'Excel', level: 95 },
    { name: 'Tableau', level: 80 },
    { name: 'Visio', level: 90 },
    { name: 'Python', level: 60 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Radar Chart for Core Competencies */}
      <div className="bg-slate-50/30 p-4 rounded-xl border border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 text-center">
          {language === 'en' ? 'Competency Matrix' : '能力维度分析'}
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Joe"
                dataKey="A"
                stroke="#007aff"
                strokeWidth={2}
                fill="#007aff"
                fillOpacity={0.15}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart for Technical Tools */}
      <div className="bg-slate-50/30 p-4 rounded-xl border border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 text-center">
          {language === 'en' ? 'Technical Proficiency' : '技术工具熟练度'}
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={toolsData} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9"/>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis dataKey="name" type="category" tick={{ fill: '#334e68', fontSize: 11, fontWeight: 700 }} width={50} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
              />
              <Bar dataKey="level" fill="#102a43" radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SkillsChart;