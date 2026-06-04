import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryTags = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const activeType = searchParams.get("hallType");

  const tags = [
    {
      label: "Wedding",
      value: "wedding",
    },
    {
      label: "Conference",
      value: "conference",
    },
    {
      label: "Meeting",
      value: "meeting",
    },
    {
      label: "Event",
      value: "event",
    },
  ];

  const handleTagClick = (tag) => {

    const params = new URLSearchParams(searchParams);

    if (activeType === tag) {

      params.delete("hallType");

    } else {

      params.set("hallType", tag);

    }

    navigate(`/browse?${params.toString()}`);

  };

  return (

    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 px-4">

      {tags.map((item) => {

        const isActive = activeType === item.value;

        return (

          <button
            key={item.value}
            onClick={() => handleTagClick(item.value)}
            className={`
            px-4 py-2
            rounded-full
            border
            text-xs sm:text-sm
            transition-all duration-300

            ${
              isActive
                ? `
                bg-[#D4A353]
                text-black
                border-[#D4A353]
                shadow-lg shadow-[#D4A353]/30
                scale-105
                `
                : `
                border-[#D4A353]/30
                bg-white/5
                text-white
                hover:bg-[#D4A353]
                hover:text-black
                `
            }
            `}
          >

            {item.label}

          </button>

        );

      })}

    </div>

  );

};

export default CategoryTags;