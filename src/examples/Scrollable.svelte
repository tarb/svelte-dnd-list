<!-- 
	This is a very simple example that shows basic dragging and dropping in a veritcal list.
 -->
 <svelte:options immutable={true} />

 <script lang="ts">
     import DragDropList, {
         VerticalDropZone,
         reorder,
         HorizontalDropZone,
         HorizontalCenterDropZone,
         type DropEvent,
     } from '$lib';
 
     let items = Array.from(Array(40).keys()).map((_, i) => i + 1);
 
     function onDrop({ detail: { from, to } }: CustomEvent<DropEvent>) {
         if (!to || from === to) {
             return;
         }
 
         items = reorder(items, from.index, to.index);
     }
 </script>
 
 <h1>Svelte Dnd List - Scrollable Containers Example</h1>
 
 <div class="flex root">
     <div class="container y">
         <DragDropList
             id="exampley"
             type={VerticalDropZone}
             itemSize={50}
             itemCount={items.length}
             on:drop={onDrop}
             let:index
         >
             <div class="item">{items[index]}</div>
         </DragDropList>
     </div>
 
     <div class="flex stacked">
         <div class="container x">
             <DragDropList
                 id="examplex"
                 type={HorizontalDropZone}
                 itemSize={50}
                 itemCount={items.length}
                 on:drop={onDrop}
                 let:index
             >
                 <div class="item">{items[index]}</div>
             </DragDropList>
         </div>
 
         <div class="container x">
             <DragDropList
                 id="examplex"
                 type={HorizontalCenterDropZone}
                 itemSize={50}
                 itemCount={items.length}
                 on:drop={onDrop}
                 let:index
             >
                 <div class="item">{items[index]}</div>
             </DragDropList>
         </div>
     </div>
 </div>
 
 <style>
     .flex {
         display: flex;
         gap: 20px;
     }
     .root {
         max-width: 100vw;
     }
     .stacked {
         flex-direction: column;
     }
     .container {
         outline: 2px solid black;
         overflow: hidden;
     }
     .container.y {
         height: 60vh;
         width: 70px;
     }
     .container.x {
         width: 500px;
         height: 70px;
     }
     div.item {
         display: flex;
         justify-content: center;
         align-items: center;
         width: 50px;
         height: 50px;
         border: 1px solid black;
     }
 </style>
 