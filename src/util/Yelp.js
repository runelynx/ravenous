const apiKey = 'zbbbMUXs87Sn3-O4dKy-aJ4SLYp8SKixroNk69LPwWYmXfpjICE_AX7AskOvzhWls1JA8Y_fQXwzl2J4-kMl4aCCl7t9nMaX_e7jdalrmbr86ci7ut9eW_deEYV_WnYx';
let urlToFetch = 'https://api.yelp.com/v3/businesses/search?';

export const Yelp = {

search(term, location, sortBy) {
    
    urlToFetch = `${urlToFetch}term=${term}&location=${location}&sort_by=${sortBy}`;

    return fetch('https://cors-anywhere.herokuapp.com/' + urlToFetch, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
            if(jsonResponse.businesses) {
               return jsonResponse.businesses.map(business => ({
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }));
                }
            });
          }
        };