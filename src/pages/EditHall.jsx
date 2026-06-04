  import { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { ArrowLeft, Upload, Plus, Trash2, Check, ChevronDown } from 'lucide-react';
  import API from '../api/axios';
  import { useParams } from 'react-router-dom';

  const EditHall = () => {
      const { id } = useParams();
      const navigate = useNavigate();
    
    const [hallData, setHallData] = useState({name: '',description: '',city: '',address: '',capacity: '',hallType: 'wedding',amenities: []});

    const [slots, setSlots] = useState([{ startTime: '', endTime: '', price: '' }]);
    const [images, setImages] = useState([]);
    const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);

    const amenitiesList = ["WiFi", "Parking", "AC", "Projector", "Sound System", "Catering"];
    const hallTypes = ["meeting", "wedding", "conference", "event"];


useEffect(() => {
    const fetchHall = async () => {
      try {
        const res = await API.get(`/hall/${id}`);
        const hall = res.data.data;

        setHallData({
          name: hall.name,
          description: hall.description,
          city: hall.location?.city || "",
          address: hall.location?.address || "",
          capacity: hall.capacity,
          hallType: hall.hallType,
          amenities: hall.amenities || []
        });

        setSlots(hall.availableSlots || []);

        const existingImages =
          hall.images?.map((img) => ({
            preview: img,
            existing: true
          })) || [];

        setImages(existingImages);

      } catch (error) {
        console.error(error);
      }
    };

    fetchHall();
  }, [id]);


    const handleAmenityChange = (amenity) => {
      setHallData(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      }));
    };

    const addSlot = () => {
      setSlots([...slots, { startTime: '', endTime: '', price: '' }]);
    };

    const removeSlot = (index) => {
      if (slots.length > 1) {
        setSlots(slots.filter((_, i) => i !== index));
      }
    };

    const handleSlotChange = (index, field, value) => {
      const updatedSlots = [...slots];
      updatedSlots[index][field] = value;
      setSlots(updatedSlots);
    };

    const validateSlots = () => {
      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];

        if (!slot.startTime || !slot.endTime || !slot.price) {
          alert(`Slot ${i + 1} is incomplete`);
          return false;
        }

        if (Number(slot.price) <= 0) {
          alert(`Slot ${i + 1} has invalid price`);
          return false;
        }

        if (slot.startTime >= slot.endTime) {
          alert(`Slot ${i + 1} start time must be before end time`);
          return false;
        }
      }
      return true;
    };

    const hasOverlap = () => {
      const sortedSlots = [...slots].sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );

      for (let i = 0; i < sortedSlots.length - 1; i++) {
        if (sortedSlots[i].endTime > sortedSlots[i + 1].startTime) {
          return true;
        }
      }
      return false;
    };

    

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateSlots()) return;
  if (hasOverlap()) {
    alert("There is an overlap between the available slots!");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("name", hallData.name);
    formData.append("description", hallData.description);
    formData.append("capacity", hallData.capacity);
    formData.append("hallType", hallData.hallType);
    
    formData.append("location", JSON.stringify({
      city: hallData.city,
      address: hallData.address
    }));

    formData.append("amenities", JSON.stringify(hallData.amenities));
    formData.append("availableSlots", JSON.stringify(slots));

    const existingImages = images
      .filter(img => img.existing)
      .map(img => img.preview); 
    
    formData.append("existingImages", JSON.stringify(existingImages));

    
    images.forEach((image) => {
      if (!image.existing) {
        formData.append("images", image.file);
      }
    });

    await API.put(`/hall/updateHall/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    navigate("/provider/dashboard");

  } catch (error) {
    console.error(error);
  }
};


const handleImageChange = (e) => {
      const files = Array.from(e.target.files);

      if (files.length + images.length > 10) {
        alert("Maximum 10 images allowed");
        return;
      }

      const validFiles = files.filter((file) => {
        const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

        if (!allowed.includes(file.type)) {
          alert(`${file.name} is not supported`);
          return false;
        }

        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} exceeds 5MB`);
          return false;
        }

        return true;
      });


      const filesWithPreviews = validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));

      setImages((prev) => [...prev, ...filesWithPreviews]);
    };

    const handleRemoveImage = (index) => {
      const targetImage = images[index];
      if (!targetImage.existing && targetImage.preview) {
        URL.revokeObjectURL(targetImage.preview);
      }
      setImages(images.filter((_, i) => i !== index));
    };

    return (
      <div className="min-h-screen bg-[#050B17] text-gray-200 p-6 md:p-12 font-sans relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#D4A353]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-6xl z-10">
          
          <button 
            type="button"
            onClick={() => navigate('/provider/dashboard')}
            className="w-fit flex items-center gap-2 text-gray-400 hover:text-[#D4A353] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4A353]/30 rounded-xl px-4 py-2.5 text-xs font-bold tracking-wide transition-all duration-300 backdrop-blur-md mb-6"
          >
            <ArrowLeft size={14} />
            Back To Dashboard
          </button>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-gray-200 to-[#D4A353] mb-2">
              Update Your Hall
            </h1>
            <p className="text-gray-400 text-sm tracking-wide">
              List Your Venue Here on <span className="text-[#D4A353] font-semibold">Venora</span> for the world to see
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#0D1527]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-8">
            
          
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-2">
                <h3 className="text-base font-bold text-[#D4A353] uppercase tracking-wider">General Info</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">Hall Name</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Royal Golden Hall" 
                    value={hallData.name}
                    onChange={(e) => setHallData({...hallData, name: e.target.value})}
                    className="w-full bg-[#050B17]/80 border border-white/10 focus:border-[#D4A353] rounded-xl p-3 text-sm text-white placeholder-gray-600 outline-none transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">Description</label>
                  <textarea 
                    placeholder="Describe the luxury experience of your hall..." 
                    rows="4"
                    value={hallData.description}
                    onChange={(e) => setHallData({...hallData, description: e.target.value})}
                    className="w-full bg-[#050B17]/80 border border-white/10 focus:border-[#D4A353] rounded-xl p-3 text-sm text-white placeholder-gray-600 outline-none transition duration-200 resize-none"
                    required
                  />
                </div>
              </div>

              <div className="border-b border-white/5 pt-2 pb-2">
                <h3 className="text-base font-bold text-[#D4A353] uppercase tracking-wider">Venue Type & Location</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">Hall Category</label>
                  <select 
                    value={hallData.hallType}
                    onChange={(e) => setHallData({...hallData, hallType: e.target.value})}
                    className="w-full bg-[#050B17]/80 border border-white/10 focus:border-[#D4A353] rounded-xl p-3 text-sm text-white outline-none transition duration-200 cursor-pointer capitalize"
                  >
                    {hallTypes.map(type => (
                      <option key={type} value={type} className="bg-[#050B17] text-white">{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1.5">City</label>
                    <input 
                      type="text" 
                      placeholder="Amman" 
                      value={hallData.city}
                      onChange={(e) => setHallData({...hallData, city: e.target.value})}
                      className="w-full bg-[#050B17]/80 border border-white/10 focus:border-[#D4A353] rounded-xl p-3 text-sm text-white placeholder-gray-600 outline-none transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1.5">Address</label>
                    <input 
                      type="text" 
                      placeholder="Tla' Al-Ali" 
                      value={hallData.address}
                      onChange={(e) => setHallData({...hallData, address: e.target.value})}
                      className="w-full bg-[#050B17]/80 border border-white/10 focus:border-[#D4A353] rounded-xl p-3 text-sm text-white placeholder-gray-600 outline-none transition duration-200"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

          
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-2">
                <h3 className="text-base font-bold text-[#D4A353] uppercase tracking-wider">Specs & Amenities</h3>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1.5">Maximum Capacity</label>
                <input 
                  type="number" 
                  placeholder="Ex: 350" 
                  min="1"
                  value={hallData.capacity}
                  onChange={(e) => setHallData({...hallData, capacity: e.target.value})}
                  className="w-full bg-[#050B17]/80 border border-white/10 focus:border-[#D4A353] rounded-xl p-3 text-sm text-white placeholder-gray-600 outline-none transition duration-200"
                  required
                />
              </div>

              <div className="relative">
                <label className="text-xs font-semibold text-gray-400 block mb-1.5">Select Amenities</label>
                <div 
                  onClick={() => setShowAmenitiesDropdown(!showAmenitiesDropdown)}
                  className="w-full bg-[#050B17]/80 border border-white/10 focus:border-[#D4A353] rounded-xl p-3 text-sm text-gray-300 flex justify-between items-center cursor-pointer select-none"
                >
                  <span>
                    {hallData.amenities.length === 0 
                      ? "Choose features..." 
                      : `${hallData.amenities.length} Selected`}
                  </span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showAmenitiesDropdown ? 'rotate-180' : ''}`} />
                </div>

                {showAmenitiesDropdown && (
                  <div className="absolute mt-2 w-full bg-[#0B1220] border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl max-h-48 overflow-y-auto divide-y divide-white/5">
                    {amenitiesList.map((item, index) => {
                      const isSelected = hallData.amenities.includes(item);
                      return (
                        <div
                          key={index}
                          onClick={() => handleAmenityChange(item)}
                          className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer transition"
                        >
                          <span className="text-gray-300 text-sm font-medium">{item}</span>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#D4A353] border-[#D4A353]' : 'border-white/20'}`}>
                            {isSelected && <Check size={10} className="text-[#050B17] stroke-4" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {hallData.amenities.map(item => (
                  <span key={item} className="bg-[#D4A353]/10 text-[#D4A353] border border-[#D4A353]/20 px-2.5 py-1 rounded-lg text-xs font-semibold">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="border-b border-white/5 pb-2">
                  <h3 className="text-base font-bold text-[#D4A353] uppercase tracking-wider">Media & Pricing Slots</h3>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">Images & Gallery</label>
                  <div className="border-2 border-dashed border-white/10 hover:border-[#D4A353]/50 bg-[#050B17]/50 rounded-2xl p-6 text-center cursor-pointer transition group">
                    <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                      <Upload size={28} className="text-gray-500 group-hover:text-[#D4A353] mb-2 transition" />
                      <span className="text-xs font-bold text-gray-300 block">Upload Drop Zone</span>
                      <span className="text-[10px] text-gray-500 mt-0.5">Multiple image selection</span>
                    </label>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.preview} 
                          alt=""
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-gray-400 block">Available Slots & Pricing</label>
                  
                  <div className="max-h-55 overflow-y-auto space-y-3 pr-1">
                    {slots.map((slot, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 items-center bg-[#050B17]/40 p-2.5 border border-white/5 rounded-xl relative group">
                        
                        <input 
                          type="time" 
                          value={slot.startTime}
                          onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
                          className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2 text-xs font-mono text-center text-white outline-none focus:border-[#D4A353]" 
                        />
                        <input 
                          type="time" 
                          value={slot.endTime}
                          onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
                          className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2 text-xs font-mono text-center text-white outline-none focus:border-[#D4A353]" 
                        />
                        <div className="flex items-center gap-1">
                          <input 
                            type="number" 
                            placeholder="JD" 
                            value={slot.price}
                            onChange={(e) => handleSlotChange(index, 'price', e.target.value)}
                            className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2 text-xs font-bold text-center text-[#D4A353] outline-none focus:border-[#D4A353] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                          />
                          {slots.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => removeSlot(index)}
                              className="p-1.5 text-gray-500 hover:text-red-500 transition"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    type="button"
                    onClick={addSlot}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4A353]/30 text-gray-300 hover:text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <Plus size={14} /> Add Slot
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-white/5 mt-auto">
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-linear-to-r from-[#D4A353] to-[#B3843B] hover:from-[#E6B35F] hover:to-[#C49445] text-[#050B17] text-xs font-extrabold rounded-xl transition duration-300 shadow-lg shadow-[#D4A353]/10 tracking-wider uppercase"
                >
                  Submit Venue for Review
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default EditHall
