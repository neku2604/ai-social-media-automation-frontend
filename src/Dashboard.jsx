import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Settings, 
  Zap, 
  Send, 
  Briefcase, 
  Image as ImageIcon, 
  Eye, 
  ChevronDown,
  LayoutGrid,
  Calendar,
  BarChart3,
  CheckCircle2
} from 'lucide-react';



export default function Dashboard() {
    const WORKFLOW = {
    CONFIGURE: "configure",
    GENERATING: "generating",
    REVIEW: "review",
    CANVA: "canva",
    FINAL: "final",
  };

  const [stage, setStage] = useState(WORKFLOW.CONFIGURE);
    const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");


    const [businessType] = useState("Internship Provider");
  const [domain, setDomain] = useState("");
  const [frequency, setFrequency] = useState("Weekly");
  const [imageCount, setImageCount] = useState(4);
  const [styleHint, setStyleHint] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [bingUploaded, setBingUploaded] = useState(false);
  const [finalImage, setFinalImage] = useState(null);

  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);

  const [isGenerating, setIsGenerating] = useState(false);
  const ZAPIER_WEBHOOK_URL =
  import.meta.env.VITE_ZAPIER_WEBHOOK_URL; // <-- PASTE YOUR REAL URL HERE


  const isConfigLocked = stage !== WORKFLOW.CONFIGURE;

const handleEditConfiguration = () => {
  setStage(WORKFLOW.CONFIGURE);
  setImages([]);
  setSelectedImages([]);
  setPrompt("");
  setBingUploaded(false);
};


  // Synchronize the 'dark' class on the HTML document with React state
  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark');
  //      localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //      localStorage.setItem("theme", "dark");
  //   }
  // }, [darkMode]);

  const handleGenerate = () => {
    
    setIsGenerating(true);
    // Simulate an AI generation delay
    setTimeout(() => setIsGenerating(false), 2000);
  };
  const generatePrompt = () => {
  const generatedPrompt = `
Create a PREMIUM, HIGH-RESOLUTION background image 
in a PERFECT SQUARE (1:1 ASPECT RATIO).

Purpose:
Social media visual for an internship and early-career recruitment brand.

Business Context:
Internship Provider

Internship Domain:
${domain || "General Technology"}

STRICT REQUIREMENTS (VERY IMPORTANT):
- NO text
- NO letters
- NO numbers
- NO logos
- NO icons
- NO typography
- NO watermarks
- NO UI elements

Visual Quality:
- Ultra-clean
- Sharp focus
- Studio-quality lighting
- Professional and premium look

Composition Rules:
- Subject centered
- Balanced spacing
- Plenty of empty space for text overlay
- Clean background
- No clutter
- Symmetrical framing

Color & Mood:
- Corporate, modern color palette
- Neutral tones (blue, grey, white)
- Calm, confident, aspirational mood

Style Direction:
${styleHint || "Minimal, modern, professional, corporate environment"}

IMPORTANT:
This image will be uploaded into Canva for branding.
All text, logos, fonts, and CTAs will be added later in Canva.
The image must remain TEXT-FREE and BRAND-NEUTRAL.
`;

  setPrompt(generatedPrompt.trim());
};

  

    const handleGenerateImages = () => {
      generatePrompt();

     

    setLoading(true);
    setStage(WORKFLOW.GENERATING);

    // Simulated AI image generation (text-free)
    setTimeout(() => {
      const generatedImages = Array.from(
        { length: imageCount },
        (_, index) => ({
          id: index,
          url: `https://picsum.photos/400/300?random=${Date.now() + index}`,
        })
      );

      setImages(generatedImages);
      setLoading(false);
      setStage(WORKFLOW.REVIEW);
      

    }, 2000);
  };
const toggleImageSelection = (id) => {
  setSelectedImages((prev) =>
    prev.includes(id)
      ? prev.filter((imgId) => imgId !== id)
      : [...prev, id]
  );
};
const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);

  const previews = files.map((file, index) => ({
    id: index,
    url: URL.createObjectURL(file),
    source: "bing",
  }));

  setImages(previews);
  setSelectedImages(previews.map((img) => img.id)); // auto-select
  setBingUploaded(true);
};
 const handleFinalImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const preview = {
    name: file.name,
    url: URL.createObjectURL(file),
    file,
  };

  setFinalImage(preview);
};

