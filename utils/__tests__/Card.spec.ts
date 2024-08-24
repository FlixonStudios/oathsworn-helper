import { Card } from "../Card"

describe("Card",() => {
    it("creates a Card with default value of 0 and isCrit false", () =>{
        expect((new Card())?.value).toEqual(0)
        
    })
})