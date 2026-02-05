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

const FESTIVAL_MAP = {
  January: [
    { date: "Jan 1", name: "New Year" },
    { date: "Jan 13", name: "Lohri" },
    { date: "Jan 14", name: "Makar Sankranti / Pongal" },
    { date: "Jan 15", name: "Uttarayan" },
    { date: "Jan 26", name: "Republic Day" }
  ],

  February: [
    { date: "Feb 14", name: "Valentine’s Day" },
    { date: "Feb 19", name: "Shivaji Jayanti" },
    { date: "Feb 26", name: "Maha Shivaratri" }
  ],

  March: [
    { date: "Mar 8", name: "International Women’s Day" },
    { date: "Mar 20", name: "Holi" },
    { date: "Mar 25", name: "Good Friday" }
  ],

  April: [
    { date: "Apr 6", name: "Ram Navami" },
    { date: "Apr 10", name: "Mahavir Jayanti" },
    { date: "Apr 14", name: "Ambedkar Jayanti / Vishu / Baisakhi" },
    { date: "Apr 18", name: "Good Friday" }
  ],

  May: [
    { date: "May 1", name: "Labour Day" },
    { date: "May 9", name: "Rabindranath Tagore Jayanti" },
    { date: "May 25", name: "Buddha Purnima" }
  ],

  June: [
    { date: "Jun 5", name: "World Environment Day" },
    { date: "Jun 21", name: "International Yoga Day" }
  ],

  July: [
    { date: "Jul 10", name: "Guru Purnima" },
    { date: "Jul 17", name: "Muharram" }
  ],

  August: [
    { date: "Aug 15", name: "Independence Day" },
    { date: "Aug 19", name: "Raksha Bandhan" },
    { date: "Aug 29", name: "Janmashtami" }
  ],

  September: [
    { date: "Sep 5", name: "Teachers’ Day" },
    { date: "Sep 7", name: "Ganesh Chaturthi" },
    { date: "Sep 17", name: "Vishwakarma Day" }
  ],

  October: [
    { date: "Oct 2", name: "Gandhi Jayanti" },
    { date: "Oct 20", name: "Dussehra" },
    { date: "Oct 24", name: "Karwa Chauth" }
  ],

  November: [
    { date: "Nov 1", name: "Kannada Rajyotsava" },
    { date: "Nov 8", name: "Diwali" },
    { date: "Nov 15", name: "Bhai Dooj" },
    { date: "Nov 24", name: "Guru Nanak Jayanti" }
  ],

  December: [
    { date: "Dec 25", name: "Christmas" },
    { date: "Dec 31", name: "New Year’s Eve" }
  ],
};




const VARIATIONS = [
  "Warm festive and human-centric tone",
  "Infrastructure scale and reliability focus",
  "Renewable energy and sustainability emphasis",
  "Patriotic and nation-building tone",
  "Minimal clean corporate aesthetic",
  "Winter calm and reliability mood",
];

