import { useEffect, useState } from "react";
import { tabsData } from "./tabsData";
import { TabsHeader } from "./TabsHeader";


export const TabsComponent = () => {
  const [activeTabId, setActiveTabId] = useState(1);
  const [isVertical, setIsVertical] = useState(false);

  const tabsHandler = (id) =>{
       setActiveTabId(id);
  }

  const tabContent = tabsData.find((item)=>item.id === activeTabId)

     

  useEffect(()=>{
     const getTheDisabledObject =  tabsData.filter((item)=> item.disabled !== true)

    const keyHandler = (e) => {
        if(e.key === "ArrowRight"){
     

          setActiveTabId((prev)=> prev === getTheDisabledObject.length ? 1 : prev + 1)
        }

        if(e.key === "ArrowLeft"){

          setActiveTabId((prev)=> prev === 1 ? getTheDisabledObject.length : prev - 1)
        }

    }
    window.addEventListener("keydown", keyHandler);
     return () => window.removeEventListener("keydown", keyHandler);
  },[])

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <TabsHeader isVertical={isVertical} setIsVertical={setIsVertical}/>

        <section className={`flex ${isVertical ? "flex-row " : "flex-col"} ${isVertical ? "h-[430px]" : "h-[430px]"} overflow-hidden`}>
          {/* Tabs Navigation */}
          <div className={`flex gap-3 ${isVertical ? "flex-col" : "flex-row"} p-6 border-slate-200 bg-slate-50 ${isVertical ? "w-[30%] min-w-[240px] shrink-0 overflow-y-auto border-r" : "w-full border-b"}`}>
            {tabsData.map((item) => (
              <button onClick={()=> tabsHandler(item.id)} key={item.id} disabled={item.disabled}
               className={` w-full px-5 py-2.5 rounded-xl font-medium
              shadow-md
              transition-all duration-300 ${item.disabled ? "cursor-not-allowed bg-gray-200" : (item.id === activeTabId)? "bg-indigo-600 text-white" : "bg-white cursor-pointer"}`}>
                {item.title}
              </button>
            ))}
          </div>

          {/* Content Area */}
          {!tabContent.disabled && (
            <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <i className={`${tabContent.icon} text-indigo-600 text-xl`}></i>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800">{tabContent.title}</h2>
                <p className="text-sm text-slate-500">
                  {tabContent.subtitle}
                </p>
              </div>
            </div>

            <p className="text-slate-600 leading-8">
              {tabContent.description}
            </p>

            <div className="mt-8">
              <h3 className="font-semibold text-slate-800 mb-3">
                Topics Covered
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                {tabContent.topics?.map((item)=>(
                 <div key={item} className="flex items-center gap-2 rounded-xl bg-green-50 p-3">
                   <i className="ri-checkbox-circle-fill text-green-600"></i>
                   <span className="text-sm text-slate-700">
                      {item}
                   </span>
                </div>
                ))}
              </div>
            </div>
          </div>
          )}
         </section>
        </div>
      </main>
    </>
  );
};
