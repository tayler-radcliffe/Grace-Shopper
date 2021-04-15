const client = require('./client');


async function createReview({title, stars, description, productId}) {
  if(!title) {
    return
  }

    try {
       await client.query(`
      INSERT INTO reviews(title, stars, description, "productsId")
      VALUES ($1, $2, $3, $4)
      `, [title, stars, description, productId]);
  
      const { rows: [reviews] } = await client.query(`
      SELECT * FROM reviews
      WHERE description
      IN ($1);
      `, [description]);
  
      return reviews;
    } catch (error) {
      throw error;
    }
  }

  async function createAdditionalReview({title, stars, description, productId}) {
  
      try {
         await client.query(`
        INSERT INTO reviews(title, stars, description, "productsId")
        VALUES ($1, $2, $3, $4)
        `, [title, stars, description, productId]);
    
        const { rows: [reviews] } = await client.query(`
        SELECT * FROM reviews
        `);
        
        return reviews;

      } catch (error) {
        throw error;
      }
    }
    


module.exports = {
    createReview,
    createAdditionalReview,
}