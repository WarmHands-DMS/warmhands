const locations = {
  provinces: [
    {
      name: 'Western',
      districts: [
        {
          name: 'Colombo',
          cities: [
            'Colombo 1',
            'Colombo 2',
            'Kotte',
            'Dehiwala',
            'Moratuwa',
            'Maharagama',
            'Kesbewa',
            'Homagama',
          ],
        },
        {
          name: 'Gampaha',
          cities: [
            'Gampaha',
            'Negombo',
            'Ja-Ela',
            'Wattala',
            'Minuwangoda',
            'Kelaniya',
            'Kiribathgoda',
            'Ragama',
          ],
        },
        {
          name: 'Kalutara',
          cities: [
            'Kalutara',
            'Panadura',
            'Beruwala',
            'Aluthgama',
            'Horana',
            'Bandaragama',
            'Matugama',
            'Wadduwa',
          ],
        },
      ],
    },
    {
      name: 'Central',
      districts: [
        {
          name: 'Kandy',
          cities: [
            'Kandy',
            'Peradeniya',
            'Gampola',
            'Katugastota',
            'Nawalapitiya',
            'Pilimathalawa',
            'Matale',
          ],
        },
        {
          name: 'Matale',
          cities: [
            'Matale',
            'Dambulla',
            'Sigiriya',
            'Ukuwela',
            'Galewela',
            'Rattota',
            'Pallepola',
          ],
        },
        {
          name: 'Nuwara Eliya',
          cities: [
            'Nuwara Eliya',
            'Hatton',
            'Talawakele',
            'Bandarawela',
            'Ambewela',
            'Ragala',
            'Nanu Oya',
          ],
        },
      ],
    },
    {
      name: 'Southern',
      districts: [
        {
          name: 'Galle',
          cities: [
            'Galle',
            'Hikkaduwa',
            'Unawatuna',
            'Ambalangoda',
            'Karapitiya',
            'Weligama',
            'Ahangama',
          ],
        },
        {
          name: 'Matara',
          cities: [
            'Matara',
            'Weligama',
            'Akurugoda',
            'Dikwella',
            'Tangalle',
            'Mirissa',
            'Kamburupitiya',
          ],
        },
        {
          name: 'Hambantota',
          cities: [
            'Hambantota',
            'Tissamaharama',
            'Tangalle',
            'Beliatta',
            'Sooriyawewa',
            'Ambalantota',
            'Kataragama',
          ],
        },
      ],
    },
    {
      name: 'Northern',
      districts: [
        {
          name: 'Jaffna',
          cities: [
            'Jaffna',
            'Chavakachcheri',
            'Nallur',
            'Point Pedro',
            'Kopay',
            'Valvettithurai',
            'Karainagar',
          ],
        },
        {
          name: 'Kilinochchi',
          cities: [
            'Kilinochchi',
            'Paranthan',
            'Pallai',
            'Mankulam',
            'Kandawalai',
            'Iranamadu',
          ],
        },
        {
          name: 'Mannar',
          cities: ['Mannar', 'Thalaimannar', 'Pesalai', 'Murunkan', 'Adampan'],
        },
        {
          name: 'Vavuniya',
          cities: [
            'Vavuniya',
            'Nedunkeni',
            'Cheddikulam',
            'Omanthai',
            'Puliyankulam',
          ],
        },
        {
          name: 'Mullaitivu',
          cities: [
            'Mullaitivu',
            'Puthukkudiyiruppu',
            'Oddusuddan',
            'Thunukkai',
            'Welioya',
          ],
        },
      ],
    },
    {
      name: 'Eastern',
      districts: [
        {
          name: 'Trincomalee',
          cities: [
            'Trincomalee',
            'Kinniya',
            'Kantale',
            'Mutur',
            'Nilaveli',
            'Pulmoddai',
            'Seruwila',
          ],
        },
        {
          name: 'Batticaloa',
          cities: [
            'Batticaloa',
            'Eravur',
            'Valachchenai',
            'Kalkudah',
            'Kattankudy',
            'Oddamavadi',
            'Valaichchenai',
          ],
        },
        {
          name: 'Ampara',
          cities: [
            'Ampara',
            'Kalmunai',
            'Sainthamaruthu',
            'Uhana',
            'Sammanthurai',
            'Akkaraipattu',
            'Pottuvil',
          ],
        },
      ],
    },
    {
      name: 'North Western',
      districts: [
        {
          name: 'Kurunegala',
          cities: [
            'Kurunegala',
            'Kuliyapitiya',
            'Maho',
            'Pannala',
            'Narammala',
            'Polgahawela',
            'Wariyapola',
          ],
        },
        {
          name: 'Puttalam',
          cities: [
            'Puttalam',
            'Chilaw',
            'Wennappuwa',
            'Anamaduwa',
            'Nattandiya',
            'Marawila',
            'Dankotuwa',
          ],
        },
      ],
    },
    {
      name: 'North Central',
      districts: [
        {
          name: 'Anuradhapura',
          cities: [
            'Anuradhapura',
            'Kekirawa',
            'Mihintale',
            'Medawachchiya',
            'Thambuttegama',
            'Galnewa',
            'Talawa',
          ],
        },
        {
          name: 'Polonnaruwa',
          cities: [
            'Polonnaruwa',
            'Medirigiriya',
            'Hingurakgoda',
            'Dimbulagala',
            'Welikanda',
            'Elahera',
          ],
        },
      ],
    },
    {
      name: 'Uva',
      districts: [
        {
          name: 'Badulla',
          cities: [
            'Badulla',
            'Bandarawela',
            'Welimada',
            'Hali Ela',
            'Ella',
            'Passara',
            'Mahiyanganaya',
          ],
        },
        {
          name: 'Monaragala',
          cities: [
            'Monaragala',
            'Wellawaya',
            'Bibile',
            'Kataragama',
            'Buttala',
            'Siyambalanduwa',
          ],
        },
      ],
    },
    {
      name: 'Sabaragamuwa',
      districts: [
        {
          name: 'Ratnapura',
          cities: [
            'Ratnapura',
            'Balangoda',
            'Embilipitiya',
            'Kuruwita',
            'Pelmadulla',
            'Eheliyagoda',
          ],
        },
        {
          name: 'Kegalle',
          cities: [
            'Kegalle',
            'Mawanella',
            'Rambukkana',
            'Warakapola',
            'Deraniyagala',
            'Yatiyantota',
          ],
        },
      ],
    },
  ],
};

const allCities = locations.provinces.flatMap((province) =>
  province.districts.flatMap((district) => district.cities)
);

export { locations, allCities };
