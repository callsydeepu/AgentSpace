import React from 'react'
import { Coins, LogOut, Menu, MessageSquare, PanelLeftIcon, PanelRight, PenBoxIcon, PenSquare, Plus, User, X } from "lucide-react"
import { useState } from 'react'
import { useEffect } from 'react'
import { getConversations } from '../features/getConversations'
import { useDispatch, useSelector } from 'react-redux'
import { addConversation, setConversations, setSelectedConversation } from '../redux/conversationSlice'

import { createConversation } from '../features/createConversation'
import logOut from '../features/logOut'
import { setUserdata } from '../redux/userSlice'
import BillingDrawer from './BillingDrawer'
function SideBar() {
    const [collapsed, setCollapsed] = useState(false)       // true = thin 56px sidebar, false = full 270px sidebar
    const dispatch = useDispatch()                          // messenger to send updates to Redux store
    const [imageError, setImageError] = useState(false)     // true = user's avatar image failed to load, show fallback icon
    const { conversations, selectedConversation } = useSelector(state => state.conversation)  // read chat list & active chat from Redux
    const { userData } = useSelector(state => state.user)   // read logged-in user info from Redux
    const [showBilling,setShowBilling]=useState(false)      // true = billing drawer is open
    const [mobileOpen,setMobileOpen]=useState(false)        // true = mobile sidebar drawer is open
    const currentUserId = userData?._id || userData?.userId

    // Runs when user logs in/out (currentUserId changes) — fetches all conversations from backend
    useEffect(() => {
        if (!currentUserId) {
            dispatch(setConversations([]))
            return
        }
        const getConv = async () => {
            const data = await getConversations()
            dispatch(setConversations(data))
        }
        getConv()
    }, [currentUserId])

    // Creates a new conversation in the database and opens it
    const handleCreateConversation = async () => {
        if (!currentUserId) return
        const data = await createConversation()
        if (data && data._id) {
            dispatch(addConversation(data))
            dispatch(setSelectedConversation(data))
        }
    }



    // ==========================================
    // COLLAPSED SIDEBAR (thin 56px icon strip)
    // Only shown on desktop when collapsed=true
    // ==========================================
    if (collapsed) {
        return (
            // Outer container — thin vertical strip, hidden on mobile
            <div className='hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-1 shrink-0'>

                {/* Expand button — click to go back to full sidebar */}
                <button className='flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1'
                    onClick={() => setCollapsed(false)}
                >
                    <PanelRight />
                </button>

                {/* New chat button — creates a new conversation */}
                <button
                    className='flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer '
                    onClick={handleCreateConversation}
                >
                    <Plus size={17} />
                </button>

                {/* Conversation list (icons only, no text) — scrollable */}
                <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-5'>
                    {conversations.map((conv, i) => {
                        const isActive = selectedConversation?._id == conv?._id
                        return (
                            // Single conversation row — click to open this chat
                            <div
                                onClick={() => dispatch(setSelectedConversation(conv))}
                                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150
                ${isActive ? "bg-indigo-500/10 border-indigo-500/[0.18]"
                                        : "bg-transparent border-transparent"}`}>

                                {/* Chat icon — indigo when active, grey when inactive */}
                                <div className={`flex items-center justify-center shrink-0 w-[20px] h-[20px] rounded-lg transition-colors duration-150
                ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.05] text-slate-500"}`}>
                                    <MessageSquare size={13} />
                                </div>
                               

                            </div>
                        )
                    })}

                </div>

                {/* User avatar at the bottom — shows profile photo or fallback icon */}
                <div className='"relative shrink-0'>
                                {
                                    (userData?.avatar && !imageError)
                                        ?
                                        // User's profile photo
                                        <img
                                            className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25'
                                            src={userData?.avatar}
                                            alt={"image"}
                                            onError={() => setImageError(true)} />
                                        :
                                        // Fallback — generic person icon (when no avatar or image failed)
                                        <div className='w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center'>
                                            <User size={15} className="text-slate-400" />
                                        </div>

                                }

                            </div>
                

            </div>
        )
    }


    // ==========================================
    // EXPANDED SIDEBAR (full 270px with text)
    // This is the main/default view
    // ==========================================
    return (
        <>
         
        {/* Mobile hamburger button — only visible on small screens, opens the sidebar drawer */}
        <button className='lg:hidden fixed top-3.5 left-4 z-50 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0d0f14] border border-white/[0.06] text-slate-400 hover:text-slate-200 transition-colors duration-150 cursor-pointer' onClick={()=>setMobileOpen(true)}>
            <Menu size={14}/>
         </button>

         {/* Mobile backdrop overlay — dark blurry background, click to close sidebar */}
         {mobileOpen && <div onClick={()=>setMobileOpen(false)} className='lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'/>}
  


        {/* Main sidebar container — fixed drawer on mobile, static on desktop, slides in/out on mobile */}
        <div className={` fixed lg:static inset-y-0 left-0 z-50
        w-[270px] h-screen shrink-0
        bg-[#0d0f14] border-r border-white/[0.06]
        transition-transform duration-250
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
`}
      >

            

            {/* Inner column layout — organizes everything top to bottom */}
            <div className='flex flex-col h-full'>

                {/* ===== HEADER BAR ===== */}
                {/* Contains: collapse button, close button (mobile), app name, plan badge, new chat icon */}
                <div className='flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]'>

                    {/* Collapse button (desktop only) — shrinks sidebar to 56px icon strip */}
                    <div className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
                        onClick={() => setCollapsed(true)}
                    >
                        <PanelLeftIcon />
                    </div>

                    {/* Close button (mobile only) — closes the sidebar drawer */}
                    <button  onClick={() => setMobileOpen(false)}
          className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
>
                        <X/>
                    </button>

                    {/* App name */}
                    <span className='text-[16px] font-semibold text-slate-100 tracking-tight flex-1'>
                        AgentSpace
                    </span>

                    {/* Plan badge — shows "free" or "pro" in a small pill */}
                    <span className='text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide'>{userData?.plan || "free"}</span>

                    {/* New chat icon button — creates a new conversation */}
                    <button className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
                        onClick={handleCreateConversation}>
                        <PenSquare size={14} />
                    </button>
                </div>

                {/* ===== NEW CHAT BUTTON ===== */}
                {/* Big purple gradient button to start a new conversation */}
                <div className='px-4 pt-4 pb-1'>
                    <button className='w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150'
                        onClick={handleCreateConversation}
                    >
                        <Plus size={15} />
                        New Chat
                    </button>
                </div>

                {/* ===== SECTION LABEL ===== */}
                {/* Shows "Recents" if there are conversations, or "No Recent Conversations" if empty */}
                {conversations.length == 0
                    ?
                    <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
                        No Recent Conversations
                    </div>
                    :
                    (
                        <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
                            Recents
                        </div>
                    )}


                {/* ===== CONVERSATION LIST ===== */}
                {/* Scrollable list of all past conversations — takes up remaining space */}
                <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                    {conversations?.map((conv, i) => {
                        const isActive = selectedConversation?._id == conv?._id
                        return (
                            // Single conversation row — click to open this chat, highlighted if active
                            <div
                                onClick={() => dispatch(setSelectedConversation(conv))}
                                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150
                ${isActive ? "bg-indigo-500/10 border-indigo-500/[0.18]"
                                        : "bg-transparent border-transparent"}`}>

                                {/* Chat icon — indigo when active, grey when inactive */}
                                <div className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-colors duration-150
                ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.05] text-slate-500"}`}>
                                    <MessageSquare size={13} />
                                </div>

                                {/* Conversation title — shows title or "New Chat", truncated if too long */}
                                <span className={`text-[13px] font-medium truncate ${isActive ? "text-slate-100" : "text-slate-300"}`}>
                                    {conv?.title || "New Chat"}
                                </span>

                            </div>
                        )
                    })}

                </div>

                {/* ===== DIVIDER LINE ===== */}
                {/* Thin horizontal line separating chat list from profile section */}
                <div className='mx-2.5 h-px bg-white/[0.06]' />

                {/* ===== USER PROFILE SECTION ===== */}
                {/* Shows user info if logged in, or Login button if not */}
                <div className='px-3.5 py-3.5'>
                    {userData ? (
                        // Logged-in user row — avatar, name, plan, billing & logout buttons
                        <div className='flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150'>

                            {/* User avatar container */}
                            <div className='"relative shrink-0'>
                                {
                                    (userData?.avatar && !imageError)
                                        ?
                                        // Profile photo — rounded with indigo border
                                        <img
                                            className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25'
                                            src={userData?.avatar}
                                            alt={"image"}
                                            onError={() => setImageError(true)} />
                                        :
                                        // Fallback icon — shown when no avatar or image failed to load
                                        <div className='w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center'>
                                            <User size={15} className="text-slate-400" />
                                        </div>

                                }

                            </div>

                            {/* User name and plan text */}
                            <div className='flex-1 min-w-0'>
                                {/* User's display name */}
                                <p className='text-[13.5px] font-semibold text-slate-100 truncate'>{userData?.name || "user"}</p>
                                {/* User's plan (free/pro) */}
                                <p className='text-[11px] text-slate-600 mt-px'>{`${userData?.plan}` || "free plan"} </p>
                            </div>

                            {/* Action buttons — billing and logout */}
                            <div className='flex gap-1'>
                                {/* Billing button — opens the billing drawer to see credits and plans */}
                                <button 
                                onClick={()=>setShowBilling(true)}
                                className='flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150'>
                                    <Coins size={16} />
                                </button>

                                {/* Logout button — clears session on server + clears user data in Redux */}
                                <button className='flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150'
                                    onClick={() => {
                                        logOut();
                                        dispatch(setUserdata(null))
                                    }}
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>
                        </div>)
                        :
                        // Not logged in — show Login button
                        <button className='w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-200 bg-white/[0.05] border border-white/[0.08] rounded-xl py-[11px] cursor-pointer hover:bg-white/[0.08] transition-colors duration-150'>
                            Login
                        </button>}
                </div>
            </div>

        </div>

        
           {/* Billing drawer — slides in from right when coins button is clicked */}
           <BillingDrawer
           open={showBilling}
           onClose={()=>setShowBilling(false)}
           />

        </>
    )




}

export default SideBar


// Sidebar mounts
//     │
//     ▼
// useEffect runs (because userData changed)
//     │
//     ▼
// calls getConversations()
//     │
//     ▼
// API call: GET http://localhost:8000/api/chat/get-conversations
//     │
//     ▼
// Gateway receives it → protect middleware checks your session cookie in Redis
//     │
//     ├── ❌ Not logged in → returns [] (empty array)
//     │
//     └── ✅ Logged in → forwards to Chat Service (port 8002)
//                             │
//                             ▼
//                        returns your conversations from MongoDB
//                             │
//                             ▼
//                dispatch(setConversations(data))
//                             │
//                             ▼
//                Redux store updates: conversations = [{...}, {...}, ...]
//                             │
//                             ▼
//                Sidebar re-renders → shows your chat list