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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Radar Chart for Core Competencies */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-w-0">
        <h3 className="text-lg font-bold text-corporate-800 mb-6 text-center">
          {language === 'en' ? 'Competency Matrix' : '能力维度分析'}
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height={256}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Joe"
                dataKey="A"
                stroke="#007aff"
                strokeWidth={2}
                fill="#007aff"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart for Technical Tools */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-w-0">
        <h3 className="text-lg font-bold text-corporate-800 mb-6 text-center">
          {language === 'en' ? 'Technical Proficiency' : '技术工具熟练度'}
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height={256}>
            <BarChart layout="vertical" data={toolsData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9"/>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis dataKey="name" type="category" tick={{ fill: '#334e68', fontSize: 13, fontWeight: 500 }} width={60} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="level" fill="#334e68" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SkillsChart;