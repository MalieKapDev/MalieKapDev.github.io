let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    slides.forEach((slide, i) => {
        const isCurrent = i === currentIndex;
        const scaleFactor = isCurrent ? 1 : 0.8;
        const transformValue = isCurrent ? 'scale(1)' : 'scale(0.8)';
        const widthValue = isCurrent ? '100%' : '80%';

        slide.style.transform = transformValue;
        slide.style.width = widthValue;
        dots[i].classList.toggle('active-dot', isCurrent);
    });

    const translateValue = -currentIndex * 100 + '%';
    document.querySelector('.slider').style.transform = 'translateX(' + transformValue +')';
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function currentSlide(index) {
    showSlide(index);
}


setInterval(nextSlide, 10000);

$errors = [];

if (!empty($_POST)) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    if (empty($name)) {
        $errors[] = 'Name is empty';
    }

    if (empty($email)) {
        $errors[] = 'Email is empty';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email is invalid';
    }

    if (empty($message)) {
        $errors[] = 'Message is empty' 
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get POST data 
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

    //Validate form fields
    if (empty($name)) {
        $errors[] = 'Name is empty';
    }

    if (empty($email)) {
        $errors[] = 'Email is empty';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email is invalid';
    }

    if (empty($message)) {
        $errors[] = 'Message is empty' 
    }

    //If no errors, send email
    if (empty($errors)) {
        //Recipient email address
        $recipient = "maliekapelianis@gmail.com";

        //Additional headers
        $headers = "From:$name<$email>";

        //Send email
        if (MediaList($recipient, $message, $headers)) {
            echo "Email sent successfully!";
        } else {
            echo "Failed to send email. Please try again later."
        }
    } else {
        //Display errors 
        echo "The form contains the following errors:<br>";
        foreach($errors as $error) {
            echo "- $error<br>";
        }
    }
} else {
    //Not a POST request, display a 403 forbidden error
    header("HTTP/1.1 403 Forbidden");
    echo "You are not allowed to access this page."
}