type AddSwapiPeopleReqDTO = {
	name: string;
	height: string;
  gender: string;
	hair_color?: string;
  eye_color?: string;
  
}

export class addSwapiPeoplePayload {
  private body = {
    "name": "${name}",
    "height": "${height}",
    "hair_color": "${hair_color}",
    "eye_color": "${eye_color}",
    "gender": "${gender}"
  }

  async getAddSwapiPeopleApiPayload({
    name,
    height,
    hair_color,
    eye_color,
    gender
  }: AddSwapiPeopleReqDTO): Promise<Object> {
    this.body.name = name
    this.body.height = height
    this.body.gender = gender
    this.body.hair_color = hair_color ? hair_color : 'black',
    this.body.eye_color = eye_color ? eye_color : 'blue'
    
    return this.body;
  }
}