from django.shortcuts import render,redirect
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_protect




def benefits(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        context = {'desktop_version':False}
    else:
        context = {'desktop_version':True}
    return render(request,"presentation-benefits.html",context)


def spectrum(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        context = {'desktop_version':False}
    else:
        context = {'desktop_version':True}
    return render(request,"presentation-spectrum.html",context)



def mobile(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        context = {'desktop_version':False}
    else:
        context = {'desktop_version':True}
    return render(request,"presentation-index-mobi.html",context)


def home_2d(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        context = {'desktop_version':False}
    else:
        context = {'desktop_version':True}
    return render(request,"presentation-index-2d.html",context)


def home(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        context = {'desktop_version':False}
    else:
        context = {'desktop_version':True}
    return render(request,"presentation-index.html",context)


def tech_smartpdu(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        context = {'desktop_version':False}
    else:
        context = {'desktop_version':True}
    return render(request,"presentation-tech-smartpdu.html",context)


def buy(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        context = {'desktop_version':False}
    else:
        context = {'desktop_version':True}
    return render(request,"presentation-buynow.html",context)

def contact(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        context = {'desktop_version':False}
    else:
        context = {'desktop_version':True}
    return render(request,"presentation-contact.html",context)


@csrf_protect
def contact_submit(request):
    # sales type contact!
    if request.POST["type"] == "sales":
        subject = "Website Sales Request"
        recipients = ['sales@del9.biz'];
        message = message = "****WEBSITE SALES CONTACT ****\n"
    else:
        subject = "Website Contact Request"
        recipients = ['contact@del9.biz'];
        message = "****WEBSITE CONTACT ****\n"
    sender = request.POST["name"]+" <"+request.POST["email"]+" >"
    message = message+"CONTACT NAME: "+request.POST["name"]+"\nPRONOUNS: "+request.POST["pronouns"]+"\nEMAIL: "+request.POST["email"]+"\nPHONE:"+request.POST["phone"]+"\n********\nMESSAGE:\n\n"
    message = message+request.POST["message"]+"\n*******"
    send_mail(subject, message, sender, recipients)
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        context = {'desktop_version':False}
    else:
        context = {'desktop_version':True}
    return render(request,"presentation-contact-ok.html",context)



def spectrum_explorer(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        context = {'desktop_version':False}
    else:
        context = {'desktop_version':True}
    return render(request,"presentation-spectrum-explorer.html",context)
