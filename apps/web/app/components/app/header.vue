<template>
    <header class="
                sticky top-10 z-10 
                flex h-fit pt-2.5 pb-1 shrink-0 items-center gap-2 
                transition-[width,height] ease-linear 
                group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
                bg-background
                ">
        <div class="px-4 flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
            <div class="flex items-center gap-2 w-full">
                <slot name="left" />
            </div>
            <div class="flex items-center gap-2">
                <slot name="right" />
            </div>
        </div>
    </header>
</template>