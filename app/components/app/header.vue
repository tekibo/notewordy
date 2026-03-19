<template>
    <header class="
                sticky top-0 z-10 
                flex h-16 shrink-0 items-center gap-2 
                transition-[width,height] ease-linear 
                group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
                ">
        <div class="px-4 flex items-center gap-2 w-full">
            <SidebarTrigger class="-ml-1 " />
            <slot />
        </div>
    </header>
</template>