import sys
import os

try:
    import pypdf
    reader = pypdf.PdfReader("NIKHIL PDF.pdf")
    count = 0
    for page in reader.pages:
        for img_obj in page.images:
            with open(f"img/nikhil_pdf_photo.jpg", "wb") as f:
                f.write(img_obj.data)
            print("Extracted photo using pypdf successfully!")
            count += 1
            break
        if count > 0:
            break
except Exception as e:
    print(f"pypdf extraction failed: {e}")
    try:
        import fitz # PyMuPDF
        doc = fitz.open("NIKHIL PDF.pdf")
        for page in doc:
            image_list = page.get_images(full=True)
            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                with open(f"img/nikhil_pdf_photo.{image_ext}", "wb") as f:
                    f.write(image_bytes)
                print(f"Extracted photo using fitz successfully: nikhil_pdf_photo.{image_ext}")
                break
    except Exception as e2:
        print(f"fitz failed: {e2}")
