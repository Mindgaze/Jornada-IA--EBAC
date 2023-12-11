export default{
    //////Pular 
    jump : new KeyboardEvent('keydown',{key : 'space' , keyCode : 32}),
    /////Abaixar
    crounch : new KeyboardEvent('keydown',{key : 'down' , keyCode : 40}),
    
    dispatch(event) {
        if (event === 'crouch') {
            document.dispatchEvent(this.crouch);
        } else {
            document.dispatchEvent(this.jump);
        }
    }
};