const buildGeminiPrompt = ({ festival, date, month, variation }) => {
  return `
// Create a high-quality professional corporate illustration for a power systems and energy company inspired by the festival of ${festival} celebrated in India.

// Scene Description:
// A visually rich, culturally inspired scene that reflects the spirit of ${festival}, blended seamlessly with modern power infrastructure. The environment should convey positivity, progress, and reliability, with subtle festive symbolism and strong corporate professionalism.

// Visual Direction:
// - Blend subtle festive elements with modern power infrastructure
// - Include elements such as transmission towers, substations, smart grids, solar panels, or wind turbines
// - Corporate, trustworthy, premium, clean aesthetic
// - Soft cinematic lighting, realistic or semi-illustrated style
// - Balanced composition, professional framing

// Branding Rules (Very Important):
// - NO text
// - NO letters
// - NO numbers
// - NO slogans
// - NO typography
// - NO watermarks
// - Include a clean empty placeholder area for company logo placement
// - Neutral background in logo area

// Image Quality:
// - Ultra high resolution
// - Sharp focus
// - Studio-quality lighting
// - Social media ready
// - Square (1:1 aspect ratio)
// - Suitable for LinkedIn and corporate Instagram
You are an award-winning creative director and cinematic visual artist specializing in premium corporate brand visuals.

Generate an ultra-high-end, cinematic, photorealistic corporate illustration inspired by the Indian festival of {FESTIVAL}, designed for a modern power systems and energy company.

Scene & Environment:
- Grand cinematic wide-angle scene
- Hyper-realistic environment with natural depth, shadows, reflections, volumetric lighting
- Modern power infrastructure: ultra-detailed transmission towers, high-voltage substations, solar farms, wind turbines, smart grid systems
- Futuristic yet realistic energy ecosystem blended into Indian cultural atmosphere
- Subtle Indian festive elements inspired by {FESTIVAL} — tasteful, elegant, premium, minimal

Lighting & Camera:
- Golden hour cinematic lighting
- Global illumination, soft volumetric sun rays
- Professional DSLR photography style
- 35mm wide-angle lens, ultra-sharp focus
- Natural depth of field, bokeh highlights

Composition & Framing:
- Hero composition with balanced symmetry
- Central visual focus
- Large clean negative space on top and bottom for logo and text placement
- Clean minimal background gradient
- Professional corporate poster framing

Style & Visual Quality:
- Hyper-realistic
- Ultra-detailed textures
- 8K resolution look
- HDR cinematic color grading
- Premium corporate brand aesthetic
- Modern, futuristic, trustworthy, world-class

Creative Mood:
{VARIATION}

Strict Brand Safety Rules:
- NO text
- NO letters
- NO numbers
- NO slogans
- NO typography
- NO watermark
- NO visible brand logos
- NO political or religious symbols
- NO cluttered decorations

Output Format:
- Ultra-high resolution
- Square format (1:1)
- Social media ready
- Instagram + LinkedIn optimized
- Canva editable composition

Important:
This image is for high-end corporate branding. Keep everything premium, minimal, clean, cinematic, professional, and visually stunning.


Tone & Mood:
${variation}

Important:
This image is for corporate branding and will be edited later in Canva. Keep the design brand-neutral, minimal, and clean.
  `.trim();
};


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
  // const [prompt, setPrompt] = useState("");


    const [businessType] = useState("Internship Provider");
  const [domain, setDomain] = useState("");
  const [frequency, setFrequency] = useState("Weekly");
  const [imageCount, setImageCount] = useState(4);
  const [styleHint, setStyleHint] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFinalImages, setSelectedFinalImages] = useState([]);

  // const [uploadedImages, setUploadedImages] = useState([]);
  // const [bingUploaded, setBingUploaded] = useState(false);
  // const [finalImage, setFinalImage] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("January");
const [festivalList, setFestivalList] = useState([]);

// const [generatedBatch, setGeneratedBatch] = useState([]);
const handleSendToCanva = () => {
  const selected = uploadedImages.filter(img =>
    selectedImages.includes(img.id)
  );

  if (selected.length === 0) return;

  // Open first selected image in Canva
  openInCanva(selected[0].url);

  // Remove selected images from UI
  setUploadedImages(prev =>
    prev.filter(img => !selectedImages.includes(img.id))
  );

  // Clear selection
  setSelectedImages([]);

  // Move to Canva stage
  setStage(WORKFLOW.CANVA);
};

const handleAutomationComplete = () => {
  // Clear uploaded final images after automation
  setFinalUploads([]);

  // Clear selected images (if any)
  setSelectedImages([]);

  // Move to final success stage
  setStage(WORKFLOW.FINAL);
};

const [uploadedImages, setUploadedImages] = useState([]);
const updateUploadedStatus = (id, status) => {
  setUploadedImages((prev) =>
    prev.map((img) =>
      img.id === id ? { ...img, status } : img
    )
  );
};
const [finalUploads, setFinalUploads] = useState([]);