const sendToAutomation = async () => {
  if (!finalImage) return;

  const formData = new FormData();
  formData.append("campaign", "Internship Hiring Campaign");
  formData.append("domain", domain);
  formData.append("frequency", frequency);
  formData.append("timestamp", new Date().toISOString());
  formData.append("final_image", finalImage.file);

  try {
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      body: formData,
    });

    setStage(WORKFLOW.FINAL);
  } catch (error) {
    console.error("Zapier webhook failed", error);
  }
};

  return (
   <div
  className={`min-h-screen transition-colors duration-500 font-sans
    ${darkMode 
      ? "bg-[#0a0c10] text-slate-100" 
      : "bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900"
    }
  `} 
>


    

      {/* --- HEADER --- */}
      <header
  className={`fixed top-0 z-50 w-full backdrop-blur-md border-b
    ${darkMode
      ? "bg-[#0a0c10]/90 border-slate-800"
      : "bg-white border-slate-200 shadow-sm"}
  `}
>

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-sm tracking-tight hidden sm:block">AI Social Media Automation</span>
            
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold leading-none">Internship Provider</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">Enterprise Plan</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-[10px] font-bold text-indigo-600 border border-indigo-200 dark:border-indigo-800">
                IP
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- PAGE CONTENT --- */}
      <main className="pt-28 pb-24 px-6 max-w-7xl mx-auto">
        
        {/* 1. INTRO SECTION */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-900 bg-clip-text text-transparent">
            Content Automation Dashboard
          </h1>
          <p className="text-slate-1000 dark:text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            AI-assisted social media automation tailored for internship providers. 
            Automate recruitment visuals and engagement in seconds.
          </p>
        </div>

        {/* 2. WORKFLOW PROGRESS (3 Cards) */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
  {[
    {
      step: "01",
      title: "Configure",
      icon: <Settings size={16} />,
      isActive: stage === WORKFLOW.CONFIGURE,
    },
    {
      step: "02",
      title: "Generate",
      icon: <Zap size={16} />,
      isActive:
        stage === WORKFLOW.GENERATING || stage === WORKFLOW.REVIEW,
    },
    {
      step: "03",
      title: "Publish",
      icon: <Send size={16} />,
      isActive:
        stage === WORKFLOW.CANVA || stage === WORKFLOW.FINAL,
    },
  ].map((item) => (
    <div
      key={item.step}
      className={`p-5 rounded-2xl border transition-all duration-300 ${
        item.isActive
          ? "border-indigo-500/40 bg-white dark:bg-indigo-500/[0.03] shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/10"
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1117] opacity-90"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ${
            item.isActive
              ? "bg-indigo-500/10 text-indigo-500"
              : "bg-slate-100 dark:bg-slate-800 text-slate-400"
          }`}
        >
          Step {item.step}
        </span>
        {item.isActive && (
          <CheckCircle2 size={14} className="text-indigo-500" />
        )}
      </div>

      <div className="flex items-center gap-2">
        <span
          className={
            item.isActive ? "text-indigo-500" : "text-slate-500"
          }
        >
          {item.icon}
        </span>
        <span className="font-semibold text-sm">{item.title}</span>
      </div>
    </div>
  ))}
</div>


        {/* 3. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Business Configuration */}
          
          <section className="lg:col-span-7">
  <div
  className={`border rounded-3xl p-8 shadow-sm
  ${darkMode
    ? "bg-[#0f1117] border-slate-800"
    : "bg-white border-slate-200 shadow-md"}
`}

>


    
    {/* HEADER */}
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <Briefcase className="text-indigo-500" size={20} />
        </div>
        <h2 className="font-bold text-lg">Business Configuration</h2>
      </div>

      {isConfigLocked && (
        <button
          onClick={handleEditConfiguration}
          className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
        >
          Edit
        </button>
      )}
    </div>

    {/* INPUTS */}
    <div className="space-y-6">
      {/* Content Category */}
      <div>
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Content Category
        </label>
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          disabled={isConfigLocked}
          placeholder="e.g. Web Development, Java, AI"
        className={`w-full rounded-xl px-4 py-3 transition
  ${
    isConfigLocked
      ? darkMode
        ? "bg-[#111827] text-slate-400 cursor-not-allowed border border-slate-700"
        : "bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-300"
      : darkMode
        ? "bg-[#020617] text-slate-100 border border-slate-700"
        : "bg-white text-slate-900 border border-slate-300"
  }`}

        />
      </div>

      {/* Frequency & Count */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Posting Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            disabled={isConfigLocked}
           className={`w-full rounded-xl px-4 py-3 transition
  ${
    isConfigLocked
      ? darkMode
        ? "bg-[#111827] text-slate-400 cursor-not-allowed border border-slate-700"
        : "bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-300"
      : darkMode
        ? "bg-[#020617] text-slate-100 border border-slate-700"
        : "bg-white text-slate-900 border border-slate-300"
  }`}


          >
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Image Count
          </label>
          <input
            type="number"
            value={imageCount}
            onChange={(e) => setImageCount(Number(e.target.value))}
            disabled={isConfigLocked}
         className={`w-full rounded-xl px-4 py-3 transition
  ${
    isConfigLocked
      ? darkMode
        ? "bg-[#111827] text-slate-400 cursor-not-allowed border border-slate-700"
        : "bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-300"
      : darkMode
        ? "bg-[#020617] text-slate-100 border border-slate-700"
        : "bg-white text-slate-900 border border-slate-300"
  }`}


          />
        </div>
      </div>

      {/* Style Instructions */}
      <div>
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Style Instructions
        </label>
        <textarea
          value={styleHint}
          onChange={(e) => setStyleHint(e.target.value)}
          disabled={isConfigLocked}
          rows={3}
          placeholder="Minimal, professional, tech-focused…"
          className={`w-full rounded-xl px-4 py-3 transition
  ${
    isConfigLocked
      ? darkMode
        ? "bg-[#111827] text-slate-400 cursor-not-allowed border border-slate-700"
        : "bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-300"
      : darkMode
        ? "bg-[#020617] text-slate-100 border border-slate-700"
        : "bg-white text-slate-900 border border-slate-300"
  }`}


        />
      </div>
    </div>

    {/* SUMMARY */}
    {isConfigLocked && (
    <div
  className={`mt-6 rounded-xl p-4 text-sm
  ${
    darkMode
      ? "bg-[#020617] border border-slate-700 text-slate-300"
      : "bg-white border border-slate-300 text-slate-700"
  }`}

>
  
        <h4 className="font-semibold text-indigo-400 mb-2">
          Configuration Summary
        </h4>
        <ul className="space-y-1">
          <li>• Category: {domain || "Not specified"}</li>
          <li>• Frequency: {frequency}</li>
          <li>• Images: {imageCount}</li>
          <li>• Style: {styleHint || "Default"}</li>
        </ul>
      </div>
    )}
  </div>
</section>


          {/* RIGHT COLUMN: Generation & Review */}
          <section className="lg:col-span-5 space-y-6">
            {/* Image Generation Card */}
            <div
  className={`border rounded-3xl p-8 shadow-sm
    ${darkMode ? "bg-[#0f1117] border-slate-800" : "bg-white border-slate-200"}
  `}
>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <ImageIcon className="text-indigo-500" size={20} />
                </div>
                <h2 className="font-bold text-lg">Image Generation</h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                AI creates high-quality, text-free visuals based on your brand requirements.
              </p>
              <button
                onClick={handleGenerateImages}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {loading ? "Generating Images..." : "✨ Generate Image Set"}
              </button>

            </div>

            {/* Review & Publish Card */}
           <div
  className={`border rounded-3xl p-8 shadow-sm
    ${darkMode ? "bg-[#0f1117] border-slate-800" : "bg-white border-slate-200"}
  `}
>

              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Eye className="text-indigo-500" size={20} />
                </div>
                <h2 className="font-bold text-lg">Review & Publish</h2>
              </div>
              {prompt && stage === WORKFLOW.REVIEW && (
 <div
  className={`border rounded-xl p-4 mb-6
    ${darkMode
      ? "bg-[#0f1117] border-slate-700 text-slate-300"
      : "bg-white border-slate-300 text-slate-700"}
  `}
>

    <h4 className="font-semibold text-indigo-400 mb-2">
      Generate Images using Microsoft Bing
    </h4>

    <p className="text-sm text-slate-400 mb-3">
      Copy the generated prompt and open Bing Image Creator to generate
      text-free base visuals.
    </p>

    <div className="flex gap-3">
      <button
  onClick={() => navigator.clipboard.writeText(prompt)}
  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition
    ${darkMode
      ? "bg-slate-700 hover:bg-slate-600 text-white"
      : "bg-white border border-slate-300 hover:bg-slate-100 text-slate-700"
    }
  `}
>
  📋 Copy Prompt
</button>

      <a
        href="https://www.bing.com/images/create"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-sm font-semibold"
      >
        🔗 Open Bing Image Creator
      </a>
    </div>

    <p className="text-xs text-slate-500 mt-3">
      Note: Bing Image Creator does not provide a public API. This step is
      performed manually for demo purposes.
    </p>
  </div>
)}
{stage === WORKFLOW.REVIEW && (
  <div
  className={`rounded-xl p-4 mb-6 border
    ${darkMode
      ? "bg-black/20 border-slate-700"
      : "bg-white border-slate-200"
    }
  `}
>

    <h4 className="font-semibold text-indigo-400 mb-2">
      Upload Images Generated from Bing
    </h4>

    <p className="text-sm text-slate-400 mb-3">
      Upload the images you generated using Bing Image Creator.
    </p>

    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleImageUpload}
      className="block w-full text-sm text-slate-400
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:bg-slate-700 file:text-white
                 hover:file:bg-slate-600"
    />
    
  </div>
)}



              {/* IMAGE PREVIEW GRID */}
              {stage === WORKFLOW.REVIEW && images.length > 0 && (
  <div className="grid grid-cols-2 gap-4">
    {images.map((img) => {
      const isSelected = selectedImages.includes(img.id);

      return (
        <div
          key={img.id}
          onClick={() => toggleImageSelection(img.id)}
          className={` relative cursor-pointer border rounded-xl overflow-hidden transition-all
            ${
              isSelected
                ? "border-indigo-500 ring-2 ring-indigo-500"
                : darkMode? "border-slate-700" :"border-slate-300"
            }`}
        >
           {/* ✅ BADGE GOES HERE */}
          {isSelected && (
            <span className="absolute top-2 right-2 bg-green-600 text-xs px-2 py-1 rounded-full z-10">
              Selected
            </span>
          )}

          <img
            src={img.url}
            alt="Generated"
            className="w-full h-full object-cover"
          />
        </div>
      );
    })}
  </div>
)}

             {stage === WORKFLOW.REVIEW && (
  <div className="flex gap-3 mt-6">
    <button
      onClick={handleGenerateImages}
      className={`flex-1 py-3 rounded-xl font-semibold
  ${darkMode
    ? "bg-slate-700 hover:bg-slate-600 text-white"
    : "bg-slate-200 hover:bg-slate-300 text-slate-900"}
`}

    >
      🔄 Regenerate
    </button>

    <button
      disabled={!bingUploaded || selectedImages.length === 0}
      onClick={() => setStage(WORKFLOW.CANVA)}
      className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-semibold disabled:opacity-50"
    >
      ✅ Approve Selected
    </button>
  </div>
)}
{stage === WORKFLOW.CANVA && (
  <div className="border border-slate-700 rounded-xl p-6 bg-black/30 text-center mt-6">
    <h3 className="text-lg font-semibold text-indigo-400 mb-2">
      Canva Branding & Customization
    </h3>

    <p className="text-sm text-slate-400 mb-4">
      Approved images are now ready for branding in Canva.
    </p>

    <ul className="text-left text-sm text-slate-300 space-y-2 mb-6">
      <li>✔ Internship title added</li>
      <li>✔ Company logo placed</li>
      <li>✔ Call-to-action text added</li>
      <li>✔ Brand fonts & colors applied</li>
    </ul>

   <a
  href="https://www.canva.com/design/DAG-ZoxMcOI/cBHJuQoEnFh8IIMJT9Ew2w/edit?ui=e30"
  target="_blank"
  rel="noopener noreferrer"
  className="block w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-semibold"
>
  🎨 Open Approved Image in Canva Editor
</a>

    <button
      onClick={() => setStage(WORKFLOW.FINAL)}
      className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold"
    >
      ✅ Branding Done – Continue
    </button>
  </div>
)}
{stage === WORKFLOW.CANVA && (
  <div className="border border-slate-700 rounded-xl p-6 bg-black/20 mt-6">
    <h3 className="text-lg font-semibold text-indigo-400 mb-3">
      Upload Final Branded Image
    </h3>

    <p className="text-sm text-slate-400 mb-4">
      After editing in Canva, export the final image and upload it here
      to continue automation.
    </p>

    <input
      type="file"
      accept="image/*"
      onChange={handleFinalImageUpload}
      className="block w-full text-sm text-slate-400
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:bg-slate-700 file:text-white
                 hover:file:bg-slate-600"
    />

    {finalImage && (
      <div className="mt-4">
        <img
          src={finalImage.url}
          alt="Final"
          className="max-h-64 rounded-xl border border-slate-600 mx-auto"
        />
      </div>
    )}

    <button
  disabled={!finalImage}
  onClick={sendToAutomation}
  className="mt-6 w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold disabled:opacity-50"
>
  🚀 Send to Automation
</button>

  </div>
)}

{stage === WORKFLOW.FINAL && (
  <div className="border border-slate-700 rounded-xl p-8 bg-black/30 text-center mt-6">
    <h3 className="text-xl font-semibold text-green-400 mb-4">
      🎉 Content Ready for Publishing
    </h3>

    <p className="text-sm text-slate-400 mb-6">
      Your branded creatives are finalized and ready for distribution.
    </p>

    <div className="grid grid-cols-1 gap-4 text-sm text-slate-300 mb-6">
      <div className="flex justify-between">
        <span>Status</span>
        <span className="text-green-400 font-semibold">Scheduled</span>
      </div>
      <div className="flex justify-between">
        <span>Platform</span>
        <span>Instagram / LinkedIn</span>
      </div>
      <div className="flex justify-between">
        <span>Automation</span>
        <span>Zapier Webhook Triggered</span>
      </div>
    </div>

    <button
      onClick={() => setStage(WORKFLOW.CONFIGURE)}
      className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-semibold"
    >
      🔁 Create New Campaign
    </button>
  </div>
)}



            </div>
          </section>
        </div>
      </main>

            {/* --- FOOTER CREDIT --- */}
      <footer className="text-center text-xs text-slate-500 py-3 hidden lg:block">
        Built by <span className="font-semibold text-indigo-400">Neha Kumari</span>
      </footer>


      {/* --- MOBILE NAVIGATION --- */}
      <nav className="fixed bottom-0 w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0a0c10]/80 backdrop-blur-xl px-8 py-4 lg:hidden">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <MobileNavItem icon={<LayoutGrid size={22}/>} label="Home" active />
          <MobileNavItem icon={<Calendar size={22}/>} label="Schedule" />
          <MobileNavItem icon={<BarChart3 size={22}/>} label="Stats" />
          <MobileNavItem icon={<Settings size={22}/>} label="Settings" />
        </div>
      </nav>
    </div>
  );
}

function MobileNavItem({ icon, label, active = false }) {
  return (
    <button className={`flex flex-col items-center gap-1 ${active ? 'text-indigo-500' : 'text-slate-400'}`}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
  );
}