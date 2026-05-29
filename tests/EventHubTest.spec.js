import {test, expect} from "@playwright/test"

test('EventHub Assignment Test',async({page})=>{
    
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill("nikhil123456@gmail.com");
    await page.getByLabel("Password").fill("Nikhil@123");
    await page.locator("#login-btn").click();
    
    await expect(page.getByRole("link",{name:"Browse Events →"})).toBeVisible();
    await page.locator("[href='/admin/events']").click();

    const title = `Test Event ${Date.now()}`;
    await page.locator("#event-title-input").fill(title);
    await page.locator("#admin-event-form textarea").fill("Event for folks in QA");
    await page.getByLabel("City").fill("Patna");
    await page.getByLabel("Venue").fill("Hotel Maurya");
    await page.getByLabel("Event Date & Time").fill('2027-12-31T10:00');
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText('Event created!')).toBeVisible();
    console.log(`Created event: "${title}"`);

    await page.locator("[href='/events']").nth(0).click();
    await page.locator("#event-card h3").first().waitFor();
    const events = await page.locator("#event-card");
    let seatsBeforeBooking = "";
    for(let i=0;i<await events.count();++i){
        const titleEvent = await events.nth(i).locator("h3").textContent();
        if(titleEvent===title){
            seatsBeforeBooking = await events.nth(i).locator(".text-emerald-600").textContent();
            console.log(seatsBeforeBooking);
            await events.nth(i).locator('[data-testid="book-now-btn"]').click();
            break;
        }
    }

    await expect(page.locator('#ticket-count')).toHaveText("1");
    await page.getByLabel("Full Name").fill("Nikhil");
    await page.locator("#customer-email").fill("nikhil@email.com");
    await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
    await page.locator(".confirm-booking-btn").click();

    const bookingId = await page.locator(".booking-ref").textContent();
    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef = bookingId.trim();

    await page.getByRole("button",{name:"View My Bookings"}).click();
    expect(await page.url()).toBe("https://eventhub.rahulshettyacademy.com/bookings");
    await page.locator("#booking-card").first().waitFor();
    const bookings = await page.locator("#booking-card");
    for(let i=0;i<await bookings.count();++i){
        const expectedBooking = await bookings.nth(i).locator(".booking-ref").textContent();
        if(expectedBooking===bookingRef){
            await expect(bookings.nth(i).locator("h3")).toHaveText(title);
        }
    }
    seatsBeforeBooking = seatsBeforeBooking.split(" ")[0];
    await page.locator("[href='/events']").nth(0).click();
    await page.locator("#event-card h3").first().waitFor();
    const events1 = await page.locator("#event-card");
    let seatsAfterBooking = "";
    for(let i=0;i<await events1.count();++i){
        const titleEvent = await events.nth(i).locator("h3").textContent();
        if(titleEvent===title){
            seatsAfterBooking = await events.nth(i).locator(".text-emerald-600").textContent();
            seatsAfterBooking = seatsAfterBooking.split(" ")[0];
            expect(Number(seatsAfterBooking) === Number(seatsBeforeBooking)-1).toBeTruthy();
            break;
        }
    }

    
    
})