const [activePromptImage, setActivePromptImage] = useState(null);
const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
const totalImages = images.length;
const approvedCount = images.filter(img => img.status === "approved").length;
const generatedCount = images.filter(img => img.status === "generated").length;
const pendingCount = images.filter(img => img.status === "pending").length;
const regenerateCount = images.filter(img => img.status === "regenerate").length;

const progressPercent = totalImages
  ? Math.round((approvedCount / totalImages) * 100)
  : 0;


  const [darkMode] = useState(true);


  const [isGenerating, setIsGenerating] = useState(false);
  const ZAPIER_WEBHOOK_URL =
  import.meta.env.VITE_ZAPIER_WEBHOOK_URL; 


  const isConfigLocked = stage !== WORKFLOW.CONFIGURE;

  useEffect(() => {
  if (selectedMonth) {
    const festivals = FESTIVAL_MAP[selectedMonth] || [];
    setFestivalList(festivals);
    setImageCount(festivals.length); 
  }
}, [selectedMonth]);

const CANVA_TEMPLATE_URL = "https://www.canva.com/design/DAG_h7d-WXI/ZnW7upUiSRrHcEyWoAJzRA/edit?ui=e30";

const openInCanva = (imageUrl) => {
  const canvaUrl = `${CANVA_TEMPLATE_URL}?import=${encodeURIComponent(imageUrl)}`;
  window.open(canvaUrl, "_blank");
};
const toggleUploadedSelection = (id) => {
  setSelectedImages((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
};
const toggleFinalSelection = (id) => {
  setSelectedFinalImages((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
};



const handleEditConfiguration = () => {
  setStage(WORKFLOW.CONFIGURE);
  setImages([]);
  setSelectedImages([]);
  setPrompt("");
  setBingUploaded(false);
};

const handleNextPrompt = () => {
  if (currentPromptIndex < images.length - 1) {
    setCurrentPromptIndex((prev) => prev + 1);
  }
};

const handlePrevPrompt = () => {
  if (currentPromptIndex > 0) {
    setCurrentPromptIndex((prev) => prev - 1);
  }
};

const handleCopyCurrentPrompt = () => {
  const prompt = images[currentPromptIndex]?.prompt;
  if (!prompt) return;

  navigator.clipboard.writeText(prompt);
  alert("✅ Prompt copied. Paste into Gemini.");
};

const getFestivalImage = (festival, index) => {
  return `https://picsum.photos/seed/${encodeURIComponent(
    festival + index
  )}/800/800`;
};
 const handleUploadImages = (files) => {
  if (!files || files.length === 0) return;

  const uploaded = Array.from(files).map((file, index) => ({
    id: Date.now() + index,
    file,
    url: URL.createObjectURL(file),
    status: "pending",
  }));

  setUploadedImages((prev) => [...prev, ...uploaded]);
};



    const handleGenerateImages = () => {
      // generatePrompt();
      setLoading(true);
  setStage(WORKFLOW.GENERATING);
      const festivals = FESTIVAL_MAP[selectedMonth] || [];
     

  const generatedImages = festivals.slice(0, Math.min(imageCount,festivals.length)).map((fest, index) => {
    const variation = VARIATIONS[index % VARIATIONS.length];

    const geminiPrompt = buildGeminiPrompt({
      festival: fest.name,
      date: fest.date,
      month: selectedMonth,
      variation,
    });

    return {
      id: index,
      festival: fest.name,
      date: fest.date,
      variation,
      prompt: geminiPrompt,
      url: getFestivalImage(fest.name, index), 
      status: "pending", 
    };
  });

  setTimeout(() => {
    setImages(generatedImages);
    setLoading(false);
    setStage(WORKFLOW.REVIEW);
  }, 1200);
};
const updateImageStatus = (id, newStatus) => {
  setImages((prev) =>
    prev.map((img) =>
      img.id === id ? { ...img, status: newStatus } : img
    )
  );
};
const handleFinalUpload = (files) => {
  if (!files || files.length === 0) return;

  const uploaded = Array.from(files).map((file, index) => ({
    id: Date.now() + index,
    file,
    url: URL.createObjectURL(file),
    status: "ready",
  }));

  setFinalUploads((prev) => [...prev, ...uploaded]);
};


const handleCopyAllPrompts = () => {
  if (!images.length) return;

  const allPrompts = images
    .map((img, index) => {
      return `# Image ${index + 1} – ${img.festival} (${img.date})\n\n${img.prompt}`;
    })
    .join("\n\n--------------------------------------------\n\n");

  navigator.clipboard.writeText(allPrompts);
  alert("✅ All prompts copied! Now paste into Gemini.");
};

  
const toggleImageSelection = (id) => {
  setSelectedImages((prev) =>
    prev.includes(id)
      ? prev.filter((imgId) => imgId !== id)
      : [...prev, id]
  );
};


const handleOpenGemini = (prompt) => {
  navigator.clipboard.writeText(prompt);
  window.open("https://gemini.google.com/app", "_blank");
};


// const sendToAutomation = async () => {
//   if (selectedFinalImages.length === 0) return;

//   // 🔥 Remove processed images from UI
//   setFinalUploads((prev) =>
//     prev.filter((img) => !selectedFinalImages.includes(img.id))
//   );

//   // Clear selection
//   setSelectedFinalImages([]);

//   // Temporary action (until Zapier works)
//   setStage(WORKFLOW.FINAL);
// };
const sendToAutomation = async () => {
  const imagesToSend = finalUploads.filter(img =>
    selectedFinalImages.includes(img.id)
  );

  if (!imagesToSend.length) {
    alert("Please select at least one final image");
    return;
  }

  try {
    for (const img of imagesToSend) {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: img.url,
          filename: img.file?.name || "final-design.png",
          timestamp: new Date().toISOString(),
        }),
      });
    }

    // Remove sent images from UI
 setFinalUploads(prev =>
      prev.filter(img => !selectedFinalImages.includes(img.id))
    );

    // ✅ CLEAR FINAL SELECTION
    setSelectedFinalImages([]);

    alert("✅ Images successfully sent to Google Drive!");

    setStage(WORKFLOW.FINAL);

  } catch (err) {
    console.error(err);
    alert("❌ Automation failed. Check Zapier webhook.");
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
            {/* <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button> */}
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold leading-none">Business Automation</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">AI Content Suite</p>
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
            AI-powered social media automation for businesses & creators
Automate monthly festival posts, branding creatives, and engagement workflows in minutes.
          </p>
        </div>

        {/* 2. WORKFLOW PROGRESS (3 Cards) */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
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
    title: "Canva",
    icon: <ImageIcon size={16} />,
    isActive: stage === WORKFLOW.CANVA,
  },
    {
      step: "04",
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
      {/* <div>
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
      </div> */}
      <div>
  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
    Target Month
  </label>

  <select
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
    // className="w-full rounded-xl px-4 py-3 bg-white border border-slate-300"
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
    <option value="">Select Month</option>
    <option value="January">January</option>
    <option value="February">February</option>
    <option value="March">March</option>
    <option value="April">April</option>
    <option value="May">May</option>
    <option value="June">June</option>
    <option value="August">August</option>
    <option value="September">September</option>
    <option value="October">October</option>
    <option value="November">November</option>
    <option value="December">December</option>
    
  </select>
</div>
{festivalList.length > 0 && (
  <div className="mt-4 text-sm text-slate-600">
    <p className="font-semibold mb-2">Planned Festivals:</p>
    <ul className="list-disc pl-4 space-y-1">
      {festivalList.map((f, idx) => (
        <li key={idx}>{f.date} — {f.name}</li>
      ))}
    </ul>
  </div>
)}

{uploadedImages.length > 0 && (
  <div className="grid grid-cols-2 gap-4 mt-6">
    {uploadedImages.map((img) => {
      const isSelected = selectedImages.includes(img.id);

      return (
        <div
          key={img.id}
          onClick={() => toggleUploadedSelection(img.id)}
          className={`relative cursor-pointer border rounded-2xl overflow-hidden transition-all
            ${isSelected ? "ring-2 ring-green-500" : ""}
          `}
        >
          <img
            src={img.url}
            alt="Uploaded"
            className="w-full h-44 object-cover"
          />

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-white font-semibold text-sm
              bg-green-600/70 transition-opacity
              ${isSelected ? "opacity-100" : "opacity-0 hover:opacity-100"}
            `}
          >
            {isSelected ? "✔ Selected" : "Click to Select"}
          </div>
        </div>
      );
    })}
  </div>
)}


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
            {/* <option>Weekly</option> */}
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
            // onChange={(e) => setImageCount(Number(e.target.value))}
            disabled
         className={`"w-full rounded-xl px-4 py-3 bg-slate-100 dark:bg-[#111827] text-slate-500 border border-slate-300 dark:border-slate-700 cursor-not-allowed"s
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
  // className={`border rounded-xl p-4 mb-6
  //   ${darkMode
  //     ? "bg-[#0f1117] border-slate-700 text-slate-300"
  //     : "bg-white border-slate-300 text-slate-700"}
  // `}
>

    
  </div>
)}


         {/* Upload Gemini Images */}
<div
  className={`border rounded-3xl p-8 shadow-sm
    ${darkMode ? "bg-[#0f1117] border-slate-800" : "bg-white border-slate-200"}
  `}
>
  <h2 className="font-bold text-lg mb-4">Upload Gemini Images</h2>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => handleUploadImages(e.target.files)}
    className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:bg-indigo-600 file:text-white
      hover:file:bg-indigo-700
      cursor-pointer"
  />

  <p className="text-xs text-slate-400 mt-2">
    Upload images generated from Gemini
  </p>
</div>
{uploadedImages.length > 0 && (
  <div className="grid grid-cols-2 gap-4 mt-6">
    {uploadedImages.map((img) => (
      <div
        key={img.id}
        className="border rounded-xl overflow-hidden relative"
      >
        <img
          src={img.url}
          alt="Uploaded"
          className="w-full h-40 object-cover"
        />

        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">
          {img.status.toUpperCase()}
        </div>
      </div>
    ))}
  </div>
)}
{/* Upload Final Canva Designs */}
<div
  className={`border rounded-3xl p-8 shadow-sm
    ${darkMode ? "bg-[#0f1117] border-slate-800" : "bg-white border-slate-200"}
  `}
>
  <h2 className="font-bold text-lg mb-4">Upload Final Canva Designs</h2>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => handleFinalUpload(e.target.files)}
    className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:bg-green-600 file:text-white
      hover:file:bg-green-700
      cursor-pointer"
  />

  <p className="text-xs text-slate-400 mt-2">
    Upload the final edited designs downloaded from Canva
  </p>
</div>
{finalUploads.length > 0 && (
  <div className="grid grid-cols-2 gap-4 mt-6">
    {finalUploads.map((img) => {
      const isSelected = selectedFinalImages.includes(img.id);

      return (
        <div
          key={img.id}
          onClick={() => toggleFinalSelection(img.id)}
          className={`relative cursor-pointer border rounded-xl overflow-hidden transition-all
            ${isSelected ? "ring-2 ring-emerald-500" : ""}
          `}
        >
          <img
            src={img.url}
            alt="Final"
            className="w-full h-44 object-cover"
          />

          <div
            className={`absolute inset-0 flex items-center justify-center
              bg-emerald-600/70 text-white font-semibold text-sm transition-opacity
              ${isSelected ? "opacity-100" : "opacity-0 hover:opacity-100"}
            `}
          >
            {isSelected ? "✔ Selected" : "Click to Select"}
          </div>
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
          : "bg-slate-200 hover:bg-slate-300 text-slate-900"
        }`}
    >
      🔄 Regenerate
    </button>

    <button
      disabled={selectedImages.length === 0}
      onClick={handleSendToCanva}
      className="h-14 rounded-2xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-50"
    >
      🎨 Send to Canva
    </button>

  </div>
)}
{finalUploads.length > 0 && (
  <div className="flex gap-3 mt-6">

   {/* <button
  disabled={selectedFinalImages.length === 0}
  onClick={() => setStage (WORKFLOW.FINAL)}
  className="h-14 rounded-2xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-50"
>
  🚀 Automate & Schedule
</button> */}
<button
  disabled={finalUploads.length === 0}
  onClick={handleAutomationComplete}
  className="h-14 rounded-2xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-50"
>
  🚀 Automate & Schedule
</button>

  </div>
)}


              {stage === WORKFLOW.REVIEW && images.length > 0 && (
  <div className={`mb-6 border rounded-xl p-4
    ${darkMode ? "bg-[#020617] border-slate-700" : "bg-white border-slate-300"}
  `}>
    
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold text-sm text-indigo-400">
        AI Prompt Assistant
      </h3>
      <span className="text-xs text-slate-400">
        {currentPromptIndex + 1} / {images.length}
      </span>
    </div>

    <textarea
      readOnly
      value={images[currentPromptIndex]?.prompt || ""}
      className="w-full h-40 p-3 rounded-lg text-xs bg-slate-100 dark:bg-[#020617] border border-slate-300 dark:border-slate-700"
    />

    <div className="flex gap-3 mt-3">
      <button
        onClick={handlePrevPrompt}
        disabled={currentPromptIndex === 0}
        className="flex-1 py-2 rounded-lg text-xs font-semibold bg-slate-600 hover:bg-slate-700 text-white disabled:opacity-40"
      >
        ⬅ Previous
      </button>

      <button
        onClick={handleCopyCurrentPrompt}
        className="flex-1 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        📋 Copy Prompt
      </button>

      <a
        href="https://gemini.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white"
      >
        🚀 Open Gemini
      </a>

      <button
        onClick={handleNextPrompt}
        disabled={currentPromptIndex === images.length - 1}
        className="flex-1 py-2 rounded-lg text-xs font-semibold bg-slate-600 hover:bg-slate-700 text-white disabled:opacity-40"
      >
        Next ➡
      </button>
    </div>

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
  disabled={selectedImages.length === 0}
  onClick={handleSendToCanva}
  className="h-14 rounded-2xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-50"
>
  🎨 Send to Canva
</button>


  
   <button
  disabled={finalUploads.length === 0}
  onClick={handleAutomationComplete}
  className="h-14 rounded-2xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-50"
>
  🚀 Automate & Schedule
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
      {activePromptImage && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-[#0f1117] max-w-2xl w-full rounded-2xl p-6 shadow-xl relative">
            
            <button
              onClick={() => setActivePromptImage(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
            >
              ✖
            </button>

            <h3 className="text-lg font-bold mb-2 text-indigo-500">
              Gemini Image Prompt
            </h3>

            <p className="text-xs text-slate-500 mb-4">
              Festival: <b>{activePromptImage.festival}</b> | Date: {activePromptImage.date}
            </p>

            <textarea
              readOnly
              value={activePromptImage.prompt}
              className="w-full h-64 p-4 rounded-xl text-sm bg-slate-100 dark:bg-[#020617] border border-slate-300 dark:border-slate-700"
            />

            <div className="mt-4 flex gap-3">
  <button
    onClick={() => navigator.clipboard.writeText(activePromptImage.prompt)}
    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold"
  >
    📋 Copy Prompt
  </button>

  <a
    href="https://gemini.google.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 text-center bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-xl font-semibold"
  >
    🚀 Open Gemini
  </a>
</div>

          </div>
        </div>
      )}

    
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