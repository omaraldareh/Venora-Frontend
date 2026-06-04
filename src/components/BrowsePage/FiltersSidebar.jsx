import { ChevronDown } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FiltersSidebar = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const updateFilter = (key, value) => {

    const params = new URLSearchParams(searchParams);

    if (!value) {

      params.delete(key);

    } else {

      params.set(key, value);

    }

    navigate(`/browse?${params.toString()}`);

  };

  const activeHallType = searchParams.get("hallType");
  const activeCity = searchParams.get("city");
  const activeCapacity = searchParams.get("minCapacity");

  return (

    <div
      className="
      w-full
      bg-[radial-gradient(circle_at_top,#1E293B_0%,#0F172A_45%,#020617_100%)]
      border border-[#D4A353]/20
      rounded-4xl
      p-5 md:p-6
      shadow-[0_0_40px_rgba(212,163,83,0.08)]
      lg:sticky lg:top-24
      h-fit
      "
    >

      <h2 className="text-xl font-semibold text-white mb-8">
        Filter by:
      </h2>

      <div className="space-y-7">

        {/* Venue Type */}
        <div className="border-b border-white/10 pb-6">

          <button className="flex items-center justify-between w-full mb-4">

            <h3 className="text-[#D4A353] font-semibold text-sm uppercase tracking-wide">
              Venue Type
            </h3>

            <ChevronDown
              size={16}
              className="text-[#D4A353]"
            />

          </button>

          <div className="space-y-3">

            {[
              {
                label: "Wedding",
                value: "wedding",
              },
              {
                label: "Conference",
                value: "conference",
              },
              {
                label: "Event",
                value: "event",
              },
              {
                label: "Meeting",
                value: "meeting",
              },
            ].map((item) => {

              const isActive =
                activeHallType === item.value;

              return (

                <button
                  key={item.value}
                  onClick={() =>
                    updateFilter(
                      "hallType",
                      isActive ? null : item.value
                    )
                  }
                  className={`
                  w-full
                  flex items-center justify-between
                  px-4 py-3
                  rounded-2xl
                  border
                  transition-all duration-300
                  
                  ${
                    isActive
                      ? `
                      bg-[#D4A353]
                      text-black
                      border-[#D4A353]
                      `
                      : `
                      border-white/10
                      bg-white/3
                      text-gray-300
                      hover:border-[#D4A353]/40
                      hover:bg-white/5
                      `
                  }
                  `}
                >

                  <span className="text-sm font-medium">

                    {item.label}

                  </span>

                </button>

              );

            })}

          </div>
        </div>

        {/* Capacity */}
        <div className="border-b border-white/10 pb-6">

          <button className="flex items-center justify-between w-full mb-4">

            <h3 className="text-[#D4A353] font-semibold text-sm uppercase tracking-wide">
              Capacity
            </h3>

            <ChevronDown
              size={16}
              className="text-[#D4A353]"
            />

          </button>

          <div className="flex flex-wrap gap-2">

            {[
              {
                label: "50+",
                value: "50",
              },
              {
                label: "100+",
                value: "100",
              },
              {
                label: "200+",
                value: "200",
              },
            ].map((item) => {

              const isActive =
                activeCapacity === item.value;

              return (

                <button
                  key={item.value}
                  onClick={() =>
                    updateFilter(
                      "minCapacity",
                      isActive ? null : item.value
                    )
                  }
                  className={`
                  px-4 py-2
                  rounded-full
                  border
                  text-sm
                  transition-all duration-300

                  ${
                    isActive
                      ? `
                      bg-[#D4A353]
                      text-black
                      border-[#D4A353]
                      `
                      : `
                      border-white/10
                      bg-white/5
                      text-gray-300
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
        </div>

        {/* City */}
        <div>

          <button className="flex items-center justify-between w-full mb-4">

            <h3 className="text-[#D4A353] font-semibold text-sm uppercase tracking-wide">
              City
            </h3>

            <ChevronDown
              size={16}
              className="text-[#D4A353]"
            />

          </button>

          <div className="space-y-3">

            {[
              "Amman",
              "Dead Sea",
              "Aqaba",
              "Irbid",
              "Zarqa",
              "Madaba",
              "Jerash",
              "Ajloun",
            ].map((city) => {

              const isActive =
                activeCity === city;

              return (

                <button
                  key={city}
                  onClick={() =>
                    updateFilter(
                      "city",
                      isActive ? null : city
                    )
                  }
                  className={`
                  w-full
                  flex items-center justify-between
                  px-4 py-3
                  rounded-2xl
                  border
                  transition-all duration-300

                  ${
                    isActive
                      ? `
                      bg-[#D4A353]
                      text-black
                      border-[#D4A353]
                      `
                      : `
                      border-white/10
                      bg-white/3
                      text-gray-300
                      hover:border-[#D4A353]/40
                      hover:bg-white/5
                      `
                  }
                  `}
                >

                  <span className="text-sm font-medium">

                    {city}

                  </span>

                </button>

              );

            })}

          </div>
        </div>

      </div>

    </div>

  );

};

export default FiltersSidebar;