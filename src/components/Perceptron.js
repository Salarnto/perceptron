function Perceptron(inputs, weight, learningRate) {
    let new_weights = weight;
    let updated = false;
    
    inputs.forEach(input => {

      const result = new_weights[0] * input.x + new_weights[1] * input.y + new_weights[2];

      if(result <= 0 && input.class === 'One'){
        new_weights[0] += learningRate * input.x;
        new_weights[1] += learningRate * input.y;
        new_weights[2] += learningRate;
        updated = true;
      }else if(result >= 0 && input.class === 'Two'){
        new_weights[0] -= learningRate * input.x;
        new_weights[1] -= learningRate * input.y;
        new_weights[2] -= learningRate;
        updated = true;
      }
    });
    
    return { weights: new_weights, update: updated };
}

export default Perceptron