import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Loader2, LayoutTemplate } from 'lucide-react';
import useCreatePoster from '../hooks/useCreatePoster'; // We might need to pass state via navigation or context

const Marketplace = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "templates"));
        const templatesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTemplates(templatesData);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleUseTemplate = (template) => {
    // Navigate to create page with template data
    navigate('/create', { state: { templateData: template.details } });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-purple-600/20 p-3 rounded-xl">
            <LayoutTemplate className="text-purple-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Template Marketplace</h1>
            <p className="text-gray-400">Jumpstart your design with professional templates.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-purple-500" size={48} />
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-lg">No templates available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition group">
                <div className="aspect-[3/4] bg-gray-800 relative overflow-hidden">
                  {template.thumbnailUrl ? (
                    <img src={template.thumbnailUrl} alt={template.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">No Preview</div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button 
                      onClick={() => handleUseTemplate(template)}
                      className="bg-white text-black font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate">{template.title}</h3>
                  <p className="text-sm text-gray-400">By {template.createdBy || 'PosterFlow'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
