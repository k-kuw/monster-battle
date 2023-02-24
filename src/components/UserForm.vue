<template>
    <form>
      <slot></slot>
     <div>
    <label for="email">email</label>
    <input type="text" name="email" id="email">
    </div>
    <div>
    <label for="passward">passward</label>
    <input type="text" name="passward" id="passward">
    </div>
  </form>
</template>
