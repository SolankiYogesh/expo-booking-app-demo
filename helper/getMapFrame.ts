export default (lat: number, lng: number) => `
    <!DOCTYPE html>
    <html>
      <head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;">
        <iframe 
          width="100%" 
          height="300" 
          frameborder="0" 
          style="border:0" 
          src="https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed" 
          allowfullscreen>
        </iframe>
      </body>
    </html>
  `
