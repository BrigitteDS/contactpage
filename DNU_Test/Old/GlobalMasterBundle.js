function onBetRemoveClick(n, t) {
	if (n.preventDefault(), t) {
		var i = "#" + t;
		showOverlay();
		pat.post("/Bet/RemoveOutcomeJSON", {
			outcomeId: t
		}, {
			dataType: "html"
		}).done(function (n) {
			var t = $(i),
				r;
			t.is("option") ? (t.parent().removeClass("isSelected"), t.parent().removeClass("isSelectedInPlay"), t.parent().val("EMPTY"), t.parent().removeClass("isSelectedInPlay"), t.removeClass("isSelected"), t.removeClass("isSelectedInPlay")) : (t.removeClass("isSelected"), t.removeClass("isSelectedInPlay"));
			$("#right").is(":visible") || (r = JSON.parse(n).Outcomes.length, $("#mobileBetslipCount").length > 0 ? $("#mobileBetslipCount").text(r) : $("#betslipCountBadge").length > 0 && $(".betslipCountBadgeCount").text(r));
			closeOverlay();
			AddBetItemClientSide(n)
		})
	}
}

function onRemoveLiveInPlayBet(n, t) {
	pat.post("/Bet/RemoveLiveInPlayOutcome", {
		liveInPlayParameterType: n,
		fieldId: t
	}, {
		dataType: "html"
	}).done(function (n) {
		if ($("#right").is(":visible")) $("#right").html(""), $("#right").html(n);
		else {
			$("#mobileBetslipContainer").html("");
			$("#mobileBetslipContainer").html(n);
			var t = JSON.parse(n).Outcomes.length;
			$("#mobileBetslipCount").length > 0 ? $("#mobileBetslipCount").text(t) : $("#betslipCountBadge").length > 0 && $(".betslipCountBadgeCount").text(t)
		}
	})
}

function updateOutcomeBetslipPriceDecimal(n, t) {
	pat.post("/Bet/UpdateOutcomeBetslipPriceDecimal", {
		outcomeId: n,
		priceDecimal: t
	}, {
		dataType: "html"
	}).done(function (n) {
		if ($("#right").is(":visible")) $("#right").html(""), $("#right").html(n);
		else {
			$("#mobileBetslipContainer").html("");
			$("#mobileBetslipContainer").html(n);
			var t = JSON.parse(n).Outcomes.length;
			$("#mobileBetslipCount").length > 0 ? $("#mobileBetslipCount").text(t) : $("#betslipCountBadge").length > 0 && $(".betslipCountBadgeCount").text(t)
		}
	})
}

function onResetBetslip(n) {
	n.toUpperCase() === "TRUE" && pat.get("/Bet/_BetslipGet", null, {
		dataType: "html"
	}).done(function (n) {
		$("#right").is(":visible") ? ($("#right").html(""), $("#right").html(n), $(".isSelected").removeClass("isSelected"), $(".isSelectedInPlay").removeClass("isSelectedInPlay")) : ($("#mobileBetslipContainer").html(""), $("#mobileBetslipContainer").html(n), $(".isSelected").removeClass("isSelected"), $(".isSelectedInPlay").removeClass("isSelectedInPlay"))
	})
}

function setFreeBetslipWagers(n) {
	$("#WagerAmount").focus();
	$("#potentialWager").val(parseFloat(n).toFixed(2));
	$("#WagerAmount").val(parseFloat(n).toFixed(2));
	setBetslipPotentialReturn()
}

function onPlaceCashBet(n, t, i) {
	n.preventDefault();
	GetBetConfirmationModal(t, i)
}

function onPlaceFreeBet(n, t, i, r) {
	setFreeBetslipWagers(i);
	n.preventDefault();
	GetBetConfirmationModal(t, r)
}

function onCancelBet() {
	event.preventDefault();
	showOverlay();
	pat.get("/Bet/_BetCancel", null, {
		dataType: "html"
	}).done(function (n) {
		$("#right").is(":visible") ? ($("#right").html(""), $("#right").html(n)) : ($("#mobileBetslipContainer").html(""), $("#mobileBetslipContainer").html(n));
		closeOverlay()
	})
}

function clearBetslip() {
	showOverlay();
	pat.post("/Bet/ClearBetslip", null, {
		dataType: "html"
	}).done(function (n) {
		$("#right").is(":visible") ? ($("#right").html(""), $("#right").html(n), $(".isSelected").removeClass("isSelected")) : ($("#mobileBetslipContainer").html(""), $("#mobileBetslipContainer").html(n), $(".isSelected").removeClass("isSelected"), window.location = "/", $("#mobileBetslipCount").length > 0 ? $("#mobileBetslipCount").html(0) : $("#betslipCountBadge").length > 0 && $(".betslipCountBadgeCount").html(0));
		location.reload()
	})
}

function GetBetConfirmationModal(n, t) {
	showOverlay();
	pat.post(n, t, {
		dataType: "html"
	}).done(function (n) {
		$("#modal-container-bet-confirmation").html(n);
		$("#modal-container-bet-confirmation").modal();
		closeOverlay()
	})
}

function onBetConfirmationModalClick(n, t, i, r) {
	n.preventDefault();
	showOverlay();
	pat.post(t, i).done(function (n) {
		if ($("#modal-container-bet-confirmation").html(""), $("#modal-container-bet-confirmation").html(n), r && $("#modal-container-bet-confirmation").modal(), RefreshCashBalance(), closeOverlay(), anchorToTop(), $("#footerMobile").is(":visible") && $("#modal-container-bet-confirmation").find(".error-message").length === 0) {
			$("#mobileBetslipCount").html("(0)");
			$("#mobileBetslipCount").length > 0 ? $("#mobileBetslipCount").html("(0)") : $("#betslipCountBadge").length > 0 && $(".betslipCountBadgeCount").html("0");
			$("#modal-container-bet-confirmation").on("hide.bs.modal", function () {
				window.location = "/"
			})
		}
	})
}

function onInstantBetClickOpera(n, t, i) {
	n.preventDefault();
	showOverlay();
	pat.post(t, i).done(function (n) {
		RefreshCashBalance();
		$("#main").html("");
		$("#main").html(n);
		closeOverlay()
	})
}

function setBetslipPotentialReturn() {
	var t = $("#potentialWager").val(),
		u, i, n, r;
	u = $("#betslip-totalpricedecimal")[0] != null ? $("#betslip-totalpricedecimal")[0].innerText : 0;
	i = $("#MaximumPayout").val();
	n = 0;
	$.isNumeric(t) && (n = t * u, n > i && (n = i), $("#WagerAmount").val(t), r = parseFloat(n).toFixed(2), $("#PotentialReturnAmount").val(r), $("#potentialReturn").val(r))
}

function fittext() {
	var o = 11,
		i = 227,
		s = 20,
		h = 15,
		r = document.getElementsByClassName("fitin"),
		u = document.getElementsByClassName("fitin"),
		t = document.createElement("span"),
		n, f, e;
	for (t.style.fontSize = h + "px", n = 0; n < u.length; n++) {
		t.innerHTML = u[n].innerHTML;
		document.body.appendChild(t);
		f = t.offsetWidth;
		e = t.offsetHeight;
		document.body.removeChild(t);
		var c = f > i ? i / f : 1,
			l = e > s ? s / e : 1,
			a = Math.min(c, l) * h;
		r[n].parentElement.parentElement.parentElement.offsetWidth < i ? (r[n].style.fontSize = o - .5 + "px", r[n].parentElement.parentElement.parentElement.offsetWidth < i - 60 && (r[n].style.fontSize = o - 2 + "px")) : u[n].style.fontSize = a - .11 + "px"
	}
}

function AddBetItemClientSide(n) {
	var r, f, t, u, i;
	if (n.Outcomes == null && (n = JSON.parse(n)), r = document.getElementById("betslip-list"), r != null)
		if (r.innerHTML = "", $("#MinBetAmount").val(n.MinBetAmount), $("#MaximumPayout").val(n.MaximumPayout), $("#DefaultBetAmount").val(n.DefaultBetAmount), $("#CouponId").val(n.CouponId), $("#IsFreeBet").val(n.IsFreeBet), $("#FreeBetBalance").val(n.FreeBetBalance), $("#PotentialReturnAmount").val(n.PotentialReturnAmount), n.Outcomes != null && n.Outcomes.length > 0) {
			for (f = 0; f < n.Outcomes.length; f++) t = n.Outcomes[f], u = document.createElement("li"), u.className = "SelectedOutcomeForBetslip", t.MarketTypeCategoryId == "00000000-0000-0000-da7a-000000580003" && u.setAttribute("data-lip-betslip", t.OutcomeId), i = document.createElement("DIV"), i.className = "container-fluid betslip-box item betslip-box", i.appendChild(GenerateBetslipEventTitleRow(t.EventTitle, t.OutcomeId, t.MarketTypeCategoryId)), i.appendChild(GenerateMarketTitle(t.MarketTitle)), i.appendChild(GenerateOutcomeRow(t.OutcomeId, t.OutcomeTitle, t.PriceDecimal, t.MarketTypeCategoryId)), u.appendChild(i), r.appendChild(u);
			document.getElementById("betslip-removeall") == null && n.Outcomes.length > 0 && r.appendChild(GenerateRemoveAllButton());
			n.Outcomes.length > 0 && setFooterWithControls()
		} else setFooterEmptyBetslip();
	ApplyServerColour(currentPageColour);
	fittext();
	n.AllowInstantBet == !0 && $("#placeCashBet").text("Instant bet @ " + n.TotalPriceDecimal);
	setBetslipPotentialReturn()
}

function setFooterWithControls() {
	$("#divBetslipEmpty").hide();
	$("#divBetslipCenterNotEmpty").show();
	$("#divPotentialReturn").show();
	$("#divPotentialWager").show();
	$("#divApplicableLimits").show()
}

function setFooterEmptyBetslip() {
	$("#divBetslipEmpty").show();
	$("#divBetslipCenterNotEmpty").hide();
	$("#divPotentialReturn").hide();
	$("#divPotentialWager").hide();
	$("#divApplicableLimits").hide()
}

function GenerateRemoveAllButton() {
	var t = document.createElement("LI"),
		n, i, r, u;
	return t.id = "betslip-removeall", t.className = "oddsAndRemoveAll", n = document.createElement("SPAN"), n.className = "item item-noborder oddsAndRemoveAll-padding", i = document.createElement("SPAN"), i.className = "item-right", r = document.createElement("LABEL"), r.className = "h5", r.innerHTML = "<b>Total Odds:<span id='betslip-totalpricedecimal'>" + getTotalPriceDecimalFromBetslip().toFixed(2) + "<\/span><\/b>", i.appendChild(r), n.appendChild(i), u = document.createElement("SPAN"), u.className = "item-left", u.innerHTML = "<form action='/Bet/RemoveAllOutcomes' id='RemoveAllOutcomes' method='post'> <button onclick='showOverlay();' class='btn btn-default btn-action colour'><div> Remove All<\/div><\/button><\/form><\/span>", n.appendChild(u), t.appendChild(n), t
}

function getTotalPriceDecimalFromBetslip() {
	var t = $(".betslipPriceDecimal"),
		n = 1;
	return t.each(function (t, i) {
		var r = $(i).text().trim();
		n *= r
	}), n
}

function GenerateOutcomeRow(n, t, i, r) {
	var f = document.createElement("DIV"),
		e, o, c, s, h, u;
	return f.className = "row", e = document.createElement("DIV"), e.className = bootstrapColumns(10), o = document.createElement("DIV"), o.className = "betslipRowSpace", c = document.createElement("SPAN"), s = document.createElement("LABEL"), s.className = "label-smaller", h = document.createElement("DIV"), h.className = bootstrapColumns(2), u = document.createElement("DIV"), u.className = "bg-alt betslipPriceDecimal", r == "00000000-0000-0000-da7a-000000580003" && (u.setAttribute("data-lip-value", n), u.setAttribute("data-lip-pricedecimal", i)), h.appendChild(u), u.innerHTML = i.toFixed(2), s.innerHTML = t, c.appendChild(s), o.appendChild(c), e.appendChild(o), f.appendChild(e), f.appendChild(h), f
}

function GenerateMarketTitle(n) {
	var t = document.createElement("DIV"),
		i, r, u, f, e;
	return t.className = "row", i = document.createElement("DIV"), i.className = bootstrapColumns(10), r = document.createElement("DIV"), r.className = "betslipRowSpace", u = document.createElement("LABEL"), u.className = "label-smaller", u.innerHTML = "<b>" + n + "<\/b>", r.appendChild(u), i.appendChild(r), f = document.createElement("DIV"), f.className = bootstrapColumns(2), e = document.createElement("DIV"), e.className = "bg-alt", f.appendChild(e), t.appendChild(i), t.appendChild(f), t
}

function GenerateBetslipSportRow(n, t, i) {
	var r = document.createElement("DIV"),
		u, f, o, e;
	return r.className = "row", u = document.createElement("DIV"), u.className = bootstrapColumns(10), f = document.createElement("DIV"), u.appendChild(f), o = document.createElement("LABEL"), o.innerHTML = "<b>" + n + "<\/b>", f.appendChild(o), i == "00000000-0000-0000-da7a-000000580003" && (e = document.createElement("LABEL"), e.innerHTML = "<b>&nbsp; (Live)<\/b>", e.style = "color:#A6BB42", f.appendChild(e)), r.appendChild(u), r.appendChild(GenerateRemoveDiv(t)), r
}

function GenerateBetslipEventTitleRow(n, t, i) {
	var r = document.createElement("DIV"),
		u, f, s, e, o;
	return r.className = "row", u = document.createElement("DIV"), u.className = bootstrapColumns(10), f = document.createElement("DIV"), f.className = "label-small theOtherFont", s = document.createElement("P"), e = document.createElement("b"), e.innerHTML = n, s.appendChild(e), i == "00000000-0000-0000-da7a-000000580003" && (o = document.createElement("LABEL"), o.innerHTML = "<b>&nbsp; (Live)<\/b>", o.style = "color:#A6BB42", e.appendChild(o)), f.appendChild(s), u.appendChild(f), r.appendChild(u), r.appendChild(GenerateRemoveDiv(t)), r
}

function GenerateRemoveDiv(n) {
	var u = document.createElement("DIV"),
		i, r, t, f;
	return u.className = bootstrapColumns(2), i = document.createElement("DIV"), i.className = "bg-alt", r = document.createElement("SPAN"), r.className = "item-info", t = document.createElement("BUTTON"), t.className = "button-remove", t.onclick = function () {
		onBetRemoveClick(event, n)
	}, f = document.createElement("DIV"), f.innerHTML = "X", t.appendChild(f), r.appendChild(t), i.appendChild(r), u.appendChild(i), u
}

function bootstrapColumns(n) {
	return "col-xs-" + n + " col-sm-" + n + " col-md-" + n + " col-lg-" + n + ""
}

function createOverlay() {
	var i, t, n, r, u;
	jQuery(".load-overlay").length > 0 && (i = jQuery("body"), t = jQuery("<div />"), t.addClass("modal"), t.attr("id", "modalloading"), n = jQuery("<div />"), n.addClass("loading loadingGif"), n.attr("align", "center"), i.append(n), i.append(t), n = jQuery(".loading"), r = Math.max(jQuery(window).height() / 2 - n.height() / 2, 0), u = Math.max(jQuery(window).width() / 2 - n.width() / 2, 0), n.css({
		top: r,
		left: u
	}), jQuery(document).resize(function () {
		hasResized = !0
	}), console.log("Loading Overlay Enabled On This Page"))
}

function getStackTrace() {
	var n;
	try {
		throw new Error("");
	} catch (t) {
		n = t.stack || ""
	}
	return n = n.split("\n").map(function (n) {
		return n.trim()
	}), n.splice(n[0] == "Error" ? 2 : 1)
}

function TimeoutElapsed() {
	closeOverlay()
}

function showOverlay() {
	var n = jQuery(".loading"),
		t, i;
	jQuery("#modalloading").show();
	t = Math.max(jQuery(window).height() / 2 - n.height() / 2, 0);
	i = Math.max(jQuery(window).width() / 2 - n.width() / 2, 0);
	n.css({
		top: t,
		left: i
	});
	jQuery("#modalloading").show();
	n.show();
	window.setTimeout(TimeoutElapsed, 15e3)
}

function closeOverlay() {
	jQuery(".loading").hide();
	jQuery("#modalloading").hide()
}

function changeItemPlaceHolder(n, t, i) {
	jQuery(n).val() == "South African ID" ? (jQuery(t).attr("placeholder", "ID Number"), i == "True" && jQuery(t).attr({
		type: "number",
		inputmode: "numeric",
		pattern: "[0-9]*"
	})) : (jQuery(t).attr("placeholder", "Passport Number"), jQuery(t).attr({
		type: "text"
	}))
}

function onAccountRedirectOptionClick(n, t) {
	document.forms.namedItem(t).querySelectorAll("[name=SelectedPage]")[0].value = n;
	document.forms.namedItem(t).submit()
}

function onLoginClick() {
	showOverlay();
	data = $("#modal-container-mobile-login").is(":visible") ? {
		mobileNumber: $("#modal-container-mobile-login").find("#MobileNumber").val(),
		password: $("#modal-container-mobile-login").find("#Password").val(),
		dialingCode: $("#modal-container-mobile-login").find("#DialingCode").val()
	} : {
		mobileNumber: $("#MobileNumber").val(),
		password: $("#Password").val(),
		dialingCode: $("#DialingCode").val()
	};
	pat.post("/Account/Login", data).done(function (n) {
		n.Error == !1 ? ($("#modal-container-mobile-login").html(""), $("#inline-login-placeholder").html(""), location.reload()) : ($("#modal-container-mobile-login").html(n), $("#inline-login-placeholder").html(n));
		closeOverlay()
	})
}

function LoginModalFormDisplay() {
	pat.post("/Account/ViewModalLogin", null, {
		dataType: "html"
	}).done(function (n) {
		$("#modal-container-mobile-login").html(n);
		$("#modal-container-mobile-login").modal()
	})
}

function GetJackpot(n, t) {
	showOverlay();
	var i = "/Home/GetJackpot?couponType=" + n + "&couponName=" + t;
	window.location.href = i
}

function RefreshCashBalance() {
	pat.get("/Account/_GetCashBalanceOnly").done(function (n) {
		$("#cashAmount").is(":visible") ? $("#cashAmount").html(n) : $(".balance-label").length && $(".balance-label-amount").html(n)
	})
}

function LoadSubMenuBar(n) {
	$("#subMenuDiv").hide();
	n.indexOf("#") > -1 ? ($(".triangle-down").removeClass("triangle-down"), $("#triangle_" + n.substr(1).toLowerCase()).addClass("triangle-down"), $(".triangle-down").length == 0 && $("#triangle_matchbetting").addClass("triangle-down"), $(".nav-middle-tab").hide(), n == "#topgames" ? $("#topGamesPlaceholder").show() : ($("#topGamesPlaceholder").hide(), $(n).show()), n == "#inplay" ? inplayMiddleNav(!0) : inplayMiddleNav(!1), TabClick(n.substr(1).toLowerCase())) : window.location = n;
	anchorToTop()
}

function ColourChange(n, t) {
	t == "#" && ($(".colour").hide(), ApplyColour())
}

function inplayMiddleNav(n) {
	n == !0 ? ($(".mobileMiddleNav").css("background-color", "#acc540"), $(".mobileMiddleNavItem").css("color", "#262626"), $(".mobileMiddleNavItem a").css("color", "#262626")) : ($(".mobileMiddleNav").css("background-color", "#439539"), $(".mobileMiddleNavItem").css("color", "white"), $(".mobileMiddleNavItem a").css("color", "white"))
}

function Highlight(n, t, i) {
	if (i = i.split(" ").join(""), console.log("hexToRGB", hexToRGB("#333333", .6)), $("#right").is(":visible") ? $("#headerColour").css({
			color: "white"
		}) : $("#headerColour").css({
			color: "#262626"
		}), n == "over" && $(".nav-link-item-" + i).hasClass("active") !== !0) typeof color !== undefined && t !== null && t !== "" ? ($(".topSlit-" + i).css("background-color", t + " !important"), $(".nav-link-item-" + i).css("background-color", hexToRGB(t, .5) + " !important")) : $(".topSlit-" + i).css("background-color", "#439539 !important");
	else if (n == "out" && $(".nav-link-item-" + i).hasClass("active") !== !0) $(".topSlit-" + i).css("background-color", "#333333 !important"), $(".nav-link-item-" + i).css("background-color", "#333333 !important");
	else if (n == "clicked")
		if (location.hash.indexOf("#") > -1) {
			var r = getServerColour(location.hash);
			$(".nav-link-item").removeClass("active");
			$(".topSlit").css("background-color", "#333333 !important");
			$(".nav-link-item").css("background-color", "#333333 !important");
			$(".nav-link-item-" + i).addClass("active");
			typeof r !== undefined && r !== null && r !== "" ? ($(".topSlit-" + i).css("background-color", r + " !important"), $(".nav-link-item-" + i).css("background-color", hexToRGB(r, .4) + " !important")) : $(".topSlit-" + i).css("background-color", "#439539 !important");
			ApplyServerColour(r);
			changeTabColours(i, r);
			i == "sports" || i == "matchbetting" || i == "inplay" || i == "outrights" || i == "short_term_outrights" || i == "topgames" ? (i == "inplay" || i == "livein-play" ? $("#headerColour").css({
				color: "#262626"
			}) : i != "inplay" && i != "outrights" ? (i = "prematchtab", $(".mobileSearch ").fadeIn(), $(".btnTextColour").css({
				color: "white"
			})) : ($(".mobileSearch ").fadeOut(), $(".btnTextColour").css({
				color: "white"
			})), $("#mSportDiv").fadeIn(), $(".mobileEvents").fadeIn(), i == "outrights" ? toggleShow(null, null, !0) : toggleShow(null, "link-" + i, !1)) : ($("#mSportDiv").fadeOut(), $(".mobileEvents").fadeOut(), $(".btnTextColour").css({
				color: "white"
			}))
		} else $(".nav-link-item").removeClass("active"), $(".topSlit").css("background-color", "#333333 !important"), $(".nav-link-item").css("background-color", "#333333 !important"), $(".nav-link-item-" + i).addClass("active"), typeof color !== undefined && t !== null && t !== "" ? ($(".topSlit-" + i).css("background-color", t + " !important"), $(".nav-link-item-" + i).css("background-color", hexToRGB(t, .4) + " !important")) : ($(".nav-link-item-" + i).css("background-color", "#333333 !important"), $(".topSlit-" + i).css("background-color", "#439539 !important"))
}

function ApplyServerColour(n) {
	if (location.hash.indexOf("#") > -1 || n == "undefined" || n == null) {
		var t = getServerColour(location.hash);
		$(".colour").css({
			"background-color": t + " !important",
			"border-bottom-color": t + " !important"
		});
		$(".textColour").css({
			color: t + " !important"
		})
	} else location.pathname.toLowerCase().indexOf("inplay") > -1 || location.pathname.toLowerCase().indexOf("loyalty") > -1 ? $(".btnTextColour").css({
		color: "#262626"
	}) : $(".btnTextColour").css({
		color: "#ffffff"
	}), $(".colour").css({
		"background-color": n + " !important",
		"border-bottom-color": n + " !important"
	}), $(".textColour").css({
		color: n + " !important"
	});
	screen.width <= 768 ? $("#Login").hide() : $("#LoginModalPopUp").hide()
}

function HoverColour(n, t) {
	if (!$("#" + n).hasClass("active")) {
		var i = getServerColour(location.pathname);
		t == "over" ? ($("#" + n).removeClass("mSportColour"), $("#" + n).css({
			"background-color": i
		})) : t == "off" && $("#" + n).addClass("mSportColour")
	}
}

function TabClick(n) {
	var t = n.charAt(0).toUpperCase() + n.slice(1);
	document.getElementById(t) !== null && typeof document.getElementById(t) != "undefined" && (console.log("clicking on 'tab-'" + t), document.getElementById("tab-" + t).click(event))
}

function SwitchToggleLinks(n) {
	n == "hide" ? $(".toggleLink").hide() : n == "show" && TabClick("#prematchtab")
}

function searchToggle(n) {
	n == "" && (n = $("#webTabs").find(".active").data("markettypecategory"));
	ShiftFilterToActive(n);
	screen.width <= 768 && $("#mobileFilter").hide()
}

function ShiftFilterToActive(n) {
	var t;
	$("#mobileFilter").children('[data-markettypecategory="' + n + '"]').length == 0 ? ($("#mobileFilter").children("#filters").length > 0 && (t = $("#mobileFilter").children("#filters").data("markettypecategory"), $("#mobileFilter").children("#filters").hide(), $("#mobileFilter").children("#filters2").hide(), $("#mobileFilter").children("#filters").attr("id", "filters_" + t), $("#mobileFilter").children("#filters2").attr("id", "filters2_" + t)), $("#mobileFilter").append($("#filters")), $("#mobileFilter").append($("#filters2"))) : (t = $("#mobileFilter").children("#filters").data("markettypecategory"), $("#mobileFilter").children("#filters").hide(), $("#mobileFilter").children("#filters2").hide(), $("#mobileFilter").children("#filters").attr("id", "filters_" + t), $("#mobileFilter").children("#filters2").attr("id", "filters2_" + t), $("#mobileFilter").children("#filters_" + n).attr("id", "filters"), $("#mobileFilter").children("#filters2_" + n).attr("id", "filters2"), $("#mobileFilter").children("#filters").show(), $("#mobileFilter").children("#filters2").show());
	n == "00000000-0000-0000-da7a-000000580003" ? ($(".mobileSearch").fadeOut(), $("#mobileFilter").fadeIn()) : n == "00000000-0000-0000-da7a-000000580005" || n == "00000000-0000-0000-da7a-000000580006" ? ($("#mobileFilter").fadeOut(), $(".mobileSearch").fadeOut(), $(".btn-countriesAndMarkets").fadeOut()) : ($(".mobileSearch").fadeIn(), $("#mobileFilter").fadeIn(), $(".btn-countriesAndMarkets").fadeIn());
	$("#filtersDiv").remove()
}

function changeTabColours(n, t) {
	var r, i;
	if (document.getElementById("webTabs") !== null && typeof document.getElementById("webTabs") != "undefined")
		for (r = document.getElementById("webTabs").childNodes, i = 0; i < r.length; i++) r[i].nodeName.toLowerCase() == "li" && (r[i].style.backgroundColor = "#515151");
	$("#" + n.charAt(0).toUpperCase() + n.slice(1)).css("background-color", t + "!important")
}

function anchorToTop() {
	$("body:first").scrollTop(0);
	$("html, body").animate({
		scrollTop: 0
	}, "slow")
}

function anchorToId(n) {
	var t = $(n);
	$("body:first").scrollTop(t.prop("scrollHeight") + 65);
	$("html, body").animate({
		scrollTop: t.prop("scrollHeight") + 65
	}, "fast")
}

function FicaUploadFormDisplay() {
	pat.post("/Account/SubmitFICADetails", null, {
		dataType: "html"
	}).done(function (n) {
		$("#modal-container-ficastatus-upload").html(n);
		$("#modal-container-ficastatus-upload").modal()
	})
}

function DelayFicaNotification() {
	pat.post("/Account/DelayFICANotification", null, {
		dataType: "html"
	}).done(function () {
		promptFICANotification = !1
	})
}

function showFICAStatusConfirmation() {
	promptFICANotification && (showOverlay(), $("#modal-container-ficastatus-confirmation").modal(), $("#modal-container-ficastatus-confirmation").show())
}

function patExample() {
	pat.get("/Account/_SmsMessages").done(function (n) {
		console.log("data", n)
	})
}

function hexToRGB(n, t) {
	var i = parseInt(n.slice(1, 3), 16),
		r = parseInt(n.slice(3, 5), 16),
		u = parseInt(n.slice(5, 7), 16);
	return t ? "rgba(" + i + ", " + r + ", " + u + ", " + t + ")" : "rgb(" + i + ", " + r + ", " + u + ")"
}

function LoadAjaxContent(n, t) {
	var r = document.getElementById(n.attributes["data-subsection"].nodeValue),
		i;
	r != null && (i = "#" + n.attributes["data-subsection"].nodeValue, $(i).load(t, function () {
		searchToggle("");
		var subSectionInitScript = $(i + "-loaded-script");
		subSectionInitScript.length > 0 && eval(subSectionInitScript.text())
	}), $("#" + n.id).unbind("click.ajaxcontent"))
}

function toggleFICAUploadActive() {
	var n = !1,
		t = document.getElementById("proofIdFile").innerHTML,
		i = document.getElementById("proofResidenceFile").innerHTML,
		r = document.getElementById("proofIdFileMobile").innerHTML,
		u = document.getElementById("proofResidenceFileMobile").innerHTML;
	(t !== "" && t !== noFileSelectedText || i !== "" && i !== noFileSelectedText) && (n = !0);
	(r !== "" && r !== noFileSelectedText || u !== "" && u !== noFileSelectedText) && (n = !0);
	n && proofIdMobileSize && proofResidenceMobileSize ? (document.getElementById("fica-submission-button-mobile").disabled = !1, document.getElementById("fileuploads").className = "fica-subheading") : (document.getElementById("fica-submission-button-mobile").disabled = !0, document.getElementById("fileuploads").className = "fica-subheading-disabled");
	n && proofIdSize && proofResidenceSize ? (document.getElementById("fica-submission-button").disabled = !1, document.getElementById("fileuploads").className = "fica-subheading") : (document.getElementById("fica-submission-button").disabled = !0, document.getElementById("fileuploads").className = "fica-subheading-disabled")
}

function setDisplay(n, t) {
	if (t.length === 0) document.getElementById(n).innerHTML = noFileSelectedText;
	else {
		var i = t.split("\\");
		i.length > 0 && i.constructor === Array && (t = i[i.length - 1], document.getElementById(n).innerHTML = t)
	}
	toggleFICAUploadActive()
}

function showFICAPopup() {
	BindFileUploads();
	$("#fica-popup-modal").modal({
		backdrop: "static",
		keyboard: !1
	})
}

function submitFicaDetailsAsync(n) {
	var r, i, t;
	event.preventDefault();
	i = "";
	t = "";
	t = n == "true" ? $("#ficaProofMobile") : $("#ficaProof");
	i = t.attr("action");
	showOverlay();
	t.attr("enctype") == "multipart/form-data" && (r = new FormData(t.get(0)), contentType = !1, processData = !1);
	$.ajax({
		type: "POST",
		url: i,
		data: r,
		dataType: "html",
		contentType: contentType,
		processData: processData,
		success: function () {
			$(".modal-backdrop.fade.in").remove();
			$("#modal-container-ficauploadresult").modal();
			$("#modal-container-ficauploadresult").show();
			$("#modal-container-ficastatus-upload").hide();
			closeOverlay()
		},
		error: function (n, t, i) {
			$("subsection").innerHTML = i;
			$("#subsection").show();
			closeOverlay()
		}
	})
}

function submitFicaDetailsAsyncMobile() {
	var n, t, i;
	event.preventDefault();
	t = $("#ficaProofMobile").attr("action");
	showOverlay();
	$("#ficaProofMobile").attr("enctype") == "multipart/form-data" && (i = new FormData($("#ficaProofMobile")), n = new FormData($("#ficaProofMobile").get(0)), contentType = !1, processData = !1);
	$.ajax({
		type: "POST",
		url: t,
		data: n,
		dataType: "html",
		contentType: contentType,
		processData: processData,
		success: function () {
			$(".modal-backdrop.fade.in").remove();
			$("#modal-container-ficauploadresult").modal();
			$("#modal-container-ficauploadresult").show();
			$("#modal-container-ficastatus-upload").hide();
			closeOverlay()
		},
		error: function (n, t, i) {
			$("subsection").innerHTML = i;
			$("#subsection").show();
			closeOverlay()
		}
	})
}

function clearFICAValidationError(n) {
	if (n !== null) {
		$("#" + n).remove();
		var t = $("#fica-errors ul li").length;
		t === 0 && ($("#fica-errors div").removeClass("validation-summary-errors"), $("#fica-errors div").addClass("validation-summary-valid"))
	} else $("#fica-errors").find("ul").find("li").remove(), $("#fica-errors div").removeClass("validation-summary-errors"), $("#fica-errors div").addClass("validation-summary-valid")
}

function setFICAValidationError(n, t) {
	$("#fica-errors div").removeClass("validation-summary-valid");
	$("#fica-errors div").addClass("validation-summary-errors");
	$("#fica-errors").find("ul").append("<li id='" + t + "'>" + n + "<\/li>")
}

function BindFileUploads() {
	$("#proofId").bind("change", function () {
		if (proofIdSize = !0, clearFICAValidationError("proof-of-id-error"), this.files !== null && this.files.length > 0) {
			var n = this.files[0].size / 1024;
			n > 4096 && (setFICAValidationError("The ID proof document is too large.", "proof-of-id-error"), proofIdSize = !1)
		}
		toggleFICAUploadActive()
	});
	$("#proofResidence").bind("change", function () {
		if (proofResidenceSize = !0, clearFICAValidationError("proof-of-residence-error"), this.files !== null && this.files.length > 0) {
			var n = this.files[0].size / 1024;
			n > 4096 && (setFICAValidationError("The residence proof document is too large.", "proof-of-residence-error"), proofResidenceSize = !1)
		}
		toggleFICAUploadActive()
	})
}

function onLiveChatButtonClick(n, t) {
	var i, r, u;
	switch (t) {
		case "KE":
			i = "kenya";
			break;
		case "UG":
			i = "uganda";
			break;
		case "GH":
			i = "ghana";
			break;
		default:
			i = "kenya"
	}
	var e = screen.width,
		f = screen.height,
		o = e <= 425;
	n ? (r = "https://chatv1.chatonline.io/chatclient/1/?skill=betway" + i + "&casinoid=0&referringurl=&brandcode=BW" + i[0] + "&accountreference=UNKNOWN&ismobile=true&languagecode=EN&isvip=false&email=&identifier=", u = window.open(r, "_blank"), u.focus()) : o ? (r = "https://chatv1.chatonline.io/chatclient/1/?skill=betway" + i + "&casinoid=0&referringurl=&brandcode=BW" + i[0] + "&accountreference=UNKNOWN&ismobile=true&languagecode=EN&isvip=false&email=&identifier=", u = window.open(r, "_blank"), u.focus()) : (f = "400px", r = "https://chatv1.chatonline.io/chatclient/1/?skill=betway" + i + "&casinoid=0&referringurl=&brandcode=BW" + i[0] + "&accountreference=UNKNOWN&ismobile=false&languagecode=EN&isvip=false&email=&identifier=", $("#chatFrame").css({
		height: f,
		width: "100%"
	}), $("#chatFrame").attr("src", r), maximiseChat(f))
}

function maximiseChat(n) {
	$("#liveChatModal").show().animate({
		height: n
	}, "slow")
}

function closeChat() {
	$("#liveChatModal").animate({
		height: 0
	}, "slow", function () {
		$("#liveChatModal").hide()
	})
}

function minimiseChat() {
	$("#liveChatModal").animate({
		height: 65
	}, "slow")
}

function performAction() {
	$("#liveChatModal").height() < 75 ? screen.width <= 425 ? maximiseChat("99%") : maximiseChat("400px") : minimiseChat()
}

function browserStorage(n) {
	var u = "LDS",
		t = function (n) {
			try {
				var i = window[n],
					t = "__storage_test__";
				return i.setItem(t, t), i.removeItem(t), !0
			} catch (r) {
				return !1
			}
		},
		i = {
			storeItem: function (n, t) {
				localStorage.setItem(n, t)
			},
			getItem: function (n) {
				return localStorage.getItem(n)
			},
			removeItem: function (n) {
				localStorage.removeItem(n)
			},
			removeAllItems: function () {
				for (var n = 0; n < localStorage.length; n++) localStorage.removeItem(localStorage.key(n))
			}
		},
		f = function (n, t) {
			var i = {},
				r = ReadCookie(n);
			return r ? r[n] = t : i[n] = t, JSON.stringify(i)
		},
		r = {
			storeItem: function (n, t) {
				try {
					CreateCookie(u, f(n, t), 365)
				} catch (i) {
					console.log(i)
				}
			},
			getItem: function (n) {
				var t = "",
					i, r;
				try {
					i = ReadCookie(n);
					i && (r = JSON.parse(i), r.hasOwnProperty(n) && (t = r[n], t || (t = "")))
				} catch (u) {
					console.log(u)
				}
				return t
			},
			removeItem: function (n) {
				var t, i, r;
				try {
					t = ReadCookie(n);
					t && (i = JSON.parse(t), i.hasOwnProperty(n) && (r = i[n], r && (i[n] = "")));
					CreateCookie(u, JSON.stringify(t), 365)
				} catch (f) {
					console.log(f)
				}
			},
			removeAllItems: function () {
				EraseCookie(u)
			}
		};
	return {
		storeItem: function (u, f) {
			t("localStorage") ? i.storeItem(u, f) : n || r.storeItem(u, f)
		},
		getItem: function (u) {
			return t("localStorage") ? i.getItem(u) : n ? void 0 : r.getItem(u)
		},
		removeItem: function (u) {
			t("localStorage") ? i.removeItem(u) : n || r.removeItem(u)
		},
		removeAllItems: function () {
			t("localStorage") ? i.removeAllItems() : n || r.removeAllItems()
		}
	}
}

function ElizaBot(n) {
	function c() {
		var n, u, r;
		for (t.quit = !1, t.mem = [], t.lastchoice = [], n = 0; n < i.length; n++)
			for (t.lastchoice[n] = [], u = i[n][2], r = 0; r < u.length; r++) t.lastchoice[n][r] = -1
	}

	function l() {
		var y = {},
			p, f, v, n, d, c, s, l, o;
		if ("object" == typeof h)
			for (o in h) y[o] = "(" + o + "|" + h[o].join("|") + ")";
		"undefined" == typeof i.length && (i = [
			["###", 0, [
				["###", []]
			]]
		]);
		for (var w = /@(\S+)/, b = /(\S)\s*\*\s*(\S)/, k = /\s+/g, a = 0; a < i.length; a++)
			for (p = i[a][2], i[a][3] = a, o = 0; o < p.length; o++) {
				if (f = p[o], "$" == f[0].charAt(0)) {
					for (v = 1;
						" " == f[0].charAt[v];) v++;
					f[0] = f[0].substring(v);
					f[2] = !0
				} else f[2] = !1;
				for (n = w.exec(f[0]); n;) d = y[n[1]] ? y[n[1]] : n[1], f[0] = f[0].substring(0, n.index) + d + f[0].substring(n.index + n[0].length), n = w.exec(f[0]);
				if (/^\s*\*\s*$/.test(f[0])) f[0] = "\\s*(.*)\\s*";
				else {
					if (n = b.exec(f[0])) {
						for (s = "", c = f[0]; n;) s += c.substring(0, n.index + 1), ")" != n[1] && (s += "\\b"), s += "\\s*(.*)\\s*", "(" != n[2] && "\\" != n[2] && (s += "\\b"), s += n[2], c = c.substring(n.index + n[0].length), n = b.exec(c);
						f[0] = s + c
					}(n = /^\s*\*\s*(\S)/.exec(f[0])) && (s = "\\s*(.*)\\s*", ")" != n[1] && "\\" != n[1] && (s += "\\b"), f[0] = s + f[0].substring(n.index - 1 + n[0].length));
					(n = /(\S)\s*\*\s*$/.exec(f[0])) && (s = f[0].substring(0, n.index + 1), "(" != n[1] && (s += "\\b"), f[0] = s + "\\s*(.*)\\s*")
				}
				f[0] = f[0].replace(k, "\\s+");
				k.lastIndex = 0
			}
		if (i.sort(t._sortKeywords), t.pres = {}, t.posts = {}, r.length) {
			for (l = [], o = 0; o < r.length; o += 2) l.push(r[o]), t.pres[r[o]] = r[o + 1];
			t.preExp = new RegExp("\\b(" + l.join("|") + ")\\b")
		} else t.preExp = /####/, t.pres["####"] = "####";
		if (u.length) {
			for (l = [], o = 0; o < u.length; o += 2) l.push(u[o]), t.posts[u[o]] = u[o + 1];
			t.postExp = new RegExp("\\b(" + l.join("|") + ")\\b")
		} else t.postExp = /####/, t.posts["####"] = "####";
		"undefined" == typeof e.length && (e = []);
		t._dataParsed = !0
	}
	var t = this,
		o = ["How do you do.  Please tell me your problem.", "Please tell me what's been bothering you.", "Is something troubling you ?"],
		s = ["Goodbye.  It was nice talking to you.", "Goodbye.  This was really a nice talk.", "Goodbye.  I'm looking forward to our next session.", "This was a good session, wasn't it -- but time is over now.   Goodbye.", "Maybe we could discuss this moreover in our next session ?   Goodbye."],
		e = ["bye", "goodbye", "done", "exit", "quit"],
		r = ["dont", "don't", "cant", "can't", "wont", "won't", "recollect", "remember", "recall", "remember", "dreamt", "dreamed", "dreams", "dream", "maybe", "perhaps", "certainly", "yes", "machine", "computer", "machines", "computer", "computers", "computer", "were", "was", "you're", "you are", "i'm", "i am", "same", "alike", "identical", "alike", "equivalent", "alike"],
		u = ["am", "are", "your", "my", "me", "you", "myself", "yourself", "yourself", "myself", "i", "you", "you", "I", "my", "your", "i'm", "you are"],
		h = {
			be: ["am", "is", "are", "was"],
			belief: ["feel", "think", "believe", "wish"],
			cannot: ["can't"],
			desire: ["want", "need"],
			everyone: ["everybody", "nobody", "noone"],
			family: ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child"],
			happy: ["elated", "glad", "better"],
			sad: ["unhappy", "depressed", "sick"]
		},
		i = [
			["xnone", 0, [
				["*", ["I'm not sure I understand you fully.", "Please go on.", "What does that suggest to you ?", "Do you feel strongly about discussing such things ?", "That is interesting.  Please continue.", "Tell me more about that.", "Does talking about this bother you ?"]]
			]],
			["sorry", 0, [
				["*", ["Please don't apologise.", "Apologies are not necessary.", "I've told you that apologies are not required.", "It did not bother me.  Please continue."]]
			]],
			["apologise", 0, [
				["*", ["goto sorry"]]
			]],
			["remember", 5, [
				["* i remember *", ["Do you often think of (2) ?", "Does thinking of (2) bring anything else to mind ?", "What else do you recollect ?", "Why do you remember (2) just now ?", "What in the present situation reminds you of (2) ?", "What is the connection between me and (2) ?", "What else does (2) remind you of ?"]],
				["* do you remember *", ["Did you think I would forget (2) ?", "Why do you think I should recall (2) now ?", "What about (2) ?", "goto what", "You mentioned (2) ?"]],
				["* you remember *", ["How could I forget (2) ?", "What about (2) should I remember ?", "goto you"]]
			]],
			["forget", 5, [
				["* i forget *", ["Can you think of why you might forget (2) ?", "Why can't you remember (2) ?", "How often do you think of (2) ?", "Does it bother you to forget that ?", "Could it be a mental block ?", "Are you generally forgetful ?", "Do you think you are suppressing (2) ?"]],
				["* did you forget *", ["Why do you ask ?", "Are you sure you told me ?", "Would it bother you if I forgot (2) ?", "Why should I recall (2) just now ?", "goto what", "Tell me more about (2)."]]
			]],
			["if", 3, [
				["* if *", ["Do you think it's likely that (2) ?", "Do you wish that (2) ?", "What do you know about (2) ?", "Really, if (2) ?", "What would you do if (2) ?", "But what are the chances that (2) ?", "What does this speculation lead to ?"]]
			]],
			["dreamed", 4, [
				["* i dreamed *", ["Really, (2) ?", "Have you ever fantasized (2) while you were awake ?", "Have you ever dreamed (2) before ?", "goto dream"]]
			]],
			["dream", 3, [
				["*", ["What does that dream suggest to you ?", "Do you dream often ?", "What persons appear in your dreams ?", "Do you believe that dreams have something to do with your problem ?"]]
			]],
			["perhaps", 0, [
				["*", ["You don't seem quite certain.", "Why the uncertain tone ?", "Can't you be more positive ?", "You aren't sure ?", "Don't you know ?", "How likely, would you estimate ?"]]
			]],
			["name", 15, [
				["*", ["I am not interested in names.", "I've told you before, I don't care about names -- please continue."]]
			]],
			["deutsch", 0, [
				["*", ["goto xforeign", "I told you before, I don't understand German."]]
			]],
			["francais", 0, [
				["*", ["goto xforeign", "I told you before, I don't understand French."]]
			]],
			["italiano", 0, [
				["*", ["goto xforeign", "I told you before, I don't understand Italian."]]
			]],
			["espanol", 0, [
				["*", ["goto xforeign", "I told you before, I don't understand Spanish."]]
			]],
			["xforeign", 0, [
				["*", ["I speak only English."]]
			]],
			["hello", 0, [
				["*", ["How do you do.  Please state your problem.", "Hi.  What seems to be your problem ?"]]
			]],
			["computer", 50, [
				["*", ["Do computers worry you ?", "Why do you mention computers ?", "What do you think machines have to do with your problem ?", "Don't you think computers can help people ?", "What about machines worries you ?", "What do you think about machines ?", "You don't think I am a computer program, do you ?"]]
			]],
			["am", 0, [
				["* am i *", ["Do you believe you are (2) ?", "Would you want to be (2) ?", "Do you wish I would tell you you are (2) ?", "What would it mean if you were (2) ?", "goto what"]],
				["* i am *", ["goto i"]],
				["*", ["Why do you say 'am' ?", "I don't understand that."]]
			]],
			["are", 0, [
				["* are you *", ["Why are you interested in whether I am (2) or not ?", "Would you prefer if I weren't (2) ?", "Perhaps I am (2) in your fantasies.", "Do you sometimes think I am (2) ?", "goto what", "Would it matter to you ?", "What if I were (2) ?"]],
				["* you are *", ["goto you"]],
				["* are *", ["Did you think they might not be (2) ?", "Would you like it if they were not (2) ?", "What if they were not (2) ?", "Are they always (2) ?", "Possibly they are (2).", "Are you positive they are (2) ?"]]
			]],
			["your", 0, [
				["* your *", ["Why are you concerned over my (2) ?", "What about your own (2) ?", "Are you worried about someone else's (2) ?", "Really, my (2) ?", "What makes you think of my (2) ?", "Do you want my (2) ?"]]
			]],
			["was", 2, [
				["* was i *", ["What if you were (2) ?", "Do you think you were (2) ?", "Were you (2) ?", "What would it mean if you were (2) ?", "What does ' (2) ' suggest to you ?", "goto what"]],
				["* i was *", ["Were you really ?", "Why do you tell me you were (2) now ?", "Perhaps I already know you were (2)."]],
				["* was you *", ["Would you like to believe I was (2) ?", "What suggests that I was (2) ?", "What do you think ?", "Perhaps I was (2).", "What if I had been (2) ?"]]
			]],
			["i", 0, [
				["* i @desire *", ["What would it mean to you if you got (3) ?", "Why do you want (3) ?", "Suppose you got (3) soon.", "What if you never got (3) ?", "What would getting (3) mean to you ?", "What does wanting (3) have to do with this discussion ?"]],
				["* i am* @sad *", ["I am sorry to hear that you are (3).", "Do you think coming here will help you not to be (3) ?", "I'm sure it's not pleasant to be (3).", "Can you explain what made you (3) ?"]],
				["* i am* @happy *", ["How have I helped you to be (3) ?", "Has your treatment made you (3) ?", "What makes you (3) just now ?", "Can you explain why you are suddenly (3) ?"]],
				["* i was *", ["goto was"]],
				["* i @belief i *", ["Do you really think so ?", "But you are not sure you (3).", "Do you really doubt you (3) ?"]],
				["* i* @belief *you *", ["goto you"]],
				["* i am *", ["Is it because you are (2) that you came to me ?", "How long have you been (2) ?", "Do you believe it is normal to be (2) ?", "Do you enjoy being (2) ?", "Do you know anyone else who is (2) ?"]],
				["* i @cannot *", ["How do you know that you can't (3) ?", "Have you tried ?", "Perhaps you could (3) now.", "Do you really want to be able to (3) ?", "What if you could (3) ?"]],
				["* i don't *", ["Don't you really (2) ?", "Why don't you (2) ?", "Do you wish to be able to (2) ?", "Does that trouble you ?"]],
				["* i feel *", ["Tell me more about such feelings.", "Do you often feel (2) ?", "Do you enjoy feeling (2) ?", "Of what does feeling (2) remind you ?"]],
				["* i * you *", ["Perhaps in your fantasies we (2) each other.", "Do you wish to (2) me ?", "You seem to need to (2) me.", "Do you (2) anyone else ?"]],
				["*", ["You say (1) ?", "Can you elaborate on that ?", "Do you say (1) for some special reason ?", "That's quite interesting."]]
			]],
			["you", 0, [
				["* you remind me of *", ["goto alike"]],
				["* you are *", ["What makes you think I am (2) ?", "Does it please you to believe I am (2) ?", "Do you sometimes wish you were (2) ?", "Perhaps you would like to be (2)."]],
				["* you* me *", ["Why do you think I (2) you ?", "You like to think I (2) you -- don't you ?", "What makes you think I (2) you ?", "Really, I (2) you ?", "Do you wish to believe I (2) you ?", "Suppose I did (2) you -- what would that mean ?", "Does someone else believe I (2) you ?"]],
				["* you *", ["We were discussing you -- not me.", "Oh, I (2) ?", "You're not really talking about me -- are you ?", "What are your feelings now ?"]]
			]],
			["yes", 0, [
				["*", ["You seem to be quite positive.", "You are sure.", "I see.", "I understand."]]
			]],
			["no", 0, [
				["* no one *", ["Are you sure, no one (2) ?", "Surely someone (2) .", "Can you think of anyone at all ?", "Are you thinking of a very special person ?", "Who, may I ask ?", "You have a particular person in mind, don't you ?", "Who do you think you are talking about ?"]],
				["*", ["Are you saying no just to be negative?", "You are being a bit negative.", "Why not ?", "Why 'no' ?"]]
			]],
			["my", 2, [
				["$ * my *", ["Does that have anything to do with the fact that your (2) ?", "Lets discuss further why your (2).", "Earlier you said your (2).", "But your (2)."]],
				["* my* @family *", ["Tell me more about your family.", "Who else in your family (4) ?", "Your (3) ?", "What else comes to your mind when you think of your (3) ?"]],
				["* my *", ["Your (2) ?", "Why do you say your (2) ?", "Does that suggest anything else which belongs to you ?", "Is it important to you that your (2) ?"]]
			]],
			["can", 0, [
				["* can you *", ["You believe I can (2) don't you ?", "goto what", "You want me to be able to (2).", "Perhaps you would like to be able to (2) yourself."]],
				["* can i *", ["Whether or not you can (2) depends on you more than on me.", "Do you want to be able to (2) ?", "Perhaps you don't want to (2).", "goto what"]]
			]],
			["what", 0, [
				["*", ["Why do you ask ?", "Does that question interest you ?", "What is it you really want to know ?", "Are such questions much on your mind ?", "What answer would please you most ?", "What do you think ?", "What comes to mind when you ask that ?", "Have you asked such questions before ?", "Have you asked anyone else ?"]]
			]],
			["who", 0, [
				["who *", ["goto what"]]
			]],
			["when", 0, [
				["when *", ["goto what"]]
			]],
			["where", 0, [
				["where *", ["goto what"]]
			]],
			["how", 0, [
				["how *", ["goto what"]]
			]],
			["because", 0, [
				["*", ["Is that the real reason ?", "Don't any other reasons come to mind ?", "Does that reason seem to explain anything else ?", "What other reasons might there be ?"]]
			]],
			["why", 0, [
				["* why don't you *", ["Do you believe I don't (2) ?", "Perhaps I will (2) in good time.", "Should you (2) yourself ?", "You want me to (2) ?", "goto what"]],
				["* why can't i *", ["Do you think you should be able to (2) ?", "Do you want to be able to (2) ?", "Do you believe this will help you to (2) ?", "Have you any idea why you can't (2) ?", "goto what"]],
				["*", ["goto what"]]
			]],
			["everyone", 2, [
				["* @everyone *", ["Really, (2) ?", "Surely not (2).", "Can you think of anyone in particular ?", "Who, for example?", "Are you thinking of a very special person ?", "Who, may I ask ?", "Someone special perhaps ?", "You have a particular person in mind, don't you ?", "Who do you think you're talking about ?"]]
			]],
			["everybody", 2, [
				["*", ["goto everyone"]]
			]],
			["nobody", 2, [
				["*", ["goto everyone"]]
			]],
			["noone", 2, [
				["*", ["goto everyone"]]
			]],
			["always", 1, [
				["*", ["Can you think of a specific example ?", "When ?", "What incident are you thinking of ?", "Really, always ?"]]
			]],
			["alike", 10, [
				["*", ["In what way ?", "What resemblence do you see ?", "What does that similarity suggest to you ?", "What other connections do you see ?", "What do you suppose that resemblence means ?", "What is the connection, do you suppose ?", "Could there really be some connection ?", "How ?"]]
			]],
			["like", 10, [
				["* @be *like *", ["goto alike"]]
			]],
			["different", 0, [
				["*", ["How is it different ?", "What differences do you see ?", "What does that difference suggest to you ?", "What other distinctions do you see ?", "What do you suppose that disparity means ?", "Could there be some connection, do you suppose ?", "How ?"]]
			]]
		],
		f = [/ old old/g, " old", /\bthey were( not)? me\b/g, "it was$1 me", /\bthey are( not)? me\b/g, "it is$1 me", /Are they( always)? me\b/, "it is$1 me", /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?", /\bI to have (\w+)/, "I have $1", /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."];
	t.noRandom = n ? !0 : !1;
	t.capitalizeFirstLetter = !0;
	t.debug = !1;
	t.memSize = 20;
	t.version = "1.1 (original)";
	t._dataParsed || l();
	c();
	t._dataParsed = !1;
	t._sortKeywords = function (n, t) {
		return n[1] > t[1] ? -1 : n[1] < t[1] ? 1 : n[3] > t[3] ? 1 : n[3] < t[3] ? -1 : 0
	};
	t.transform = function (n) {
		var r = "",
			l, h, u, c, f, a, s, o;
		for (t.quit = !1, n = n.toLowerCase(), n = n.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, " "), n = n.replace(/\s+-+\s+/g, "."), n = n.replace(/\s*[,\.\?!;]+\s*/g, "."), n = n.replace(/\s*\bbut\b\s*/g, "."), n = n.replace(/\s{2,}/g, " "), l = n.split("."), h = 0; h < l.length; h++)
			if (u = l[h], "" != u) {
				for (c = 0; c < e.length; c++)
					if (e[c] == u) return t.quit = !0, t.getFinal();
				if (f = t.preExp.exec(u), f) {
					for (a = "", s = u; f;) a += s.substring(0, f.index) + t.pres[f[1]], s = s.substring(f.index + f[0].length), f = t.preExp.exec(s);
					u = a + s
				}
				for (t.sentence = u, o = 0; o < i.length; o++)
					if (u.search(new RegExp("\\b" + i[o][0] + "\\b", "i")) >= 0 && (r = t._execRule(o)), "" != r) return r
			}
		return (r = t._memGet(), "" == r) && (t.sentence = " ", o = t._getRuleIndexByKey("xnone"), o >= 0 && (r = t._execRule(o))), "" != r ? r : "I am at a loss for words."
	};
	t._execRule = function (n) {
		for (var a, u, f, y, s, l, e, p, h, k = i[n], c = k[2], w = /\(([0-9]+)\)/, r = 0; r < c.length; r++)
			if (a = t.sentence.match(c[r][0]), null != a) {
				var v = c[r][1],
					b = c[r][2],
					o = t.noRandom ? 0 : Math.floor(Math.random() * v.length);
				if (t.noRandom && t.lastchoice[n][r] > o || t.lastchoice[n][r] == o ? (o = ++t.lastchoice[n][r], o >= v.length && (o = 0, t.lastchoice[n][r] = -1)) : t.lastchoice[n][r] = o, u = v[o], t.debug && alert("match:\nkey: " + i[n][0] + "\nrank: " + i[n][1] + "\ndecomp: " + c[r][0] + "\nreasmb: " + u + "\nmemflag: " + b), 0 == u.search("^goto ", "i") && (ki = t._getRuleIndexByKey(u.substring(5)), ki >= 0)) return t._execRule(ki);
				if (f = w.exec(u), f) {
					for (y = "", s = u; f;) {
						if (l = a[parseInt(f[1])], e = t.postExp.exec(l), e) {
							for (p = "", h = l; e;) p += h.substring(0, e.index) + t.posts[e[1]], h = h.substring(e.index + e[0].length), e = t.postExp.exec(h);
							l = p + h
						}
						y += s.substring(0, f.index) + l;
						s = s.substring(f.index + f[0].length);
						f = w.exec(s)
					}
					u = y + s
				}
				if (u = t._postTransform(u), !b) return u;
				t._memSave(u)
			}
		return ""
	};
	t._postTransform = function (n) {
		var i, u, r;
		if (n = n.replace(/\s{2,}/g, " "), n = n.replace(/\s+\./g, "."), f.length)
			for (i = 0; i < f.length; i += 2) n = n.replace(f[i], f[i + 1]), f[i].lastIndex = 0;
		return t.capitalizeFirstLetter && (u = /^([a-z])/, r = u.exec(n), r && (n = r[0].toUpperCase() + n.substring(1))), n
	};
	t._getRuleIndexByKey = function (n) {
		for (var t = 0; t < i.length; t++)
			if (i[t][0] == n) return t;
		return -1
	};
	t._memSave = function (n) {
		t.mem.push(n);
		t.mem.length > t.memSize && t.mem.shift()
	};
	t._memGet = function () {
		if (t.mem.length) {
			if (t.noRandom) return t.mem.shift();
			for (var i = Math.floor(Math.random() * t.mem.length), r = t.mem[i], n = i + 1; n < t.mem.length; n++) t.mem[n - 1] = t.mem[n];
			return t.mem.length--, r
		}
		return ""
	};
	t.getFinal = function () {
		return s ? s[Math.floor(Math.random() * s.length)] : ""
	};
	t.getInitial = function () {
		return o ? o[Math.floor(Math.random() * o.length)] : ""
	}
}

function Transport_REST_ELIZA() {
	"use strict";

	function r(n) {
		var t = n.promise();
		return {
			done: t.done,
			fail: t.fail
		}
	}

	function s(n) {
		var t = {},
			i = !1;
		switch (n.type) {
			case "Text":
				n.type = "MessageReceived";
				break;
			case "ParticipantJoined":
				n.type = "AgentConnected";
				break;
			case "ParticipantLeft":
				n.type = "AgentDisconnected";
				break;
			case "ParticipantRejoined":
				n.type = "ParticipantRejoined";
				break;
			case "TypingStarted":
				n.type = "AgentTyping";
				i = !0;
				break;
			case "TypingStopped":
				n.type = "AgentTyping";
				i = !1;
				break;
			case "TranscriptSaveDone":
				n.type = "TranscriptSaveDone";
				break;
			case "Notice":
				n.type = "Notice"
		}
		if (n.from && n.from.type) switch (n.from.type) {
			case "Customer":
				n.from.type = "Client";
				break;
			case "Agent":
				n.from.type = "Agent";
				break;
			case "External":
				n.from.type = "External"
		}
		return t.type = n.type, t.index = n.index, t.timestamp = (new Date).getTime(), t.isTyping = "AgentTyping" === n.type ? i : void 0, t.content = n.text ? {
			text: n.text,
			type: "text"
		} : void 0, t.party = {
			id: n.from ? parseInt(n.from.participantId) : "",
			type: n.from ? n.from.type : "",
			name: n.from ? n.from.nickname : ""
		}, t
	}

	function h(t) {
		$.each(t.messages, function () {
			var t = s(this);
			n[t.type] && n[t.type](t)
		})
	}

	function i(n, t, i) {
		setTimeout(function () {
			h(n);
			i && i()
		}, t || 1e3)
	}
	var o = this,
		u = $.Deferred,
		n = {},
		t = 0,
		f, e;
	this.bWaitingForTokens = !1;
	f = null;
	e = !1;
	this.updateOptions = function () {};
	this.setFormData = function () {};
	this.restore = function () {};
	this.startSession = function () {
		return $.Deferred(function (n) {
			ElizaBot ? (f = new ElizaBot(!0), n.done(function () {
				i({
					statusCode: 0,
					messages: [{
						index: ++t,
						type: "ParticipantJoined",
						from: {
							id: "1",
							type: "Customer",
							nickname: "b",
							participantId: "1"
						}
					}]
				}, 1e3);
				i({
					statusCode: 0,
					messages: [{
						index: ++t,
						type: "ParticipantJoined",
						from: {
							id: "2",
							type: "External",
							nickname: "system",
							participantId: "2"
						}
					}]
				}, 2e3);
				i({
					statusCode: 0,
					messages: [{
						index: ++t,
						type: "Text",
						from: {
							id: "2",
							type: "External",
							nickname: "system",
							participantId: "2"
						},
						text: "agent will be with you shortly ..."
					}]
				}, 3e3);
				i({
					statusCode: 0,
					messages: [{
						index: ++t,
						type: "ParticipantJoined",
						from: {
							id: "3",
							type: "Agent",
							nickname: "Eliza",
							participantId: "3"
						}
					}]
				}, 5e3, function () {
					e = !0;
					o.elizaRespond(!1, "Hello! My name is Eliza. How can you help yourself?")
				})
			}), setTimeout(n.resolve, 1e3)) : setTimeout(n.fail, 1e3)
		})
	};
	this.sendMessage = function (n) {
		i({
			statusCode: 0,
			messages: [{
				index: ++t,
				type: "Text",
				from: {
					id: "1",
					type: "Customer",
					nickname: "You",
					participantId: "1"
				},
				text: n.message
			}]
		}, 10);
		o.elizaRespond(n.message)
	};
	this.elizaRespond = function (n, r) {
		if (e) {
			var r = r || f.transform(n);
			i({
				statusCode: 0,
				messages: [{
					index: ++t,
					type: "TypingStarted",
					from: {
						id: "3",
						type: "Agent",
						nickname: "Eliza",
						participantId: "3"
					}
				}]
			});
			i({
				statusCode: 0,
				messages: [{
					index: ++t,
					type: "Text",
					from: {
						id: "3",
						type: "Agent",
						nickname: "Eliza",
						participantId: "3"
					},
					text: r
				}, {
					index: ++t,
					type: "TypingStopped",
					from: {
						id: "3",
						type: "Agent",
						nickname: "Eliza",
						participantId: "3"
					}
				}]
			}, 3e3, function () {
				r.toLowerCase().match("goodbye") && i({
					statusCode: 0,
					messages: [{
						index: ++t,
						type: "ParticipantLeft",
						from: {
							id: "3",
							type: "Agent",
							nickname: "Eliza",
							participantId: "3"
						}
					}, {
						index: ++t,
						type: "ParticipantLeft",
						from: {
							id: "1",
							type: "Customer",
							nickname: "You",
							participantId: "1"
						}
					}]
				})
			})
		}
	};
	this.leaveSession = function () {
		n.SessionEnded()
	};
	this.stopPoll = function () {};
	this.sendTyping = function () {};
	this.setUserData = function () {
		return r(new u)
	};
	this.getUserData = function () {
		return r(new u)
	};
	this.deleteUserData = function () {
		return r(new u)
	};
	this.onAgentConnected = function (t) {
		n.AgentConnected = t
	};
	this.onAgentTyping = function (t) {
		n.AgentTyping = t
	};
	this.onAgentDisconnected = function (t) {
		n.AgentDisconnected = t
	};
	this.onMessageReceived = function (t) {
		n.MessageReceived = t
	};
	this.onSessionEnded = function (t) {
		n.SessionEnded = t
	};
	this.onError = function (t) {
		n.Error = t
	};
	this.onRestore = function (t) {
		n.Restore = t
	}
}

function Transport_REST_WebAPI(n) {
	"use strict";

	function y() {
		c && "/" != c[c.length - 1] && (c += "/")
	}

	function s(n) {
		var t = n.promise();
		return {
			done: t.done,
			fail: t.fail
		}
	}

	function k(n) {
		return setTimeout(n, 0)
	}

	function d(n) {
		var t = {},
			i = !1,
			r = !1;
		switch (n.type) {
			case "Message":
				n.type = "MessageReceived";
				break;
			case "ParticipantJoined":
				n.type = "AgentConnected";
				break;
			case "ParticipantLeft":
				n.type = "AgentDisconnected";
				break;
			case "ParticipantRejoined":
				n.type = "ParticipantRejoined";
				break;
			case "TypingStarted":
				n.type = "AgentTyping";
				i = !0;
				break;
			case "TypingStopped":
				n.type = "AgentTyping";
				i = !1;
				break;
			case "TranscriptSaveDone":
				n.type = "TranscriptSaveDone";
				break;
			case "Notice":
				n.type = "MessageReceived";
				r = !0
		}
		if (n.from && n.from.type) switch (n.from.type) {
			case "Client":
				n.from.type = "Client";
				break;
			case "Agent":
				n.from.type = "Agent";
				break;
			case "External":
				n.from.type = "External"
		}
		return t.type = n.type, t.index = n.index, t.timestamp = (new Date).getTime(), t.isTyping = "AgentTyping" === n.type ? i : void 0, t.content = n.text ? {
			text: n.text,
			type: r ? "notice" : "text"
		} : void 0, t.party = {
			id: n.from ? parseInt(n.from.participantId) : "",
			type: n.from ? n.from.type : "",
			name: n.from ? n.from.nickname : ""
		}, n.index >= 0 && n.index >= a && (a = n.index + 1), t
	}

	function p() {
		localStorage.removeItem("genesys_webchat_session_id");
		localStorage.removeItem("genesys_webchat_session_keys")
	}

	function g(n) {
		$.each(n.messages, function () {
			var n = d(this);
			u[n.type] && u[n.type](n)
		});
		n.chatEnded === !0 && (l.stopPoll(), p(), u.SessionEnded(n))
	}

	function e(n, u, e) {
		var o = new h;
		return $.ajax({
			url: c + $JSTools.encodeEntities(f) + (n || ""),
			type: u,
			crossDomain: !0,
			data: JSON.stringify(e, void 0, 2),
			headers: {
				"Content-Type": "application/json"
			},
			xhrFields: {
				withCredentials: !0
			},
			success: function (n) {
				n.id && (n.sessionId = n.id);
				n.alias && (t = n.alias);
				localStorage.setItem("genesys_webchat_session_keys", JSON.stringify({
					secureKey: r,
					alias: t,
					userId: i
				}));
				o.resolve(n || {})
			},
			error: function (n) {
				o.reject(n || {})
			},
			beforeSend: function () {}
		}), s(o)
	}
	if (console.log("A"), !n || n && !n.id) return !1;
	var l = this,
		h = $.Deferred,
		c = n.dataURL.replace(/\/$/, ""),
		o = n.id || "Environment",
		f = "",
		i = "",
		r = "",
		t = "",
		a = 1,
		nt = 1,
		w = ((new Date).getTimezoneOffset(), new h),
		u = {},
		b = !1,
		v = !1,
		tt = 3e3;
	y();
	console.log("B");
	this.restore = function () {
		var e = localStorage.getItem("genesys_webchat_session_id"),
			u = JSON.parse(localStorage.getItem("genesys_webchat_session_keys"));
		e && u && (f = e, p(), r = u.secureKey, t = u.alias, i = u.userId, this.getTranscript().done(function () {
			n.onRestore && n.onRestore()
		}).fail(function () {
			f = ""
		}))
	};
	this.init = function () {
		return k(w.resolve), s(w)
	};
	this.poll = function () {
		v || (v = !0, this.getTranscript().done(function (n) {
			g(n);
			v = !1
		}))
	};
	this.startPoll = function () {
		this.stopPoll();
		b = setInterval(function () {
			l.poll()
		}, tt);
		this.poll()
	};
	this.stopPoll = function () {
		clearInterval(b)
	};
	this.setFormData = function (t) {
		n.formData = t
	};
	this.updateOptions = function (t) {
		for (var i in t) n[i] = t[i];
		return y(), this
	};
	this.reset = function () {
		f = "";
		i = "";
		r = "";
		t = "";
		a = 1;
		nt = 1
	};
	this.startSession = function () {
		var u = {
			tenantName: o,
			nickname: n.formData.nickname || n.formData.firstname || "Anonymous",
			firstName: n.formData.firstname || "John",
			lastName: n.formData.lastname || "Doe",
			emailAddress: n.formData.email || "",
			subject: n.formData.subject || "No Subject",
			text: "",
			userData: n.userData || {}
		};
		return n.endpoint && (u.endpoint = n.endpoint), f ? this.getTranscript().done(function (n) {
			0 == n.statusCode && (l.startPoll(), localStorage.setItem("genesys_webchat_session_id", f))
		}) : e("", "POST", u).done(function (n) {
			0 == n.statusCode && (f = n.chatId, r = n.secureKey, t = n.alias, i = n.userId, localStorage.setItem("genesys_webchat_session_id", f), localStorage.setItem("genesys_webchat_session_keys", JSON.stringify({
				secureKey: r,
				alias: t,
				userId: i
			})), l.startPoll())
		})
	};
	this.sendMessage = function (n) {
		return e("", "POST", {
			tenantName: o,
			operationName: "SendMessage",
			text: n.message,
			userId: i,
			secureKey: r,
			alias: t
		})
	};
	this.getTranscript = function () {
		return e("/messages", "POST", {
			tenantName: o,
			secureKey: r,
			alias: t,
			userId: i,
			transcriptPosition: a
		})
	};
	this.getChat = function () {
		return e("", "GET", {
			tenantName: o,
			secureKey: r,
			alias: t,
			userId: i
		})
	};
	this.leaveSession = function () {
		return this.stopPoll(), e("", "POST", {
			tenantName: o,
			operationName: "Complete",
			alias: t,
			secureKey: r,
			userId: i
		})
	};
	this.sendTyping = function (n) {
		var n = n || {};
		return n.isTyping ? e("", "POST", {
			tenantName: o,
			operationName: "SendStartTypingNotification",
			alias: t,
			secureKey: r,
			userId: i
		}) : e("", "POST", {
			tenantName: o,
			operationName: "SendStopTypingNotification",
			alias: t,
			secureKey: r,
			userId: i
		})
	};
	this.setUserData = function () {
		return s(new h)
	};
	this.getUserData = function () {
		return s(new h)
	};
	this.deleteUserData = function () {
		return s(new h)
	};
	this.onAgentConnected = function (n) {
		u.AgentConnected = n
	};
	this.onAgentTyping = function (n) {
		u.AgentTyping = n
	};
	this.onAgentDisconnected = function (n) {
		u.AgentDisconnected = n
	};
	this.onMessageReceived = function (n) {
		u.MessageReceived = n
	};
	this.onSessionEnded = function (n) {
		u.SessionEnded = n
	};
	this.onError = function (n) {
		u.Error = n
	}
}

function Transport_REST_HTCC(n) {
	"use strict";

	function l() {
		e && "/" != e[e.length - 1] && (e += "/")
	}

	function y(n) {
		var t = {},
			i = !1;
		switch (n.type) {
			case "Text":
				n.type = "MessageReceived";
				break;
			case "ParticipantJoined":
				n.type = "AgentConnected";
				break;
			case "ParticipantLeft":
				n.type = "AgentDisconnected";
				break;
			case "ParticipantRejoined":
				n.type = "ParticipantRejoined";
				break;
			case "TypingStarted":
				n.type = "AgentTyping";
				i = !0;
				break;
			case "TypingStopped":
				n.type = "AgentTyping";
				i = !1;
				break;
			case "TranscriptSaveDone":
				n.type = "TranscriptSaveDone";
				break;
			case "Notice":
				n.type = "Notice"
		}
		if (n.from && n.from.type) switch (n.from.type) {
			case "Customer":
				n.from.type = "Client";
				break;
			case "Agent":
				n.from.type = "Agent";
				break;
			case "External":
				n.from.type = "External"
		}
		return t.type = n.type, t.index = n.index, t.timestamp = (new Date).getTime(), t.isTyping = "AgentTyping" === n.type ? i : void 0, t.content = n.text ? {
			text: n.text,
			type: "text"
		} : void 0, t.party = {
			id: n.from ? parseInt(n.from.participantId) : "",
			type: n.from ? n.from.type : "",
			name: n.from ? n.from.nickname : ""
		}, t
	}

	function p(n) {
		var i = $JSTools.sortObjectsByProperty(n.messages, "index", !1, "Number");
		$.each(i, function () {
			var n = y(this);
			t[n.type] && t[n.type](n)
		})
	}

	function i(n, t, i) {
		var o = new u;
		return $.ajax({
			url: e + $JSTools.encodeEntities(r) + (n || ""),
			type: t,
			crossDomain: !0,
			data: "POST" == t ? JSON.stringify(i, void 0, 2) : i,
			headers: {
				"Content-Type": "application/json"
			},
			xhrFields: {
				withCredentials: !0
			},
			success: function (n, t, i) {
				n.id && (n.sessionId = n.id);
				i.getResponseHeader("X-CSRF-HEADER") && i.getResponseHeader("X-CSRF-TOKEN") && (f.CSRFHeaderName = i.getResponseHeader("X-CSRF-HEADER"), f.CSRFToken = i.getResponseHeader("X-CSRF-TOKEN"));
				o.resolve(n || {})
			},
			error: function (n) {
				o.reject(n || {})
			},
			beforeSend: function (n) {
				f.CSRFHeaderName && f.CSRFToken && n.setRequestHeader(f.CSRFHeaderName, f.CSRFToken);
				v ? n.setRequestHeader("apikey", v) : a && n.setRequestHeader("ContactCenterId", a)
			}
		}), o.promise()
	}
	if (!n) return !1;
	var s = this,
		u = $.Deferred,
		e = n.dataURL.replace(/\/$/, ""),
		a = n.id,
		r = "",
		t = ((new Date).getTimezoneOffset(), new u, {}),
		h = !1,
		w = 3e3,
		c = !0,
		o = !1,
		f = {},
		v = (document.createElement("a"), n.apikey || !1);
	this.bWaitingForTokens = !0;
	l();
	this.restore = function () {
		$.cookie("genesys_webchat_session_id") && (r = $.cookie("genesys_webchat_session_id"), $.removeCookie("genesys_webchat_session_id", {
			path: "/"
		}), this.getTranscript().done(function () {
			c = !0;
			n.onRestore && n.onRestore()
		}).fail(function () {
			r = ""
		}))
	};
	this.poll = function () {
		h || (h = !0, this.getTranscript(c ? {
			index: 0
		} : {}).done(function (n) {
			p(n);
			h = !1
		}), c = !1)
	};
	this.startPoll = function () {
		this.stopPoll();
		var n = this;
		n.poll();
		window.poll_int = setInterval(function () {
			n.poll()
		}, w)
	};
	this.stopPoll = function () {
		clearInterval(window.poll_int)
	};
	this.setFormData = function (t) {
		n.formData = t
	};
	this.updateOptions = function (t) {
		for (var i in t) n[i] = t[i];
		return l(), this
	};
	this.startSession = function () {
		if (o) return (new u).promise();
		o = !0;
		var t = {
			operationName: "RequestChat",
			nickname: n.formData.nickname || n.formData.firstname || n.UserNameDefault || "Anonymous",
			subject: n.formData.subject || "No Subject",
			userData: n.userData || {}
		};
		return n.formData && (t.userData.FirstName = n.formData.firstname || void 0, t.userData.LastName = n.formData.lastname || void 0, t.userData.EmailAddress = n.formData.email || void 0), n.endpoint && (t.endpoint = n.endpoint), r ? this.getTranscript().done(function () {
			s.startPoll();
			$.cookie("genesys_webchat_session_id", r, {
				path: "/"
			})
		}).always(function () {
			o = !1
		}) : i("", "POST", t).done(function (n) {
			n.id && (r = n.id, $.cookie("genesys_webchat_session_id", r, {
				path: "/"
			}));
			s.startPoll()
		}).always(function () {
			o = !1
		})
	};
	this.sendMessage = function (n) {
		return i("", "POST", {
			operationName: "SendMessage",
			text: n.message
		}).done(function () {
			s.poll()
		})
	};
	this.getTranscript = function (n) {
		return i("/messages", "GET", n)
	};
	this.getChat = function () {
		return i("", "GET", {})
	};
	this.leaveSession = function () {
		return this.stopPoll(), i("", "POST", {
			operationName: "Complete"
		}).done(function () {
			$.removeCookie("genesys_webchat_session_id", {
				path: "/"
			});
			t.SessionEnded()
		}).fail(function () {
			t.SessionEnded()
		})
	};
	this.sendTyping = function (n) {
		var n = n || {};
		return n.isTyping ? i("", "POST", {
			operationName: "SendStartTypingNotification"
		}) : i("", "POST", {
			operationName: "SendStopTypingNotification"
		})
	};
	this.setUserData = function () {
		return (new u).promise()
	};
	this.getUserData = function () {
		return (new u).promise()
	};
	this.deleteUserData = function () {
		return (new u).promise()
	};
	this.onAgentConnected = function (n) {
		t.AgentConnected = n
	};
	this.onAgentTyping = function (n) {
		t.AgentTyping = n
	};
	this.onAgentDisconnected = function (n) {
		t.AgentDisconnected = n
	};
	this.onMessageReceived = function (n) {
		t.MessageReceived = n
	};
	this.onSessionEnded = function (n) {
		t.SessionEnded = n
	};
	this.onError = function (n) {
		t.Error = n
	};
	this.onRestore = function (n) {
		t.Restore = n
	}
}

function Transport_REST_GMS(n) {
	"use strict";

	function y() {
		c && "/" != c[c.length - 1] && (c += "/")
	}

	function o(n) {
		var t = n.promise();
		return {
			done: t.done,
			fail: t.fail
		}
	}

	function k(n) {
		return setTimeout(n, 0)
	}

	function d(n) {
		var t = {},
			i = !1,
			r = !1;
		switch (n.type) {
			case "Message":
				n.type = "MessageReceived";
				break;
			case "ParticipantJoined":
				n.type = "AgentConnected";
				break;
			case "ParticipantLeft":
				n.type = "AgentDisconnected";
				break;
			case "ParticipantRejoined":
				n.type = "ParticipantRejoined";
				break;
			case "TypingStarted":
				n.type = "AgentTyping";
				i = !0;
				break;
			case "TypingStopped":
				n.type = "AgentTyping";
				i = !1;
				break;
			case "TranscriptSaveDone":
				n.type = "TranscriptSaveDone";
				break;
			case "Notice":
				n.type = "MessageReceived";
				r = !0
		}
		return t.type = n.type, t.index = n.index, t.timestamp = n.utcTime, t.isTyping = "AgentTyping" === n.type ? i : void 0, t.content = n.text ? {
			text: n.text,
			type: r ? "notice" : "text"
		} : void 0, t.party = {
			id: n.from ? parseInt(n.from.participantId) : "",
			type: n.from ? n.from.type : "",
			name: n.from ? n.from.nickname : ""
		}, n.index >= 0 && n.index >= a && (a = n.index + 1), t
	}

	function l() {
		localStorage.removeItem("genesys_webchat_session_id");
		localStorage.removeItem("genesys_webchat_session_keys")
	}

	function g(n) {
		$.each(n.messages, function () {
			var n = d(this);
			u[n.type] && u[n.type](n)
		});
		n.chatEnded === !0 && (s.stopPoll(), l(), u.SessionEnded(n))
	}

	function f(n, u, f) {
		var s = new h;
		return $.ajax({
			url: c + $JSTools.encodeEntities(e) + (n || ""),
			type: u,
			crossDomain: !0,
			data: f,
			timeout: 3e3,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			xhrFields: {
				withCredentials: !1
			},
			success: function (n) {
				n.id && (n.sessionId = n.id);
				n.alias && (t = n.alias);
				localStorage.setItem("genesys_webchat_session_keys", JSON.stringify({
					secureKey: r,
					alias: t,
					userId: i
				}));
				s.resolve(n || {})
			},
			error: function (n) {
				s.reject(n || {})
			},
			beforeSend: function (n) {
				b && n.setRequestHeader("apikey", b)
			}
		}), o(s)
	}
	if (!n) return !1;
	var s = this,
		h = $.Deferred,
		c = n.dataURL.replace(/\/$/, ""),
		e = "",
		i = "",
		r = "",
		t = "",
		a = 1,
		p = ((new Date).getTimezoneOffset(), new h),
		u = {},
		w = !1,
		v = !1,
		nt = 3e3,
		b = n.apikey || !1;
	y();
	this.restore = function () {
		var f = localStorage.getItem("genesys_webchat_session_id"),
			u = JSON.parse(localStorage.getItem("genesys_webchat_session_keys"));
		f && u && (e = f, l(), r = u.secureKey, t = u.alias, i = u.userId, this.getTranscript().done(function (t) {
			t && t.chatEnded === !1 && n.onRestore && n.onRestore()
		}).fail(function () {
			e = ""
		}))
	};
	this.init = function () {
		return k(p.resolve), o(p)
	};
	this.poll = function () {
		v || (v = !0, this.getTranscript().done(function (n) {
			g(n);
			v = !1
		}))
	};
	this.startPoll = function () {
		this.stopPoll();
		w = setInterval(function () {
			s.poll()
		}, nt);
		this.poll()
	};
	this.stopPoll = function () {
		clearInterval(w)
	};
	this.setFormData = function (t) {
		n.formData = t
	};
	this.updateOptions = function (t) {
		for (var i in t) n[i] = t[i];
		return y(), this
	};
	this.startSession = function () {
		var u = {
			nickname: n.formData.nickname || n.formData.firstname || "Anonymous",
			firstName: n.formData.firstname || "John",
			lastName: n.formData.lastname || "Doe",
			emailAddress: n.formData.email || "",
			subject: n.formData.subject || "No Subject",
			text: "",
			userData: n.userData || {}
		};
		return n.endpoint && (u.endpoint = n.endpoint), e ? this.getTranscript().done(function (n) {
			0 == n.statusCode && (s.startPoll(), localStorage.setItem("genesys_webchat_session_id", e))
		}) : f("", "POST", u).done(function (n) {
			0 == n.statusCode && (e = n.chatId, r = n.secureKey, t = n.alias, i = n.userId, localStorage.setItem("genesys_webchat_session_id", e), localStorage.setItem("genesys_webchat_session_keys", JSON.stringify({
				secureKey: r,
				alias: t,
				userId: i
			})), s.startPoll())
		})
	};
	this.sendMessage = function (n) {
		return f("/send", "POST", {
			message: n.message,
			messageType: n.messageType || "text",
			userId: i,
			secureKey: r,
			alias: t
		})
	};
	this.getTranscript = function () {
		return f("/refresh", "POST", {
			userId: i,
			secureKey: r,
			alias: t,
			transcriptPosition: a,
			message: s.getCurrentTextEntered()
		})
	};
	this.getChat = function () {
		return f("", "GET", {
			secureKey: r,
			alias: t,
			userId: i
		})
	};
	this.leaveSession = function () {
		return this.stopPoll(), f("/disconnect", "POST", {
			alias: t,
			secureKey: r,
			userId: i
		}).done(function (n) {
			0 === n.statusCode && (l(), u.SessionEnded(n))
		})
	};
	this.sendTyping = function (n) {
		var n = n || {};
		return n.isTyping ? f("/startTyping", "POST", {
			alias: t,
			secureKey: r,
			userId: i,
			message: n.message || ""
		}) : f("/stopTyping", "POST", {
			alias: t,
			secureKey: r,
			userId: i,
			message: n.message || ""
		})
	};
	this.setUserData = function () {
		return o(new h)
	};
	this.getUserData = function () {
		return o(new h)
	};
	this.deleteUserData = function () {
		return o(new h)
	};
	this.onAgentConnected = function (n) {
		u.AgentConnected = n
	};
	this.onAgentTyping = function (n) {
		u.AgentTyping = n
	};
	this.onAgentDisconnected = function (n) {
		u.AgentDisconnected = n
	};
	this.onMessageReceived = function (n) {
		u.MessageReceived = n
	};
	this.onSessionEnded = function (n) {
		u.SessionEnded = n
	};
	this.onError = function (n) {
		u.Error = n
	};
	this.getCurrentTextEntered = function () {
		return ""
	}
}

function GenesysWebChat(n) {
	function ot() {
		var u, f;
		t.updateI18nMessages();
		u = i;
		for (f in u) u[f] = $(u[f], e);
		u.Input.keypress(function (n) {
			if (13 == n.which && !n.ctrlKey) return g(), n.preventDefault(), n.stopPropagation(), !0;
			if (r) {
				var t = vt;
				t.Interval ? t.Timer = 0 : (r && r.sendTyping({
					isTyping: !0
				}), t.Interval = setInterval(function () {
					t.Timer += t.TimeInterval;
					t.Timer >= t.Timeout && (clearInterval(t.Interval), t.Interval = !1, t.Timer = 0, r && r.sendTyping({
						isTyping: !1
					}))
				}, t.TimeInterval))
			}
		}).addClass("disabled").attr("disabled", !0);
		u.Submit.click(function (n) {
			n.preventDefault();
			t.startSession()
		});
		u.Send.click(function (n) {
			n.preventDefault();
			g()
		});
		u.Close.click(function (n) {
			n.preventDefault();
			t.close()
		});
		u.Minimize.click(function (n) {
			n.preventDefault();
			k ? t.maximize() : t.minimize()
		});
		u.End.click(function (n) {
			n.preventDefault();
			t.endSession()
		});
		u.ChatEnd.find("button.end-confirm").click(function () {
			t.hideConfirmEnd();
			t.endSession()
		});
		u.ChatEnd.find("button.end-cancel").click(function () {
			u.Smokescreen.hide();
			t.hideConfirmEnd()
		});
		u.ChatFailed.find("button.failed-close").click(function () {
			t.hideChatFailed();
			t.endSession()
		});
		u.ChatFailed.find("button.failed-retry").click(function () {
			u.Smokescreen.hide();
			t.hideChatFailed();
			t.startSession()
		});
		u.CoBrowse.click(function () {
			t.startCoBrowse()
		});
		i.Title.text(n.title || "");
		p = setInterval(function () {
			ht()
		}, 500);
		rt();
		o.restore();
		"slave" != n.mode && $(window.document.body).append(e)
	}

	function st(n) {
		for (var t = 0; t < d.length; t++)
			if ((n + "").match(d[t])) return !1;
		return !0
	}

	function ht() {
		return null !== p ? n.i18n_URL && !tt ? v = !1 : (v = !0, clearInterval(p), p = null, !0) : v = !1
	}

	function rt() {
		et && (o && o.stopPoll(), o = new et({
			id: n.id,
			apikey: n.apikey,
			tenantName: n.tenantName,
			dataURL: n.dataURL,
			userData: n.userData,
			CSRFURL: n.CSRFURL,
			UserNameDefault: u.UserNameDefault,
			onRestore: function () {
				t.onRestore();
				"overlay" !== n.mode && "slave" !== n.mode || (t.startSession(!0), t.open())
			}
		}))
	}

	function g(n) {
		r && (n || i.Input.val()) && r.sendMessage({
			message: n || i.Input.val(),
			type: "text"
		});
		n || i.Input.val("")
	}

	function s(r) {
		var f = !1,
			s = "",
			o = (r.sType || "").toLowerCase();
		return st(r.sText) && (f = i.LastMessage, at && "system" != o && f && r.sName == f.data("name") && (f.hasClass("them") && h(o) || f.hasClass("you") && "customer" === o) && r.iTimestamp && f.data("time") && r.iTimestamp - f.data("time") <= yt ? (f.find(".message").append("<p>" + r.sText + "<\/p>"), a()) : (f = n.templateMessage ? $(n.templateMessage) : $("<div><span class='avatar'><\/span><span class='name'><\/span><span class='message'><\/span><\/div>"), "injected" == o ? f.addClass("injected") : "system" == o ? (u[r.sText] ? (s = r.sText, r.sText = u[r.sText]) : r.sText = r.sText, u[r.sName] && (s = r.sName, r.sName = u[r.sName]), f.addClass("system"), f.attr({
			"data-message": s,
			"data-message-type": "transcript"
		}), f.addClass("i18n")) : (h(o) ? f.addClass("them").addClass(o) : f.addClass("you"), n.avatars && (h(o) && n.avatars.agent ? f.find(".avatar").addClass(n.avatars.agent) : "client" == o && n.avatars.customer && f.find(".avatar").addClass(n.avatars.customer))), f.find(".name").text(r.sName), r.bHTML ? f.find(".message").html(r.sText) : f.find(".message").text(r.sText), i.Transcript.find(".NewTextBubble").removeClass("NewTextBubble"), f.addClass("NewTextBubble"), i.Transcript.append(f), i.LastMessage = f, r.bNoAnimation ? a(!0) : (f.find(".avatar").hide().fadeIn(), f.find("> p").hide().fadeIn(), a())), k && e.addClass("NewMessage"), r.iTimestamp && (f.find(".time").text(new Date(r.iTimestamp).toLocaleTimeString().split(":").slice(0, 2).join(":")), f.data("time", r.iTimestamp)), f.data("name", r.sName), t.onMessageAdded({
			name: r.sName,
			text: r.sText,
			type: o,
			timestamp: r.iTimestamp
		})), f
	}

	function ct(n) {
		n.sText.toLowerCase().match("http://") || n.sText.toLowerCase().match("https://") || (n.sText = "http://" + n.sText);
		n.sText = "<a href='" + n.sText + "' target='_BLANK'>" + n.sText + "<\/a>";
		n.bHTML = !0;
		var t = s(n);
		return t.addClass("notice"), t
	}

	function a() {
		nt || (nt = !0, i.Transcript.animate({
			scrollTop: i.Transcript[0].scrollHeight
		}, "500", "swing", function () {
			nt = !1;
			i.Transcript[0].scrollTop < i.Transcript[0].scrollHeight && (i.Transcript[0].scrollTop = i.Transcript[0].scrollHeight)
		}))
	}

	function lt(n) {
		var n = n || "";
		switch (n.toLowerCase()) {
			case "pre":
				return Transport_REST_WebAPI;
			case "vcc":
				return Transport_REST_HTCC;
			case "pod":
				return Transport_REST_HTCC;
			case "apg":
				return Transport_REST_HTCC;
			case "htcc":
				return Transport_REST_HTCC;
			case "gms":
				return Transport_REST_GMS;
			case "eliza":
				return Transport_REST_ELIZA
		}
	}

	function ut() {
		e.find(".i18n").each(function () {
			var n = $(this);
			switch (n.data("message-type")) {
				case "transcript":
					n.find(".message").html(u[n.data("message")]);
					break;
				case "placeholder":
					n.attr("placeholder", u[n.data("message")]);
					break;
				default:
					n.text(u[n.data("message")])
			}
		})
	}

	function y(n) {
		return it[n] ? !1 : (it[n] = !0, !0)
	}

	function h(n) {
		return n = n.toLowerCase(), "agent" == n || "supervisor" == n
	}
	var p, ft, nt, t = this,
		n = n || {},
		e = $(n.template),
		i = {
			Title: ".title",
			Transcript: ".transcript",
			Input: ".input",
			InputContainer: ".input-container",
			IsTyping: n.templateMessage || ".isTyping",
			Form: ".form",
			Submit: ".submit",
			Close: ".close",
			Minimize: ".minimize",
			Send: ".send",
			PopUpWindow: "",
			End: ".end",
			CoBrowse: ".start-cobrowse",
			LastMessage: "",
			ChatEnd: ".confirmation.chat-end",
			ChatFailed: ".confirmation.chat-failed",
			Smokescreen: ".smokescreen"
		},
		v = !1,
		tt = !1,
		c = !1,
		l = !1,
		w = !1,
		b = !1,
		k = !1,
		at = !0,
		r = null,
		o = null,
		et = lt(n.transport),
		vt = {
			Timer: 0,
			Timeout: 2e3,
			TimeInterval: 100,
			Interval: !1
		},
		it = {},
		f = null,
		u = {
			ChatStarted: "Chat Started",
			ChatEnded: "Chat Ended",
			ChatFailed: "Failed to Start Chat Session",
			UserNameDefault: "Anonymous",
			AgentNameDefault: "Agent",
			AgentConnected: "<%Agent%> Connected",
			AgentDisconnected: "<%Agent%> Disconnected",
			AgentTyping: "...",
			AgentPending: "An Agent will be with you shortly",
			AgentUnavailable: "Sorry. There are no agents available. Please try later",
			ChatTitle: "Chat Support",
			ChatEnd: "X",
			ChatClose: "X",
			ChatFormFirstName: "First Name",
			ChatFormLastName: "Last Name",
			ChatFormNickname: "Nickname",
			ChatFormEmail: "Email",
			ChatFormSubject: "Subject",
			ChatFormSubmit: "Start Chat",
			ChatInputPlaceholder: "Type your message here and hit return",
			ChatInputSend: "SEND",
			CoBrowseStart: "Start Cobrowse",
			ChatEndQuestion: "Are you sure you want to end this chat session?",
			ChatEndCancel: "Cancel",
			ChatEndConfirm: "End chat",
			ActionsDownload: "Download transcript",
			ActionsEmail: "Email transcript",
			ActionsPrint: "Print transcript",
			ActionsCoBrowse: "Co-Browse",
			ActionsVideo: "Invite to Video Chat",
			"agent will be with you shortly ...": "An Agent will be with you shortly...",
			system: "system"
		},
		d = n.prefilters || [/\{start\:[0-9]{9}\}/],
		yt = n.iMessageGroupingThreshold || 1e5;
	this.startSession = function (l) {
		return t.updateI18nMessages(), t.hideCoBrowse(), this.checkForm() ? (this.clear(), this.hideForm(), l || rt(), o.updateOptions(n), o.setFormData && o.setFormData(n.formData), e.addClass("starting-session"), ft = setInterval(function () {
			v && (clearInterval(ft), w = !1, o.startSession().done(function () {
				if (r = o, n.formData = !1, r.setFormData(n.formData), w) return w = !1, t.reset(), t.endSession(), t.onCancelled(), !1;
				var l = i;
				r.getCurrentTextEntered = function () {
					return i.Input.val()
				};
				r.onMessageReceived(function (n) {
					if (y(n.index)) {
						var t = n.party.type;
						"system" == n.party.name && "External" == n.party.type && (t = "system");
						"notice" == n.content.type ? ct({
							sName: n.party.name,
							sText: n.content.text,
							sType: t,
							iTimestamp: n.timestamp
						}) : s({
							sName: n.party.name,
							sText: n.content.text,
							sType: t,
							iTimestamp: n.timestamp
						})
					}
					h(n.party.type) && l.IsTyping.hide()
				});
				r.onAgentConnected(function (n) {
					y(n.index) && (h(n.party.type) ? (c = !0, t.onAgentConnected(), b || t.showCoBrowse(), s({
						sName: n.party.name,
						sText: u.AgentConnected.replace("<%Agent%>", n.party.name || u.AgentNameDefault),
						sType: "system",
						iTimestamp: n.timestamp
					})) : "Client" == n.party.type && s({
						sName: n.party.name,
						sText: "ChatStarted",
						sType: "system",
						iTimestamp: n.timestamp
					}))
				});
				r.onAgentDisconnected(function (n) {
					y(n.index) && (h(n.party.type) ? s({
						sName: n.party.name,
						sText: u.AgentDisconnected.replace("<%Agent%>", n.party.name || u.AgentNameDefault),
						sType: "system",
						iTimestamp: n.timestamp
					}) : "Client" == n.party.type && t.endSession(), t.hideCoBrowse(), c = !1, t.onAgentDisconnected());
					l.IsTyping.hide()
				});
				r.onAgentTyping(function (t) {
					y(t.index) && h(t.party.type) && (t.isTyping ? (l.IsTyping.addClass("them"), u.AgentTyping = u.AgentTyping.replace("<%Agent%>", t.party.name || u.AgentNameDefault), l.IsTyping.text(u.AgentTyping), l.Transcript.append(l.IsTyping), n.avatars && n.avatars.agent && l.IsTyping.find(".avatar").addClass(n.avatars.agent), l.IsTyping.find(".avatar").hide().fadeIn(), l.IsTyping.find("> p").hide().fadeIn(), a(), l.IsTyping.show(), a()) : l.IsTyping.hide())
				});
				r.onSessionEnded(function (n) {
					var i = !1;
					n && n.messages && n.messages[0] && n.messages[0].utcTime && (i = n.messages[0].utcTime);
					s({
						sName: "",
						sText: "ChatEnded",
						sType: "system",
						iTimestamp: i
					});
					l.Input.addClass("disabled").attr("disabled", !0);
					l.IsTyping.hide();
					l.End.hide();
					l.Close.show();
					r = null;
					c = !1;
					t.hideCoBrowse();
					f && f.exitSession();
					t.onSessionEnded()
				});
				l.Input.removeClass("disabled").attr("disabled", !1);
				l.Close.hide();
				l.End.show();
				t.onStart();
				e.removeClass("starting-session")
			}).fail(function () {
				t.onStartFailed();
				e.removeClass("starting-session")
			}))
		}, 500), this) : this
	};
	this.endSession = function () {
		return r && (r.leaveSession(), r = null, o = null, it = {}), i.Input.empty(), i.IsTyping.hide(), i.End.hide(), i.Close.show(), this.onEnd(), this
	};
	this.checkForm = function () {
		var t = i.Form,
			r = !0,
			f = {
				firstname: !1,
				lastname: !1,
				nickname: !1,
				subject: !1,
				email: !1
			},
			u = [];
		return t.find("input").removeClass("error"), n.formData && n.formData !== {} || (n.formData = {}, $(["firstname", "lastname", "nickname", "subject", "email"]).each(function () {
			var i = t.find("input[name=" + this + "]");
			f[this] && "" === i.val() && (u.push(i), r = !1);
			n.formData[this] = i.val()
		}), $(u).each(function () {
			this.addClass("error")
		})), r
	};
	this.showForm = function () {
		return i.Form.show(), i.Transcript.hide(), i.InputContainer.hide(), i.Close.show(), this
	};
	this.hideForm = function () {
		return i.Form.hide(), i.Transcript.show(), i.InputContainer.show(), this
	};
	this.showCoBrowse = function () {
		f && i.CoBrowse.show()
	};
	this.hideCoBrowse = function () {
		i.CoBrowse.hide()
	};
	this.showConfirmEnd = function () {
		i.ChatEnd.show();
		i.Smokescreen.show()
	};
	this.hideConfirmEnd = function () {
		i.ChatEnd.hide();
		i.Smokescreen.hide()
	};
	this.showChatFailed = function () {
		i.ChatFailed.show();
		i.Smokescreen.show()
	};
	this.hideChatFailed = function () {
		i.ChatFailed.hide();
		i.Smokescreen.hide()
	};
	this.open = function () {
		return e.show(), this.onOpen(), this
	};
	this.close = function () {
		return r && this.endSession(), this.hideConfirmEnd(), this.hideChatFailed(), w = !0, this.clear(), e.hide(), this.showForm(), l = !1, this.maximize(), this.onClose(), this
	};
	this.minimize = function () {
		e.removeClass("NewMessage").addClass("Minimized");
		k = !0
	};
	this.maximize = function () {
		e.removeClass("NewMessage").removeClass("Minimized");
		k = !1
	};
	this.clear = function () {
		var n = i;
		return n.Input.val(""), n.Form.find("input").val(""), n.Transcript.empty(), n.IsTyping.hide(), this
	};
	this.reset = function () {
		this.clear();
		this.showForm();
		c = !1;
		l = !1
	};
	this.openInNewWindow = function () {
		if (n.popupChatWindowHREF) {
			var r = i,
				u = n.popupChatWindowOptions || "width=420, height=" + screen.height + ", top=0, left=" + (screen.width - 420),
				f = n.popupChatWindowHREF + "?options=" + encodeURIComponent(JSON.stringify(n));
			r.PopUpWindow = window.open(f, "popupChatWindow", u);
			r.PopUpWindow.focus();
			$(r.PopUpWindow).load(function () {
				t.onOpenNewWindow()
			});
			$(r.PopUpWindow).unload(function () {
				t.onCloseNewWindow()
			})
		}
	};
	this.suspend = function () {
		l || (l = !0, o.stopPoll(), this.onSuspend())
	};
	this.resume = function () {
		l && (l = !1, o.startPoll(), this.onResume())
	};
	this.updateI18nMessages = function (i) {
		"object" == typeof i && (n.i18n_messages = i);
		n.i18n_messages ? ($.extend(u, n.i18n_lang && n.i18n_messages[n.i18n_lang] ? n.i18n_messages[n.i18n_lang] : n.i18n_messages), t.onUpdateI18nMessages($.extend({}, u)), ut(), tt = !0) : n.i18n_URL && $.getJSON(n.i18n_URL, function (i) {
			i && ($.extend(u, n.i18n_lang && i[n.i18n_lang] ? i[n.i18n_lang] : i), t.onUpdateI18nMessages($.extend({}, u)), ut(), tt = !0)
		})
	};
	this.sendFilteredMessage = function (n, i) {
		"string" == typeof n && i instanceof RegExp && (t.addPrefilter(i), g(n))
	};
	this.addPrefilter = function (n) {
		if (n) {
			n.length || (n = [n]);
			for (var t = 0; t < n.length; t++) d.push(n[t])
		}
	};
	this.clearPrefilters = function () {
		d = []
	};
	this.registerCoBrowse = function (n) {
		f = n;
		var i = function (n) {
				n && n.agents && n.agents.length > 0 && (b = !0, t.hideCoBrowse())
			},
			r = function (n) {
				n && n.token && (t.sendFilteredMessage("{start:" + n.token + "}", /\{start\:[0-9]{9}\}/), b = !0, t.hideCoBrowse())
			},
			u = function () {
				b = !1;
				c && t.showCoBrowse()
			};
		return f.onInitialized.add ? (f.onInitialized.add(i), f.onSessionStarted.add(r), f.onSessionEnded.add(u)) : (f.onInitialized = i, f.onSessionStarted = r, f.onSessionEnded = u), f.markServiceElement(e[0]), f
	};
	this.isReady = function () {
		return v
	};
	this.isAgentConnected = function () {
		return c
	};
	this.destroy = function () {
		e.remove()
	};
	this.getTemplate = function () {
		return e
	};
	this.injectMessage = function (n, t, i) {
		var n = (n + "").toLowerCase() || "text";
		switch (n) {
			case "text":
				if ("object" == typeof i && i[0] && i[0].outerHTML) sText = i[0].outerHTML;
				else {
					if ("string" != typeof i) return !1;
					sText = i
				}
				break;
			case "html":
				sText = i;
				break;
			default:
				return !1
		}
		return s({
			sName: t,
			sText: sText,
			sType: "injected"
		})
	};
	this.startCoBrowse = function () {
		return f ? (f.startSession(), t.hideCoBrowse(), !0) : !1
	};
	this.endCoBrowse = function () {
		return f ? (f.exitSession(), !0) : !1
	};
	this.onOpen = this.onClose = this.onReady = this.onStart = this.onStartFailed = this.onCancelled = this.onEnd = this.onSuspend = this.onResume = this.onRestore = this.onOpenNewWindow = this.onCloseNewWindow = this.onAgentConnected = this.onAgentDisconnected = this.onUpdateI18nMessages = this.onMessageAdded = this.onSessionEnded = function () {};
	ot()
}

function liveChat() {
	$("#genesys-chat-screen").css({
		display: "block"
	})
}

function _LiveChatEvents(n, t) {
	function e() {
		$("#genesys-start-chat, #genesys-in-chat, #genesys-end-chat").hide()
	}

	function s(n) {
		var t = new Date,
			r, i;
		try {
			n && (t = new Date(n))
		} catch (u) {
			t = new Date
		}
		r = t.getHours();
		i = t.getMinutes();
		i < 10 && (i = "0" + i);
		try {
			n || (window.chatTimes.push(t.getTime()), browserStorage(!0).storeItem("window.chatTimes", JSON.stringify(window.chatTimes)))
		} catch (f) {}
		return r + ":" + i
	}

	function b() {
		$("#genesys-chat-minimize, #genesys-messgage-poll").unbind("click");
		$("#genesys-chat-minimize, #genesys-messgage-poll").click(function () {
			$("#genesys-messgage-poll-count").html("");
			$("#genesys-messgage-poll-count").hide();
			window.chatVisable ? ($("#form").show(), $("#genesys-chat-screen").hide(), $("#genesys-messgage-poll").show(), window.chatVisable = !1) : ($("#genesys-chat-screen").show(), $("#genesys-messgage-poll").hide(), l = 0, window.chatVisable = !0, window.continueChatSession = !1);
			$("#genesys-chat-panel").scrollTop($("#genesys-messages").height())
		})
	}

	function k() {
		$("#genesys-messages").html("").append('<div class="agent-joined">' + r[language].chatAlternative + "<\/div>");
		_GlobalClickEvents().supportWindow()
	}

	function d() {
		e();
		$("#genesys-start-chat").show();
		$("#genesys-chat-email");
		$("#genesys-chat-firstname");
		$("#genesys-close-end-chat-button").unbind("click");
		$("#genesys-close-end-chat-button").click(function () {
			$("#genesys-chat-screen, #genesys-messgage-poll").remove();
			_LiveChatEvents()
		});
		$("#genesys-chat-close").unbind("click");
		$("#genesys-chat-close").click(function (n) {
			n.preventDefault();
			o()
		});
		$("#genesys-start-chat").unbind("submit");
		$("#genesys-start-chat").submit(function (n) {
			var t, f, e;
			if (n.preventDefault(), $(".genesys-chat-error").hide(), t = $("#genesys-chat-firstname").val(), f = $("#genesys-chat-email").val(), !t || !t.match(w.firstname)) {
				$("#genesys-chat-firstname").attr("placeholder", r[language].namePlaceholderRequired).addClass("required-input-field");
				return
			}
			e = i.requestPath + "request-chat";
			u.firstName = t;
			u.userDisplayName = t;
			u.email = f;
			u.subject = u.subject + t;
			$.ajax({
				type: "POST",
				contentType: "application/x-www-form-urlencoded",
				url: e,
				success: function (n) {
					i.serviceId = n._id;
					g(u)
				},
				error: function () {
					$("#startchat_button").prop("disabled", !1)
				}
			})
		})
	}

	function g() {
		e();
		$("#genesys-in-chat").show();
		$("#genesys-message-send").css("opacity", .5);
		var n = i.requestPath + i.serviceId + "/ixn/chat?" + jQuery.param(u);
		$.ajax({
			type: "POST",
			contentType: "application/x-www-form-urlencoded",
			url: n,
			success: function (n) {
				i.chatSessionId = n.chatSessionId;
				i.transcriptPosition = n.transcriptPosition;
				i.chatActive = !0;
				window.casinoChatIsActive = !0;
				browserStorage(!0).storeItem("genesysChatParams", JSON.stringify(i));
				v();
				setTimeout(h, 2e3)
			},
			error: function () {
				k()
			}
		});
		$("#genesys-endchat-request").unbind("click");
		$("#genesys-endchat-request").click(function (n) {
			n.preventDefault();
			o()
		})
	}

	function v() {
		$("#genesys-message-text").focus();
		$("#genesys-message-text").on("keypress", function (n) {
			var t, r;
			if (window.allowChatSend)
				if (n.which === 13) n.preventDefault(), $("#genesys-in-chat").submit(), $("#genesys-message-text").val("");
				else {
					if (t = $("#genesys-message-text").val(), t.length > 0) return;
					r = i.requestPath + i.serviceId + "/ixn/chat/startTyping";
					$.ajax({
						type: "POST",
						url: r,
						contentType: "application/x-www-form-urlencoded",
						data: "",
						success: function (n) {
							a(n)
						},
						error: function () {}
					})
				}
		});
		$("#genesys-in-chat").unbind("submit");
		$("#genesys-in-chat").submit(function (n) {
			var t, r;
			(n.preventDefault(), window.allowChatSend) && (t = $("#genesys-message-text").val(), $("#genesys-message-text").val(""), r = i.requestPath + i.serviceId + "/ixn/chat/send", t) && $.ajax({
				type: "POST",
				url: r,
				contentType: "application/x-www-form-urlencoded",
				data: "message=" + t,
				success: function (n) {
					if (n.chatIxnState == "DISCONNECTED") {
						o();
						return
					}
					i.transcriptPosition = n.transcriptPosition;
					$("#genesys-messages").val("");
					a(n);
					$("#genesys-chat-panel").scrollTop($("#genesys-messages").height())
				},
				error: function () {}
			})
		})
	}

	function a(n, t) {
		var u, f;
		if (n.chatIxnState == "DISCONNECTED") {
			o();
			return
		}
		if (n.transcriptToShow.length > 0)
			for (window.continueChatSession || $("#genesys-messgage-poll-count").show().html(n.transcriptToShow.length), u = 0; u < n.transcriptToShow.length; u++) {
				f = null;
				try {
					t && (f = window.chatTimes[u])
				} catch (e) {}
				if (JSON.stringify(n.transcriptToShow[u]) === i.messageState) return;
				i.messageState = JSON.stringify(n.transcriptToShow[u]);
				n.transcriptToShow[u][0] === "Message.Text" && n.transcriptToShow[u][4] === "AGENT" ? $("#genesys-messages").append('<div class="chatbox-cont"><div class="icon icon-float-left"><\/div><div class="chatbox chatbox-float-right">' + n.transcriptToShow[u][2] + '<\/div><div class="chat-time chat-time-align-right">' + r[language].today + " " + s(f) + "<\/div><\/div>") : n.transcriptToShow[u][0] === "Message.Text" && n.transcriptToShow[u][4] === "EXTERNAL" ? $("#genesys-messages").append('<div class="agent-joined">' + n.transcriptToShow[u][2] + "<\/div>") : n.transcriptToShow[u][0] === "Notice.Joined" && n.transcriptToShow[u][4] === "AGENT" ? (window.allowChatSend = !0, $("#genesys-message-send").css("opacity", 1), $("#genesys-messages").append('<div class="agent-joined">' + n.transcriptToShow[u][1] + " " + r[language].joinedChat + " " + s(f) + "<\/div>")) : n.transcriptToShow[u][0] === "Notice.Joined" && n.transcriptToShow[u][4] === "SUPERVISOR" ? (window.allowChatSend = !0, $("#genesys-message-send").css("opacity", 1), $("#genesys-messages").append('<div class="agent-joined">' + n.transcriptToShow[u][1] + " " + r[language].joinedChat + " " + s(f) + "<\/div>")) : n.transcriptToShow[u][0] === "Message.Text" && n.transcriptToShow[u][4] === "CLIENT" && $("#genesys-messages").append('<div class="chatbox-cont"><div class="icon icon-float-right"><\/div><div class="chatbox chatbox-float-left">' + n.transcriptToShow[u][2] + '<\/div><div class="chat-time chat-time-align-left">' + r[language].today + " " + s(f) + "<\/div><\/div>");
				$("#genesys-chat-panel").scrollTop($("#genesys-messages").height())
			}
		i.transcriptPosition = n.transcriptPosition
	}

	function h(n, t) {
		if (i.chatActive) {
			var r = i.requestPath + i.serviceId + "/ixn/chat/refresh?&transcriptPosition=" + i.transcriptPosition;
			$.ajax({
				type: "POST",
				url: r,
				contentType: "application/x-www-form-urlencoded",
				success: function (i) {
					a(i, n);
					t || setTimeout(h, 5e3)
				},
				error: function (n) {
					n && n.responseText && (n.responseText.indexOf("disconnected") > -1 || n.responseText.indexOf("ResourceNotFoundException")) && o();
					t || setTimeout(h, 5e3)
				}
			})
		}
	}

	function o() {
		var n = i.requestPath + i.serviceId + "/ixn/chat/disconnect";
		i.chatActive ? ($("#genesys-chat-minimize, #genesys-chat-close").unbind("click"), $("#genesys-chat-minimize, #genesys-chat-close").click(function (n) {
			n.preventDefault();
			$("#genesys-close-end-chat-button").click()
		}), $.ajax({
			type: "post",
			url: n,
			contentType: "application/x-www-form-urlencoded",
			success: function () {
				i.chatActive = !1;
				window.casinoChatIsActive = !1;
				$("#messages").empty();
				e();
				$("#genesys-end-chat").show();
				browserStorage(!0).removeItem("genesysChatParams");
				browserStorage(!0).removeItem("window.chatTimes")
			},
			error: function () {
				i.chatActive = !1;
				window.casinoChatIsActive = !1;
				e();
				$("#genesys-end-chat").show();
				browserStorage(!0).removeItem("genesysChatParams");
				browserStorage(!0).removeItem("window.chatTimes")
			}
		})) : $("#genesys-chat-minimize").click()
	}
	var f = "",
		l;
	switch (t) {
		case "KE":
			country = "kenya";
			f = "K";
			break;
		case "UG":
			country = "uganda";
			f = "U";
			break;
		case "GH":
			country = "ghana";
			f = "G";
			break;
		case "ZA":
			country = "southafrica";
			f = "SA";
			break;
		default:
			country = "kenya";
			f = "K"
	}
	var y = "betway" + country,
		c = 0;
	c = c;
	var u = {
			subject: "BrandCode:BW" + f + "||LanguageCode:en||IsMobile:false||AccountNumber:||Skill:" + y + "||CasinoID:" + c + "||CountryCode:||IPAddress:||IsLoggedIn:||AccountId:||Name:",
			firstName: "",
			lastName: "",
			email: "",
			userDisplayName: ""
		},
		i = {
			requestPath: "https://chatv1.dmgamingsystems.com/genesys/1/service/",
			serviceId: null,
			chatSessionId: null,
			transcriptPosition: null,
			chatActive: !1,
			messageId: null,
			messageState: null
		},
		r = {
			en: {
				liveChatHeading: "Live Chat",
				welcomeText: "Welcome to Live Chat, please provide the following information:",
				namePlaceholder: "Name *",
				namePlaceholderRequired: "Name is required *",
				emailPlacholder: "Email",
				startChatButton: "Start chat",
				availableAgent: "Please wait while we connect you with an agent",
				enterText: "Enter text here…",
				sendButton: "Send",
				chatDisconnected: "Chat disconnected",
				chatDisconnectedText: "Your chat has ended, thanks for contacting Betway helpdesk.",
				closeChatButton: "Close Chat",
				today: "Today",
				joinedChat: "has joined the session at",
				chatSendError: "There was an error while sending your message, please try again.",
				chatAlternative: 'Unfortunately live chat is unavailable at this time, please use an alternative means of contacting the helpdesk <a href="#" api-launch-support-window="api-launch-support-window">here<\/a>'
			}
		};
	language = "en";
	var p = '<div id="genesys-chat-screen" class=""><div id="genesys-chat-heading">' + r[language].liveChatHeading + '<div id="genesys-chat-close"><\/div><div id="genesys-chat-minimize"><\/div><\/div><div id="genesys-chat-screen-inner"><form id="genesys-start-chat"><div id="genesys-chat-start-text"><p>' + r[language].welcomeText + '<\/p><\/div><div><label for="genesys-chat-firstname"><input type="text" id="genesys-chat-firstname" name="genesys-chat-firstname" placeholder="' + r[language].namePlaceholder + '" /><\/label><\/div><div><label for="genesys-chat-email"><input type="email" id="genesys-chat-email" name="genesys-chat-email" placeholder="' + r[language].emailPlacholder + '" /><\/label><\/div><div><button role="button" class="button-element" id="genesys-start-button"><span class="text">' + r[language].startChatButton + '<\/span><\/button><\/div><\/form><form id="genesys-in-chat"><div id="genesys-chat-panel"><div id="genesys-messages"><div class="agent-joined">' + r[language].availableAgent + '<\/div><\/div><\/div><div id="genesys-messgage-panel" class="' + language + '-textarea"><textarea type="text" id="genesys-message-text" name="genesys-message-text" placeholder="' + r[language].enterText + '"><\/textarea><button class="button-element" id="genesys-message-send"><span class="text">' + r[language].sendButton + '<\/span><\/button><\/div><\/form><div id="genesys-end-chat"><div><p><strong>' + r[language].chatDisconnected + "<\/strong><\/p><p>" + r[language].chatDisconnectedText + '<\/p><button class="button-element" id="genesys-close-end-chat-button"><span class="text">' + r[language].closeChatButton + '<\/span><\/button><\/div><\/div><div id="genesys-clear"><\/div><\/div><\/div>',
		w = {
			firstname: /^[\w\s]+$/
		};
	window.chatTimes = [];
	l = 0;
	this.initiate = function () {
		$("#form").show();
		window.chatVisable = !1;
		i.serviceId = null;
		i.chatSessionId = null;
		i.transcriptPosition = null;
		i.chatActive = !1;
		i.messageId = null;
		$("body").append(p);
		d();
		b();
		var n = browserStorage(!0).getItem("genesysChatParams");
		if (n) {
			window.continueChatSession = !0;
			i = JSON.parse(n);
			e();
			$("#genesys-in-chat").show();
			try {
				window.chatTimes = JSON.parse(browserStorage(!0).getItem("window.chatTimes"));
				browserStorage(!0).removeItem("window.chatTimes")
			} catch (t) {}
			h(!0);
			v();
			window.casinoChatIsActive = !0;
			isMobileDevice || ($("#genesys-messgage-poll-count").html(""), $("#genesys-messgage-poll-count").hide(), isMobileDevice && $("#form").hide(), window.chatVisable ? ($("#form").show(), $("#genesys-chat-screen").hide(), $("#genesys-messgage-poll").show(), window.chatVisable = !1) : ($("#genesys-chat-screen").show(), $("#genesys-messgage-poll").hide(), l = 0, window.chatVisable = !0, window.continueChatSession = !1));
			$("#genesys-chat-panel").scrollTop($("#genesys-messages").height())
		}
	};
	this.initiate()
}

function getInboxCount() {
	pat.get("/Account/InboxCount").done(function (n) {
		document.getElementById("messageCountBadge") !== null && (document.getElementById("messageCountBadge").innerHTML = n);
		document.getElementById("messageCountBadgeMobile") !== null && (document.getElementById("messageCountBadgeMobile").innerHTML = n);
		document.getElementById("messageCountBadgeFooter") !== null && (document.getElementById("messageCountBadgeFooter").innerHTML = n)
	})
}

function getInboxCountOpera() {
	pat.get("/Account/InboxCount").done(function () {
		document.getElementById("operaButton") !== null && (document.getElementById("operaButton").style.backgroundColor = "red")
	})
}

function openMessageModal() {
	typeof document.getElementById("myModal") == "undefined" || document.getElementById("myModal") === null ? ($("#askLoginModal").modal("show"), $(".modal-backdrop").css("z-index", "-1")) : pat.get("/Account/InboxMessages").done(function (n) {
		typeof document.getElementById("myModal") != "undefined" && document.getElementById("myModal") !== null && (document.getElementById("myModal").innerHTML = n, $(".modal-backdrop").css("z-index", "999"))
	})
}

function refreshInboxMessages() {
	pat.get("/Account/_SmsMessages").done(function (n) {
		document.getElementById("subsection") !== null && (document.getElementById("subsection").innerHTML = n)
	})
}

function refreshInboxMessagesModal() {
	pat.get("/Account/InboxMessages").done(function (n) {
		$(".modal-body") !== null && (document.getElementById("myModal").innerHTML = n)
	})
}

function readMessage(n, t, i, r, u) {
	pat.post("/Account/UpdateMessage", {
		accountId: n,
		ReadMessage: t
	}).done(function () {
		var t, f, n;
		if (!r && !u)
			for (t = document.getElementById("head-" + i), f = null, n = 0; n < t.childNodes.length; n++)
				if (typeof t.childNodes[n].nextElementSibling != "undefined" && t.childNodes[n].nextElementSibling !== null && t.childNodes[n].nextElementSibling.className.toLowerCase().indexOf("label-warning") >= 0) {
					f = t.childNodes[n].nextElementSibling;
					f.className = "label label-success";
					f.innerHTML = "Read";
					break
				}
		getInboxCount()
	});
	closeOverlay()
}

function deleteMessage(n, t, i, r, u) {
	pat.post("/Account/DeleteMessage", {
		accountId: n,
		ReadMessage: t
	}).done(function () {
		var t, f, n;
		if (r || u) location.reload();
		else
			for (t = document.getElementById("head-" + i), f = null, n = 0; n < t.childNodes.length; n++)
				if (typeof t.childNodes[n].nextElementSibling != "undefined" && t.childNodes[n].nextElementSibling !== null && t.childNodes[n].nextElementSibling.className.toLowerCase().indexOf("label") >= 0) {
					f = t.childNodes[n].nextElementSibling;
					f.className = "label label-danger";
					f.innerHTML = "Deleted";
					$("#confirm-" + i).modal("hide");
					break
				}
		getInboxCount()
	});
	closeOverlay()
}

function loadInboxPage(n) {
	pat.post("/Account/LoadInboxPage", {
		direction: n
	}).done(function () {
		refreshInboxMessages()
	})
}

function loadInboxPageModal(n) {
	pat.post("/Account/LoadInboxPage", {
		direction: n
	}).done(function () {
		refreshInboxMessagesModal()
	})
}

function confirmDelete(n, t) {
	n.stopPropagation();
	$("#confirm-" + t).modal("show");
	$(".modal-backdrop").css("z-index", "999")
}

function getMenuControls() {
	pat.get("/SideMenu/GetSideMenuControls").done(function (n) {
		$("#sideMenuControls").html(n)
	})
}

function getMenuContent(n, t) {
	pat.post("/SideMenu/GetSideMenuContent", {
		renderPartial: n
	}).done(function (n) {
		$("#sideMenuContent").html(n);
		$(".btnMenuBtn").removeClass("active");
		$(".btnMenu" + t).addClass("active");
		(typeof t == "undefined" || t === null) && $(".btnMenuMyAccount").addClass("active")
	})
}

function getMenuBottomNav() {
	pat.post("/SideMenu/GetSideMenuBottomNav").done(function (n) {
		$("#sideMenuBottomNav").html(n)
	})
}

function openMenu(n) {
	$("#my-menu").fadeIn("fast");
	getMenuControls();
	getMenuContent(n);
	getMenuBottomNav();
	var t = $("#my-menu").data("mmenu");
	t.open()
}

function closeMenu() {
	$("#my-menu").fadeOut("fast");
	var n = $("#my-menu").data("mmenu");
	n.close()
}

function onMenuLoginClick() {
	showOverlay();
	data = {
		mobileNumber: $("#menuMobileNumber").val(),
		password: $("#menuPassword").val(),
		dialingCode: $("#menuDialingCode").val()
	};
	pat.post("/Account/Login", {
		loginModel: data,
		origin: "sideMenu"
	}).done(function (n) {
		n.Error == !1 ? ($("#modal-container-mobile-login").html(""), $("#inline-login-placeholder").html(""), window.location = n.RedirectUrl) : $("#sideMenuContent").html(n);
		closeOverlay()
	})
}

function openWidgetFlyout() {
	$(".widget-flyout").show().animate({
		width: "452px"
	}).css({
		display: "flex"
	});
	$(".widget-flyout-div").fadeIn("slow");
	$("#overlay1").fadeIn("slow")
}

function closeWidgetFlyout() {
	$(".widget-flyout-div").hide();
	$(".widget-flyout").animate({
		width: "0px"
	}).fadeOut("fast");
	$("#overlay1").fadeOut("fast");
	refreshAngles()
}

function widgetSearch(n, t) {
	showOverlay();
	pat.post("/Widget/DoSearch", {
		keyword: t
	}).done(function (t) {
		openWidgetFlyout();
		$(".widget-flyout-header").text(n);
		$(".widget-flyout-content").html(t);
		closeOverlay()
	})
}

function widgetModalSearch(n, t) {
	showOverlay();
	$(".ModalSearchResults").html("Loading Content...").css({
		color: "white",
		"padding-left": "5%",
		"margin-top": "63px"
	});
	pat.post("/Widget/DoSearch", {
		keyword: t
	}).done(function (n) {
		$(".ModalSearchResults").css({
			"background-color": "white",
			"padding-left": "5%",
			"padding-right": "5%",
			"padding-bottom": "50px",
			color: "black",
			"margin-top": "63px"
		}).html(n);
		closeOverlay()
	})
}

function getFlyoutEvents(n, t, i, r, u, f) {
	$("#" + t).hasClass("fa-angle-right") ? (showOverlay(), pat.post("/Widget/getFlyoutEvents", {
		widgetType: n,
		groupedLayout: r,
		QueryDate: u,
		HeaderStyling: f
	}).done(function (r) {
		openWidgetFlyout();
		refreshAngles();
		$("#" + t).removeClass("fa-angle-right").addClass("fa-angle-left");
		$(".widget-flyout-header").text(i);
		$(".widget-flyout-content").html(r);
		n == 2 ? $("#widgetCloseIcon").attr("src", "/Images/Shared/menu/Exit_IconDG.PNG") : $("#widgetCloseIcon").attr("src", "/Images/Shared/menu/CloseIcon.svg");
		closeOverlay()
	})) : closeWidgetFlyout()
}

function getModalEvents(n, t, i, r, u) {
	showOverlay();
	console.log("queryDate", r);
	$(".widget-flyout-header").text(t);
	$(".widget-flyout-header-div").css({
		"margin-bottom": "10px"
	});
	$(".widgetModalContent").css({
		"padding-left": "5%",
		"background-color": "white"
	}).html("Loading Content...");
	pat.post("/Widget/getFlyoutEvents", {
		widgetType: n,
		groupedLayout: i,
		QueryDate: r,
		HeaderStyling: u
	}).done(function (t) {
		$(".widgetModalContent").css({
			"background-color": "white",
			"padding-left": "5%",
			"padding-right": "5%",
			"padding-bottom": "50px"
		}).html(t);
		n == 2 ? $("#widgetCloseIcon").attr("src", "/Images/Shared/menu/Exit_IconDG.PNG") : $("#widgetCloseIcon").attr("src", "/Images/Shared/menu/CloseIcon.svg");
		$("#widgetModal").show();
		closeOverlay();
		$("body").addClass("modal-open")
	})
}

function closeModalEvents() {
	$("#widgetModal").fadeOut("fast");
	$("body").removeClass("modal-open")
}

function renderSearchPartial(n, t) {
	showOverlay();
	pat.post("/Widget/renderSearchPartial").done(function (i) {
		$(".widget-flyout-header-div").css({
			"background-color": "gray",
			color: "white",
			"margin-bottom": "0px"
		});
		$(".widget-flyout-header").text(n).css(t);
		$(".widgetModalContent").css({
			"background-color": "#333333",
			"padding-left": "0%",
			"padding-right": "0%"
		}).html(i);
		$("#widgetModal").show();
		closeOverlay()
	})
}

function replaceFlyoutContentByDate(n, t, i) {
	pat.post("/Widget/getFlyoutEvents", {
		widgetType: n,
		groupedLayout: t,
		QueryDate: i
	}).done(function (n) {
		$(".widgetModalContent") !== null && typeof $(".widgetModalContent") != "undefined" && $(".widgetModalContent").is(":visible") ? $(".widgetModalContent").html(n) : $(".widget-flyout-content").html(n)
	})
}

function refreshAngles() {
	$(".widget-angle").removeClass("fa-angle-left").removeClass("fa-angle-right").addClass("fa-angle-right")
}

function goToEntity(n, t) {
	window.location.href = "/Bet/EventMultiMarket?eventId=" + n + "&marketTypeCategoryId=" + t
}

function toggleMobileModal(n) {
	$(".mobileWidgetDiv").is(":visible") ? ($(".mobileWidgetDiv").fadeOut("slow"), closeModalEvents(), $(".mobileWidgetBtn").text("More "), $(".mobileWidgetBtnIcon").removeClass("glyphicon-remove").addClass("glyphicon-plus")) : ($(".mobileWidgetDiv").fadeIn("fast"), $(".mobileWidgetBtn").text("Close "), $(".mobileWidgetBtnIcon").removeClass("glyphicon-plus").addClass("glyphicon-remove"), getModalEvents(0, "Highlights", !0, n, "{'background-color':'#439539','color':'white'}"))
}

function closeMobileModal() {
	$(".mobileWidgetDiv").animate({
		height: "0px"
	}).fadeOut("fast")
}
var runBetslipScript, betslipItem, betslipBuilder, promptFICANotification, pat;
if (! function (n, t) {
		"use strict";
		"object" == typeof module && "object" == typeof module.exports ? module.exports = n.document ? t(n, !0) : function (n) {
			if (!n.document) throw new Error("jQuery requires a window with a document");
			return t(n)
		} : t(n)
	}("undefined" != typeof window ? window : this, function (n, t) {
		"use strict";

		function gi(n, t) {
			t = t || u;
			var i = t.createElement("script");
			i.text = n;
			t.head.appendChild(i).parentNode.removeChild(i)
		}

		function ui(n) {
			var t = !!n && "length" in n && n.length,
				r = i.type(n);
			return "function" !== r && !i.isWindow(n) && ("array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in n)
		}

		function fi(n, t, r) {
			if (i.isFunction(t)) return i.grep(n, function (n, i) {
				return !!t.call(n, i, n) !== r
			});
			if (t.nodeType) return i.grep(n, function (n) {
				return n === t !== r
			});
			if ("string" == typeof t) {
				if (gf.test(t)) return i.filter(t, n, r);
				t = i.filter(t, n)
			}
			return i.grep(n, function (n) {
				return lt.call(t, n) > -1 !== r && 1 === n.nodeType
			})
		}

		function hr(n, t) {
			while ((n = n[t]) && 1 !== n.nodeType);
			return n
		}

		function ne(n) {
			var t = {};
			return i.each(n.match(h) || [], function (n, i) {
				t[i] = !0
			}), t
		}

		function d(n) {
			return n
		}

		function yt(n) {
			throw n;
		}

		function cr(n, t, r) {
			var u;
			try {
				n && i.isFunction(u = n.promise) ? u.call(n).done(t).fail(r) : n && i.isFunction(u = n.then) ? u.call(n, t, r) : t.call(void 0, n)
			} catch (n) {
				r.call(void 0, n)
			}
		}

		function wt() {
			u.removeEventListener("DOMContentLoaded", wt);
			n.removeEventListener("load", wt);
			i.ready()
		}

		function ot() {
			this.expando = i.expando + ot.uid++
		}

		function ar(n, t, i) {
			var r;
			if (void 0 === i && 1 === n.nodeType)
				if (r = "data-" + t.replace(ie, "-$&").toLowerCase(), i = n.getAttribute(r), "string" == typeof i) {
					try {
						i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : te.test(i) ? JSON.parse(i) : i)
					} catch (u) {}
					e.set(n, t, i)
				} else i = void 0;
			return i
		}

		function pr(n, t, r, u) {
			var h, e = 1,
				l = 20,
				c = u ? function () {
					return u.cur()
				} : function () {
					return i.css(n, t, "")
				},
				s = c(),
				o = r && r[3] || (i.cssNumber[t] ? "" : "px"),
				f = (i.cssNumber[t] || "px" !== o && +s) && st.exec(i.css(n, t));
			if (f && f[3] !== o) {
				o = o || f[3];
				r = r || [];
				f = +s || 1;
				do e = e || ".5", f /= e, i.style(n, t, f + o); while (e !== (e = c() / s) && 1 !== e && --l)
			}
			return r && (f = +f || +s || 0, h = r[1] ? f + (r[1] + 1) * r[2] : +r[2], u && (u.unit = o, u.start = f, u.end = h)), h
		}

		function re(n) {
			var r, f = n.ownerDocument,
				u = n.nodeName,
				t = ei[u];
			return t ? t : (r = f.body.appendChild(f.createElement(u)), t = i.css(r, "display"), r.parentNode.removeChild(r), "none" === t && (t = "block"), ei[u] = t, t)
		}

		function g(n, t) {
			for (var e, u, f = [], i = 0, o = n.length; i < o; i++) u = n[i], u.style && (e = u.style.display, t ? ("none" === e && (f[i] = r.get(u, "display") || null, f[i] || (u.style.display = "")), "" === u.style.display && bt(u) && (f[i] = re(u))) : "none" !== e && (f[i] = "none", r.set(u, "display", e)));
			for (i = 0; i < o; i++) null != f[i] && (n[i].style.display = f[i]);
			return n
		}

		function o(n, t) {
			var r = "undefined" != typeof n.getElementsByTagName ? n.getElementsByTagName(t || "*") : "undefined" != typeof n.querySelectorAll ? n.querySelectorAll(t || "*") : [];
			return void 0 === t || t && i.nodeName(n, t) ? i.merge([n], r) : r
		}

		function oi(n, t) {
			for (var i = 0, u = n.length; i < u; i++) r.set(n[i], "globalEval", !t || r.get(t[i], "globalEval"))
		}

		function gr(n, t, r, u, f) {
			for (var e, s, p, a, w, v, h = t.createDocumentFragment(), y = [], l = 0, b = n.length; l < b; l++)
				if (e = n[l], e || 0 === e)
					if ("object" === i.type(e)) i.merge(y, e.nodeType ? [e] : e);
					else if (dr.test(e)) {
				for (s = s || h.appendChild(t.createElement("div")), p = (br.exec(e) || ["", ""])[1].toLowerCase(), a = c[p] || c._default, s.innerHTML = a[1] + i.htmlPrefilter(e) + a[2], v = a[0]; v--;) s = s.lastChild;
				i.merge(y, s.childNodes);
				s = h.firstChild;
				s.textContent = ""
			} else y.push(t.createTextNode(e));
			for (h.textContent = "", l = 0; e = y[l++];)
				if (u && i.inArray(e, u) > -1) f && f.push(e);
				else if (w = i.contains(e.ownerDocument, e), s = o(h.appendChild(e), "script"), w && oi(s), r)
				for (v = 0; e = s[v++];) kr.test(e.type || "") && r.push(e);
			return h
		}

		function dt() {
			return !0
		}

		function nt() {
			return !1
		}

		function tu() {
			try {
				return u.activeElement
			} catch (n) {}
		}

		function si(n, t, r, u, f, e) {
			var o, s;
			if ("object" == typeof t) {
				"string" != typeof r && (u = u || r, r = void 0);
				for (s in t) si(n, s, r, u, t[s], e);
				return n
			}
			if (null == u && null == f ? (f = r, u = r = void 0) : null == f && ("string" == typeof r ? (f = u, u = void 0) : (f = u, u = r, r = void 0)), f === !1) f = nt;
			else if (!f) return n;
			return 1 === e && (o = f, f = function (n) {
				return i().off(n), o.apply(this, arguments)
			}, f.guid = o.guid || (o.guid = i.guid++)), n.each(function () {
				i.event.add(this, t, f, u, r)
			})
		}

		function iu(n, t) {
			return i.nodeName(n, "table") && i.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? n.getElementsByTagName("tbody")[0] || n : n
		}

		function le(n) {
			return n.type = (null !== n.getAttribute("type")) + "/" + n.type, n
		}

		function ae(n) {
			var t = he.exec(n.type);
			return t ? n.type = t[1] : n.removeAttribute("type"), n
		}

		function ru(n, t) {
			var u, c, f, s, h, l, a, o;
			if (1 === t.nodeType) {
				if (r.hasData(n) && (s = r.access(n), h = r.set(t, s), o = s.events)) {
					delete h.handle;
					h.events = {};
					for (f in o)
						for (u = 0, c = o[f].length; u < c; u++) i.event.add(t, f, o[f][u])
				}
				e.hasData(n) && (l = e.access(n), a = i.extend({}, l), e.set(t, a))
			}
		}

		function ve(n, t) {
			var i = t.nodeName.toLowerCase();
			"input" === i && wr.test(n.type) ? t.checked = n.checked : "input" !== i && "textarea" !== i || (t.defaultValue = n.defaultValue)
		}

		function tt(n, t, u, e) {
			t = bi.apply([], t);
			var l, p, c, a, s, w, h = 0,
				v = n.length,
				k = v - 1,
				y = t[0],
				b = i.isFunction(y);
			if (b || v > 1 && "string" == typeof y && !f.checkClone && se.test(y)) return n.each(function (i) {
				var r = n.eq(i);
				b && (t[0] = y.call(this, i, r.html()));
				tt(r, t, u, e)
			});
			if (v && (l = gr(t, n[0].ownerDocument, !1, n, e), p = l.firstChild, 1 === l.childNodes.length && (l = p), p || e)) {
				for (c = i.map(o(l, "script"), le), a = c.length; h < v; h++) s = l, h !== k && (s = i.clone(s, !0, !0), a && i.merge(c, o(s, "script"))), u.call(n[h], s, h);
				if (a)
					for (w = c[c.length - 1].ownerDocument, i.map(c, ae), h = 0; h < a; h++) s = c[h], kr.test(s.type || "") && !r.access(s, "globalEval") && i.contains(w, s) && (s.src ? i._evalUrl && i._evalUrl(s.src) : gi(s.textContent.replace(ce, ""), w))
			}
			return n
		}

		function uu(n, t, r) {
			for (var u, e = t ? i.filter(t, n) : n, f = 0; null != (u = e[f]); f++) r || 1 !== u.nodeType || i.cleanData(o(u)), u.parentNode && (r && i.contains(u.ownerDocument, u) && oi(o(u, "script")), u.parentNode.removeChild(u));
			return n
		}

		function ht(n, t, r) {
			var o, s, h, u, e = n.style;
			return r = r || gt(n), r && (u = r.getPropertyValue(t) || r[t], "" !== u || i.contains(n.ownerDocument, n) || (u = i.style(n, t)), !f.pixelMarginRight() && hi.test(u) && fu.test(t) && (o = e.width, s = e.minWidth, h = e.maxWidth, e.minWidth = e.maxWidth = e.width = u, u = r.width, e.width = o, e.minWidth = s, e.maxWidth = h)), void 0 !== u ? u + "" : u
		}

		function eu(n, t) {
			return {
				get: function () {
					return n() ? void delete this.get : (this.get = t).apply(this, arguments)
				}
			}
		}

		function cu(n) {
			if (n in hu) return n;
			for (var i = n[0].toUpperCase() + n.slice(1), t = su.length; t--;)
				if (n = su[t] + i, n in hu) return n
		}

		function lu(n, t, i) {
			var r = st.exec(t);
			return r ? Math.max(0, r[2] - (i || 0)) + (r[3] || "px") : t
		}

		function au(n, t, r, u, f) {
			for (var e = r === (u ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; e < 4; e += 2) "margin" === r && (o += i.css(n, r + w[e], !0, f)), u ? ("content" === r && (o -= i.css(n, "padding" + w[e], !0, f)), "margin" !== r && (o -= i.css(n, "border" + w[e] + "Width", !0, f))) : (o += i.css(n, "padding" + w[e], !0, f), "padding" !== r && (o += i.css(n, "border" + w[e] + "Width", !0, f)));
			return o
		}

		function vu(n, t, r) {
			var u, o = !0,
				e = gt(n),
				s = "border-box" === i.css(n, "boxSizing", !1, e);
			if (n.getClientRects().length && (u = n.getBoundingClientRect()[t]), u <= 0 || null == u) {
				if (u = ht(n, t, e), (u < 0 || null == u) && (u = n.style[t]), hi.test(u)) return u;
				o = s && (f.boxSizingReliable() || u === n.style[t]);
				u = parseFloat(u) || 0
			}
			return u + au(n, t, r || (s ? "border" : "content"), o, e) + "px"
		}

		function s(n, t, i, r, u) {
			return new s.prototype.init(n, t, i, r, u)
		}

		function wu() {
			rt && (n.requestAnimationFrame(wu), i.fx.tick())
		}

		function bu() {
			return n.setTimeout(function () {
				it = void 0
			}), it = i.now()
		}

		function ni(n, t) {
			var r, u = 0,
				i = {
					height: n
				};
			for (t = t ? 1 : 0; u < 4; u += 2 - t) r = w[u], i["margin" + r] = i["padding" + r] = n;
			return t && (i.opacity = i.width = n), i
		}

		function ku(n, t, i) {
			for (var u, f = (l.tweeners[t] || []).concat(l.tweeners["*"]), r = 0, e = f.length; r < e; r++)
				if (u = f[r].call(i, t, n)) return u
		}

		function we(n, t, u) {
			var f, y, w, c, b, s, o, l, k = "width" in t || "height" in t,
				v = this,
				p = {},
				h = n.style,
				a = n.nodeType && bt(n),
				e = r.get(n, "fxshow");
			u.queue || (c = i._queueHooks(n, "fx"), null == c.unqueued && (c.unqueued = 0, b = c.empty.fire, c.empty.fire = function () {
				c.unqueued || b()
			}), c.unqueued++, v.always(function () {
				v.always(function () {
					c.unqueued--;
					i.queue(n, "fx").length || c.empty.fire()
				})
			}));
			for (f in t)
				if (y = t[f], yu.test(y)) {
					if (delete t[f], w = w || "toggle" === y, y === (a ? "hide" : "show")) {
						if ("show" !== y || !e || void 0 === e[f]) continue;
						a = !0
					}
					p[f] = e && e[f] || i.style(n, f)
				}
			if (s = !i.isEmptyObject(t), s || !i.isEmptyObject(p)) {
				k && 1 === n.nodeType && (u.overflow = [h.overflow, h.overflowX, h.overflowY], o = e && e.display, null == o && (o = r.get(n, "display")), l = i.css(n, "display"), "none" === l && (o ? l = o : (g([n], !0), o = n.style.display || o, l = i.css(n, "display"), g([n]))), ("inline" === l || "inline-block" === l && null != o) && "none" === i.css(n, "float") && (s || (v.done(function () {
					h.display = o
				}), null == o && (l = h.display, o = "none" === l ? "" : l)), h.display = "inline-block"));
				u.overflow && (h.overflow = "hidden", v.always(function () {
					h.overflow = u.overflow[0];
					h.overflowX = u.overflow[1];
					h.overflowY = u.overflow[2]
				}));
				s = !1;
				for (f in p) s || (e ? "hidden" in e && (a = e.hidden) : e = r.access(n, "fxshow", {
					display: o
				}), w && (e.hidden = !a), a && g([n], !0), v.done(function () {
					a || g([n]);
					r.remove(n, "fxshow");
					for (f in p) i.style(n, f, p[f])
				})), s = ku(a ? e[f] : 0, f, v), f in e || (e[f] = s.start, a && (s.end = s.start, s.start = 0))
			}
		}

		function be(n, t) {
			var r, f, e, u, o;
			for (r in n)
				if (f = i.camelCase(r), e = t[f], u = n[r], i.isArray(u) && (e = u[1], u = n[r] = u[0]), r !== f && (n[f] = u, delete n[r]), o = i.cssHooks[f], o && "expand" in o) {
					u = o.expand(u);
					delete n[f];
					for (r in u) r in n || (n[r] = u[r], t[r] = e)
				} else t[f] = e
		}

		function l(n, t, r) {
			var e, o, s = 0,
				a = l.prefilters.length,
				f = i.Deferred().always(function () {
					delete c.elem
				}),
				c = function () {
					if (o) return !1;
					for (var s = it || bu(), t = Math.max(0, u.startTime + u.duration - s), h = t / u.duration || 0, i = 1 - h, r = 0, e = u.tweens.length; r < e; r++) u.tweens[r].run(i);
					return f.notifyWith(n, [u, i, t]), i < 1 && e ? t : (f.resolveWith(n, [u]), !1)
				},
				u = f.promise({
					elem: n,
					props: i.extend({}, t),
					opts: i.extend(!0, {
						specialEasing: {},
						easing: i.easing._default
					}, r),
					originalProperties: t,
					originalOptions: r,
					startTime: it || bu(),
					duration: r.duration,
					tweens: [],
					createTween: function (t, r) {
						var f = i.Tween(n, u.opts, t, r, u.opts.specialEasing[t] || u.opts.easing);
						return u.tweens.push(f), f
					},
					stop: function (t) {
						var i = 0,
							r = t ? u.tweens.length : 0;
						if (o) return this;
						for (o = !0; i < r; i++) u.tweens[i].run(1);
						return t ? (f.notifyWith(n, [u, 1, 0]), f.resolveWith(n, [u, t])) : f.rejectWith(n, [u, t]), this
					}
				}),
				h = u.props;
			for (be(h, u.opts.specialEasing); s < a; s++)
				if (e = l.prefilters[s].call(u, n, h, u.opts)) return i.isFunction(e.stop) && (i._queueHooks(u.elem, u.opts.queue).stop = i.proxy(e.stop, e)), e;
			return i.map(h, ku, u), i.isFunction(u.opts.start) && u.opts.start.call(n, u), i.fx.timer(i.extend(c, {
				elem: n,
				anim: u,
				queue: u.opts.queue
			})), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
		}

		function b(n) {
			return n.getAttribute && n.getAttribute("class") || ""
		}

		function ai(n, t, r, u) {
			var f;
			if (i.isArray(t)) i.each(t, function (t, i) {
				r || ke.test(n) ? u(n, i) : ai(n + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, r, u)
			});
			else if (r || "object" !== i.type(t)) u(n, t);
			else
				for (f in t) ai(n + "[" + f + "]", t[f], r, u)
		}

		function sf(n) {
			return function (t, r) {
				"string" != typeof t && (r = t, t = "*");
				var u, f = 0,
					e = t.toLowerCase().match(h) || [];
				if (i.isFunction(r))
					while (u = e[f++]) "+" === u[0] ? (u = u.slice(1) || "*", (n[u] = n[u] || []).unshift(r)) : (n[u] = n[u] || []).push(r)
			}
		}

		function hf(n, t, r, u) {
			function e(s) {
				var h;
				return f[s] = !0, i.each(n[s] || [], function (n, i) {
					var s = i(t, r, u);
					return "string" != typeof s || o || f[s] ? o ? !(h = s) : void 0 : (t.dataTypes.unshift(s), e(s), !1)
				}), h
			}
			var f = {},
				o = n === vi;
			return e(t.dataTypes[0]) || !f["*"] && e("*")
		}

		function pi(n, t) {
			var r, u, f = i.ajaxSettings.flatOptions || {};
			for (r in t) void 0 !== t[r] && ((f[r] ? n : u || (u = {}))[r] = t[r]);
			return u && i.extend(!0, n, u), n
		}

		function eo(n, t, i) {
			for (var e, u, f, o, s = n.contents, r = n.dataTypes;
				"*" === r[0];) r.shift(), void 0 === e && (e = n.mimeType || t.getResponseHeader("Content-Type"));
			if (e)
				for (u in s)
					if (s[u] && s[u].test(e)) {
						r.unshift(u);
						break
					}
			if (r[0] in i) f = r[0];
			else {
				for (u in i) {
					if (!r[0] || n.converters[u + " " + r[0]]) {
						f = u;
						break
					}
					o || (o = u)
				}
				f = f || o
			}
			if (f) return f !== r[0] && r.unshift(f), i[f]
		}

		function oo(n, t, i, r) {
			var h, u, f, s, e, o = {},
				c = n.dataTypes.slice();
			if (c[1])
				for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
			for (u = c.shift(); u;)
				if (n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), e = u, u = c.shift())
					if ("*" === u) u = e;
					else if ("*" !== e && e !== u) {
				if (f = o[e + " " + u] || o["* " + u], !f)
					for (h in o)
						if (s = h.split(" "), s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]])) {
							f === !0 ? f = o[h] : o[h] !== !0 && (u = s[0], c.unshift(s[1]));
							break
						}
				if (f !== !0)
					if (f && n.throws) t = f(t);
					else try {
						t = f(t)
					} catch (l) {
						return {
							state: "parsererror",
							error: f ? l : "No conversion from " + e + " to " + u
						}
					}
			}
			return {
				state: "success",
				data: t
			}
		}

		function lf(n) {
			return i.isWindow(n) ? n : 9 === n.nodeType && n.defaultView
		}
		var y = [],
			u = n.document,
			yf = Object.getPrototypeOf,
			p = y.slice,
			bi = y.concat,
			ri = y.push,
			lt = y.indexOf,
			at = {},
			ki = at.toString,
			vt = at.hasOwnProperty,
			di = vt.toString,
			pf = di.call(Object),
			f = {},
			nr = "3.1.0",
			i = function (n, t) {
				return new i.fn.init(n, t)
			},
			wf = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			bf = /^-ms-/,
			kf = /-([a-z])/g,
			df = function (n, t) {
				return t.toUpperCase()
			},
			v, ur, fr, er, or, sr, h, lr, pt, a, et, ei, dr, it, rt, yu, pu, du, ut, gu, nf, ti, tf, rf, ci, cf, ft, wi, ii, af, vf;
		i.fn = i.prototype = {
			jquery: nr,
			constructor: i,
			length: 0,
			toArray: function () {
				return p.call(this)
			},
			get: function (n) {
				return null != n ? n < 0 ? this[n + this.length] : this[n] : p.call(this)
			},
			pushStack: function (n) {
				var t = i.merge(this.constructor(), n);
				return t.prevObject = this, t
			},
			each: function (n) {
				return i.each(this, n)
			},
			map: function (n) {
				return this.pushStack(i.map(this, function (t, i) {
					return n.call(t, i, t)
				}))
			},
			slice: function () {
				return this.pushStack(p.apply(this, arguments))
			},
			first: function () {
				return this.eq(0)
			},
			last: function () {
				return this.eq(-1)
			},
			eq: function (n) {
				var i = this.length,
					t = +n + (n < 0 ? i : 0);
				return this.pushStack(t >= 0 && t < i ? [this[t]] : [])
			},
			end: function () {
				return this.prevObject || this.constructor()
			},
			push: ri,
			sort: y.sort,
			splice: y.splice
		};
		i.extend = i.fn.extend = function () {
			var e, f, r, t, o, s, n = arguments[0] || {},
				u = 1,
				c = arguments.length,
				h = !1;
			for ("boolean" == typeof n && (h = n, n = arguments[u] || {}, u++), "object" == typeof n || i.isFunction(n) || (n = {}), u === c && (n = this, u--); u < c; u++)
				if (null != (e = arguments[u]))
					for (f in e) r = n[f], t = e[f], n !== t && (h && t && (i.isPlainObject(t) || (o = i.isArray(t))) ? (o ? (o = !1, s = r && i.isArray(r) ? r : []) : s = r && i.isPlainObject(r) ? r : {}, n[f] = i.extend(h, s, t)) : void 0 !== t && (n[f] = t));
			return n
		};
		i.extend({
			expando: "jQuery" + (nr + Math.random()).replace(/\D/g, ""),
			isReady: !0,
			error: function (n) {
				throw new Error(n);
			},
			noop: function () {},
			isFunction: function (n) {
				return "function" === i.type(n)
			},
			isArray: Array.isArray,
			isWindow: function (n) {
				return null != n && n === n.window
			},
			isNumeric: function (n) {
				var t = i.type(n);
				return ("number" === t || "string" === t) && !isNaN(n - parseFloat(n))
			},
			isPlainObject: function (n) {
				var t, i;
				return !(!n || "[object Object]" !== ki.call(n)) && (!(t = yf(n)) || (i = vt.call(t, "constructor") && t.constructor, "function" == typeof i && di.call(i) === pf))
			},
			isEmptyObject: function (n) {
				for (var t in n) return !1;
				return !0
			},
			type: function (n) {
				return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? at[ki.call(n)] || "object" : typeof n
			},
			globalEval: function (n) {
				gi(n)
			},
			camelCase: function (n) {
				return n.replace(bf, "ms-").replace(kf, df)
			},
			nodeName: function (n, t) {
				return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
			},
			each: function (n, t) {
				var r, i = 0;
				if (ui(n)) {
					for (r = n.length; i < r; i++)
						if (t.call(n[i], i, n[i]) === !1) break
				} else
					for (i in n)
						if (t.call(n[i], i, n[i]) === !1) break; return n
			},
			trim: function (n) {
				return null == n ? "" : (n + "").replace(wf, "")
			},
			makeArray: function (n, t) {
				var r = t || [];
				return null != n && (ui(Object(n)) ? i.merge(r, "string" == typeof n ? [n] : n) : ri.call(r, n)), r
			},
			inArray: function (n, t, i) {
				return null == t ? -1 : lt.call(t, n, i)
			},
			merge: function (n, t) {
				for (var u = +t.length, i = 0, r = n.length; i < u; i++) n[r++] = t[i];
				return n.length = r, n
			},
			grep: function (n, t, i) {
				for (var u, f = [], r = 0, e = n.length, o = !i; r < e; r++) u = !t(n[r], r), u !== o && f.push(n[r]);
				return f
			},
			map: function (n, t, i) {
				var e, u, r = 0,
					f = [];
				if (ui(n))
					for (e = n.length; r < e; r++) u = t(n[r], r, i), null != u && f.push(u);
				else
					for (r in n) u = t(n[r], r, i), null != u && f.push(u);
				return bi.apply([], f)
			},
			guid: 1,
			proxy: function (n, t) {
				var u, f, r;
				if ("string" == typeof t && (u = n[t], t = n, n = u), i.isFunction(n)) return f = p.call(arguments, 2), r = function () {
					return n.apply(t || this, f.concat(p.call(arguments)))
				}, r.guid = n.guid = n.guid || i.guid++, r
			},
			now: Date.now,
			support: f
		});
		"function" == typeof Symbol && (i.fn[Symbol.iterator] = y[Symbol.iterator]);
		i.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (n, t) {
			at["[object " + t + "]"] = t.toLowerCase()
		});
		v = function (n) {
			function u(n, t, r, u) {
				var s, w, l, a, d, y, g, p = t && t.ownerDocument,
					v = t ? t.nodeType : 9;
				if (r = r || [], "string" != typeof n || !n || 1 !== v && 9 !== v && 11 !== v) return r;
				if (!u && ((t ? t.ownerDocument || t : h) !== i && b(t), t = t || i, c)) {
					if (11 !== v && (d = cr.exec(n)))
						if (s = d[1]) {
							if (9 === v) {
								if (!(l = t.getElementById(s))) return r;
								if (l.id === s) return r.push(l), r
							} else if (p && (l = p.getElementById(s)) && et(t, l) && l.id === s) return r.push(l), r
						} else {
							if (d[2]) return k.apply(r, t.getElementsByTagName(n)), r;
							if ((s = d[3]) && f.getElementsByClassName && t.getElementsByClassName) return k.apply(r, t.getElementsByClassName(s)), r
						}
					if (f.qsa && !lt[n + " "] && (!o || !o.test(n))) {
						if (1 !== v) p = t, g = n;
						else if ("object" !== t.nodeName.toLowerCase()) {
							for ((a = t.getAttribute("id")) ? a = a.replace(vi, yi) : t.setAttribute("id", a = e), y = ft(n), w = y.length; w--;) y[w] = "#" + a + " " + yt(y[w]);
							g = y.join(",");
							p = ni.test(n) && ri(t.parentNode) || t
						}
						if (g) try {
							return k.apply(r, p.querySelectorAll(g)), r
						} catch (nt) {} finally {
							a === e && t.removeAttribute("id")
						}
					}
				}
				return si(n.replace(at, "$1"), t, r, u)
			}

			function ti() {
				function n(r, u) {
					return i.push(r + " ") > t.cacheLength && delete n[i.shift()], n[r + " "] = u
				}
				var i = [];
				return n
			}

			function l(n) {
				return n[e] = !0, n
			}

			function a(n) {
				var t = i.createElement("fieldset");
				try {
					return !!n(t)
				} catch (r) {
					return !1
				} finally {
					t.parentNode && t.parentNode.removeChild(t);
					t = null
				}
			}

			function ii(n, i) {
				for (var r = n.split("|"), u = r.length; u--;) t.attrHandle[r[u]] = i
			}

			function wi(n, t) {
				var i = t && n,
					r = i && 1 === n.nodeType && 1 === t.nodeType && n.sourceIndex - t.sourceIndex;
				if (r) return r;
				if (i)
					while (i = i.nextSibling)
						if (i === t) return -1;
				return n ? 1 : -1
			}

			function ar(n) {
				return function (t) {
					var i = t.nodeName.toLowerCase();
					return "input" === i && t.type === n
				}
			}

			function vr(n) {
				return function (t) {
					var i = t.nodeName.toLowerCase();
					return ("input" === i || "button" === i) && t.type === n
				}
			}

			function bi(n) {
				return function (t) {
					return "label" in t && t.disabled === n || "form" in t && t.disabled === n || "form" in t && t.disabled === !1 && (t.isDisabled === n || t.isDisabled !== !n && ("label" in t || !lr(t)) !== n)
				}
			}

			function it(n) {
				return l(function (t) {
					return t = +t, l(function (i, r) {
						for (var u, f = n([], i.length, t), e = f.length; e--;) i[u = f[e]] && (i[u] = !(r[u] = i[u]))
					})
				})
			}

			function ri(n) {
				return n && "undefined" != typeof n.getElementsByTagName && n
			}

			function ki() {}

			function yt(n) {
				for (var t = 0, r = n.length, i = ""; t < r; t++) i += n[t].value;
				return i
			}

			function pt(n, t, i) {
				var r = t.dir,
					u = t.next,
					f = u || r,
					o = i && "parentNode" === f,
					s = di++;
				return t.first ? function (t, i, u) {
					while (t = t[r])
						if (1 === t.nodeType || o) return n(t, i, u)
				} : function (t, i, h) {
					var c, l, a, y = [v, s];
					if (h) {
						while (t = t[r])
							if ((1 === t.nodeType || o) && n(t, i, h)) return !0
					} else
						while (t = t[r])
							if (1 === t.nodeType || o)
								if (a = t[e] || (t[e] = {}), l = a[t.uniqueID] || (a[t.uniqueID] = {}), u && u === t.nodeName.toLowerCase()) t = t[r] || t;
								else {
									if ((c = l[f]) && c[0] === v && c[1] === s) return y[2] = c[2];
									if (l[f] = y, y[2] = n(t, i, h)) return !0
								}
				}
			}

			function ui(n) {
				return n.length > 1 ? function (t, i, r) {
					for (var u = n.length; u--;)
						if (!n[u](t, i, r)) return !1;
					return !0
				} : n[0]
			}

			function yr(n, t, i) {
				for (var r = 0, f = t.length; r < f; r++) u(n, t[r], i);
				return i
			}

			function wt(n, t, i, r, u) {
				for (var e, o = [], f = 0, s = n.length, h = null != t; f < s; f++)(e = n[f]) && (i && !i(e, r, u) || (o.push(e), h && t.push(f)));
				return o
			}

			function fi(n, t, i, r, u, f) {
				return r && !r[e] && (r = fi(r)), u && !u[e] && (u = fi(u, f)), l(function (f, e, o, s) {
					var l, c, a, p = [],
						y = [],
						w = e.length,
						b = f || yr(t || "*", o.nodeType ? [o] : o, []),
						v = !n || !f && t ? b : wt(b, p, n, o, s),
						h = i ? u || (f ? n : w || r) ? [] : e : v;
					if (i && i(v, h, o, s), r)
						for (l = wt(h, y), r(l, [], o, s), c = l.length; c--;)(a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
					if (f) {
						if (u || n) {
							if (u) {
								for (l = [], c = h.length; c--;)(a = h[c]) && l.push(v[c] = a);
								u(null, h = [], l, s)
							}
							for (c = h.length; c--;)(a = h[c]) && (l = u ? nt(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a))
						}
					} else h = wt(h === e ? h.splice(w, h.length) : h), u ? u(null, e, h, s) : k.apply(e, h)
				})
			}

			function ei(n) {
				for (var o, u, r, s = n.length, h = t.relative[n[0].type], c = h || t.relative[" "], i = h ? 1 : 0, l = pt(function (n) {
						return n === o
					}, c, !0), a = pt(function (n) {
						return nt(o, n) > -1
					}, c, !0), f = [function (n, t, i) {
						var r = !h && (i || t !== ht) || ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
						return o = null, r
					}]; i < s; i++)
					if (u = t.relative[n[i].type]) f = [pt(ui(f), u)];
					else {
						if (u = t.filter[n[i].type].apply(null, n[i].matches), u[e]) {
							for (r = ++i; r < s; r++)
								if (t.relative[n[r].type]) break;
							return fi(i > 1 && ui(f), i > 1 && yt(n.slice(0, i - 1).concat({
								value: " " === n[i - 2].type ? "*" : ""
							})).replace(at, "$1"), u, i < r && ei(n.slice(i, r)), r < s && ei(n = n.slice(r)), r < s && yt(n))
						}
						f.push(u)
					}
				return ui(f)
			}

			function pr(n, r) {
				var f = r.length > 0,
					e = n.length > 0,
					o = function (o, s, h, l, a) {
						var y, nt, d, g = 0,
							p = "0",
							tt = o && [],
							w = [],
							it = ht,
							rt = o || e && t.find.TAG("*", a),
							ut = v += null == it ? 1 : Math.random() || .1,
							ft = rt.length;
						for (a && (ht = s === i || s || a); p !== ft && null != (y = rt[p]); p++) {
							if (e && y) {
								for (nt = 0, s || y.ownerDocument === i || (b(y), h = !c); d = n[nt++];)
									if (d(y, s || i, h)) {
										l.push(y);
										break
									}
								a && (v = ut)
							}
							f && ((y = !d && y) && g--, o && tt.push(y))
						}
						if (g += p, f && p !== g) {
							for (nt = 0; d = r[nt++];) d(tt, w, s, h);
							if (o) {
								if (g > 0)
									while (p--) tt[p] || w[p] || (w[p] = nr.call(l));
								w = wt(w)
							}
							k.apply(l, w);
							a && !o && w.length > 0 && g + r.length > 1 && u.uniqueSort(l)
						}
						return a && (v = ut, ht = it), tt
					};
				return f ? l(o) : o
			}
			var rt, f, t, st, oi, ft, bt, si, ht, w, ut, b, i, s, c, o, d, ct, et, e = "sizzle" + 1 * new Date,
				h = n.document,
				v = 0,
				di = 0,
				hi = ti(),
				ci = ti(),
				lt = ti(),
				kt = function (n, t) {
					return n === t && (ut = !0), 0
				},
				gi = {}.hasOwnProperty,
				g = [],
				nr = g.pop,
				tr = g.push,
				k = g.push,
				li = g.slice,
				nt = function (n, t) {
					for (var i = 0, r = n.length; i < r; i++)
						if (n[i] === t) return i;
					return -1
				},
				dt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
				r = "[\\x20\\t\\r\\n\\f]",
				tt = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
				ai = "\\[" + r + "*(" + tt + ")(?:" + r + "*([*^$|!~]?=)" + r + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + tt + "))|)" + r + "*\\]",
				gt = ":(" + tt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ai + ")*)|.*)\\)|)",
				ir = new RegExp(r + "+", "g"),
				at = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"),
				rr = new RegExp("^" + r + "*," + r + "*"),
				ur = new RegExp("^" + r + "*([>+~]|" + r + ")" + r + "*"),
				fr = new RegExp("=" + r + "*([^\\]'\"]*?)" + r + "*\\]", "g"),
				er = new RegExp(gt),
				or = new RegExp("^" + tt + "$"),
				vt = {
					ID: new RegExp("^#(" + tt + ")"),
					CLASS: new RegExp("^\\.(" + tt + ")"),
					TAG: new RegExp("^(" + tt + "|[*])"),
					ATTR: new RegExp("^" + ai),
					PSEUDO: new RegExp("^" + gt),
					CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)", "i"),
					bool: new RegExp("^(?:" + dt + ")$", "i"),
					needsContext: new RegExp("^" + r + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + r + "*((?:-\\d)?\\d*)" + r + "*\\)|)(?=[^-]|$)", "i")
				},
				sr = /^(?:input|select|textarea|button)$/i,
				hr = /^h\d$/i,
				ot = /^[^{]+\{\s*\[native \w/,
				cr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				ni = /[+~]/,
				y = new RegExp("\\\\([\\da-f]{1,6}" + r + "?|(" + r + ")|.)", "ig"),
				p = function (n, t, i) {
					var r = "0x" + t - 65536;
					return r !== r || i ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
				},
				vi = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
				yi = function (n, t) {
					return t ? "\0" === n ? "�" : n.slice(0, -1) + "\\" + n.charCodeAt(n.length - 1).toString(16) + " " : "\\" + n
				},
				pi = function () {
					b()
				},
				lr = pt(function (n) {
					return n.disabled === !0
				}, {
					dir: "parentNode",
					next: "legend"
				});
			try {
				k.apply(g = li.call(h.childNodes), h.childNodes);
				g[h.childNodes.length].nodeType
			} catch (wr) {
				k = {
					apply: g.length ? function (n, t) {
						tr.apply(n, li.call(t))
					} : function (n, t) {
						for (var i = n.length, r = 0; n[i++] = t[r++];);
						n.length = i - 1
					}
				}
			}
			f = u.support = {};
			oi = u.isXML = function (n) {
				var t = n && (n.ownerDocument || n).documentElement;
				return !!t && "HTML" !== t.nodeName
			};
			b = u.setDocument = function (n) {
				var v, u, l = n ? n.ownerDocument || n : h;
				return l !== i && 9 === l.nodeType && l.documentElement ? (i = l, s = i.documentElement, c = !oi(i), h !== i && (u = i.defaultView) && u.top !== u && (u.addEventListener ? u.addEventListener("unload", pi, !1) : u.attachEvent && u.attachEvent("onunload", pi)), f.attributes = a(function (n) {
					return n.className = "i", !n.getAttribute("className")
				}), f.getElementsByTagName = a(function (n) {
					return n.appendChild(i.createComment("")), !n.getElementsByTagName("*").length
				}), f.getElementsByClassName = ot.test(i.getElementsByClassName), f.getById = a(function (n) {
					return s.appendChild(n).id = e, !i.getElementsByName || !i.getElementsByName(e).length
				}), f.getById ? (t.find.ID = function (n, t) {
					if ("undefined" != typeof t.getElementById && c) {
						var i = t.getElementById(n);
						return i ? [i] : []
					}
				}, t.filter.ID = function (n) {
					var t = n.replace(y, p);
					return function (n) {
						return n.getAttribute("id") === t
					}
				}) : (delete t.find.ID, t.filter.ID = function (n) {
					var t = n.replace(y, p);
					return function (n) {
						var i = "undefined" != typeof n.getAttributeNode && n.getAttributeNode("id");
						return i && i.value === t
					}
				}), t.find.TAG = f.getElementsByTagName ? function (n, t) {
					return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(n) : f.qsa ? t.querySelectorAll(n) : void 0
				} : function (n, t) {
					var i, r = [],
						f = 0,
						u = t.getElementsByTagName(n);
					if ("*" === n) {
						while (i = u[f++]) 1 === i.nodeType && r.push(i);
						return r
					}
					return u
				}, t.find.CLASS = f.getElementsByClassName && function (n, t) {
					if ("undefined" != typeof t.getElementsByClassName && c) return t.getElementsByClassName(n)
				}, d = [], o = [], (f.qsa = ot.test(i.querySelectorAll)) && (a(function (n) {
					s.appendChild(n).innerHTML = "<a id='" + e + "'><\/a><select id='" + e + "-\r\\' msallowcapture=''><option selected=''><\/option><\/select>";
					n.querySelectorAll("[msallowcapture^='']").length && o.push("[*^$]=" + r + "*(?:''|\"\")");
					n.querySelectorAll("[selected]").length || o.push("\\[" + r + "*(?:value|" + dt + ")");
					n.querySelectorAll("[id~=" + e + "-]").length || o.push("~=");
					n.querySelectorAll(":checked").length || o.push(":checked");
					n.querySelectorAll("a#" + e + "+*").length || o.push(".#.+[+~]")
				}), a(function (n) {
					n.innerHTML = "<a href='' disabled='disabled'><\/a><select disabled='disabled'><option/><\/select>";
					var t = i.createElement("input");
					t.setAttribute("type", "hidden");
					n.appendChild(t).setAttribute("name", "D");
					n.querySelectorAll("[name=d]").length && o.push("name" + r + "*[*^$|!~]?=");
					2 !== n.querySelectorAll(":enabled").length && o.push(":enabled", ":disabled");
					s.appendChild(n).disabled = !0;
					2 !== n.querySelectorAll(":disabled").length && o.push(":enabled", ":disabled");
					n.querySelectorAll("*,:x");
					o.push(",.*:")
				})), (f.matchesSelector = ot.test(ct = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && a(function (n) {
					f.disconnectedMatch = ct.call(n, "*");
					ct.call(n, "[s!='']:x");
					d.push("!=", gt)
				}), o = o.length && new RegExp(o.join("|")), d = d.length && new RegExp(d.join("|")), v = ot.test(s.compareDocumentPosition), et = v || ot.test(s.contains) ? function (n, t) {
					var r = 9 === n.nodeType ? n.documentElement : n,
						i = t && t.parentNode;
					return n === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : n.compareDocumentPosition && 16 & n.compareDocumentPosition(i)))
				} : function (n, t) {
					if (t)
						while (t = t.parentNode)
							if (t === n) return !0;
					return !1
				}, kt = v ? function (n, t) {
					if (n === t) return ut = !0, 0;
					var r = !n.compareDocumentPosition - !t.compareDocumentPosition;
					return r ? r : (r = (n.ownerDocument || n) === (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1, 1 & r || !f.sortDetached && t.compareDocumentPosition(n) === r ? n === i || n.ownerDocument === h && et(h, n) ? -1 : t === i || t.ownerDocument === h && et(h, t) ? 1 : w ? nt(w, n) - nt(w, t) : 0 : 4 & r ? -1 : 1)
				} : function (n, t) {
					if (n === t) return ut = !0, 0;
					var r, u = 0,
						o = n.parentNode,
						s = t.parentNode,
						f = [n],
						e = [t];
					if (!o || !s) return n === i ? -1 : t === i ? 1 : o ? -1 : s ? 1 : w ? nt(w, n) - nt(w, t) : 0;
					if (o === s) return wi(n, t);
					for (r = n; r = r.parentNode;) f.unshift(r);
					for (r = t; r = r.parentNode;) e.unshift(r);
					while (f[u] === e[u]) u++;
					return u ? wi(f[u], e[u]) : f[u] === h ? -1 : e[u] === h ? 1 : 0
				}, i) : i
			};
			u.matches = function (n, t) {
				return u(n, null, null, t)
			};
			u.matchesSelector = function (n, t) {
				if ((n.ownerDocument || n) !== i && b(n), t = t.replace(fr, "='$1']"), f.matchesSelector && c && !lt[t + " "] && (!d || !d.test(t)) && (!o || !o.test(t))) try {
					var r = ct.call(n, t);
					if (r || f.disconnectedMatch || n.document && 11 !== n.document.nodeType) return r
				} catch (e) {}
				return u(t, i, null, [n]).length > 0
			};
			u.contains = function (n, t) {
				return (n.ownerDocument || n) !== i && b(n), et(n, t)
			};
			u.attr = function (n, r) {
				(n.ownerDocument || n) !== i && b(n);
				var e = t.attrHandle[r.toLowerCase()],
					u = e && gi.call(t.attrHandle, r.toLowerCase()) ? e(n, r, !c) : void 0;
				return void 0 !== u ? u : f.attributes || !c ? n.getAttribute(r) : (u = n.getAttributeNode(r)) && u.specified ? u.value : null
			};
			u.escape = function (n) {
				return (n + "").replace(vi, yi)
			};
			u.error = function (n) {
				throw new Error("Syntax error, unrecognized expression: " + n);
			};
			u.uniqueSort = function (n) {
				var r, u = [],
					t = 0,
					i = 0;
				if (ut = !f.detectDuplicates, w = !f.sortStable && n.slice(0), n.sort(kt), ut) {
					while (r = n[i++]) r === n[i] && (t = u.push(i));
					while (t--) n.splice(u[t], 1)
				}
				return w = null, n
			};
			st = u.getText = function (n) {
				var r, i = "",
					u = 0,
					t = n.nodeType;
				if (t) {
					if (1 === t || 9 === t || 11 === t) {
						if ("string" == typeof n.textContent) return n.textContent;
						for (n = n.firstChild; n; n = n.nextSibling) i += st(n)
					} else if (3 === t || 4 === t) return n.nodeValue
				} else
					while (r = n[u++]) i += st(r);
				return i
			};
			t = u.selectors = {
				cacheLength: 50,
				createPseudo: l,
				match: vt,
				attrHandle: {},
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: !0
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: !0
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					ATTR: function (n) {
						return n[1] = n[1].replace(y, p), n[3] = (n[3] || n[4] || n[5] || "").replace(y, p), "~=" === n[2] && (n[3] = " " + n[3] + " "), n.slice(0, 4)
					},
					CHILD: function (n) {
						return n[1] = n[1].toLowerCase(), "nth" === n[1].slice(0, 3) ? (n[3] || u.error(n[0]), n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * ("even" === n[3] || "odd" === n[3])), n[5] = +(n[7] + n[8] || "odd" === n[3])) : n[3] && u.error(n[0]), n
					},
					PSEUDO: function (n) {
						var i, t = !n[6] && n[2];
						return vt.CHILD.test(n[0]) ? null : (n[3] ? n[2] = n[4] || n[5] || "" : t && er.test(t) && (i = ft(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (n[0] = n[0].slice(0, i), n[2] = t.slice(0, i)), n.slice(0, 3))
					}
				},
				filter: {
					TAG: function (n) {
						var t = n.replace(y, p).toLowerCase();
						return "*" === n ? function () {
							return !0
						} : function (n) {
							return n.nodeName && n.nodeName.toLowerCase() === t
						}
					},
					CLASS: function (n) {
						var t = hi[n + " "];
						return t || (t = new RegExp("(^|" + r + ")" + n + "(" + r + "|$)")) && hi(n, function (n) {
							return t.test("string" == typeof n.className && n.className || "undefined" != typeof n.getAttribute && n.getAttribute("class") || "")
						})
					},
					ATTR: function (n, t, i) {
						return function (r) {
							var f = u.attr(r, n);
							return null == f ? "!=" === t : !t || (f += "", "=" === t ? f === i : "!=" === t ? f !== i : "^=" === t ? i && 0 === f.indexOf(i) : "*=" === t ? i && f.indexOf(i) > -1 : "$=" === t ? i && f.slice(-i.length) === i : "~=" === t ? (" " + f.replace(ir, " ") + " ").indexOf(i) > -1 : "|=" === t && (f === i || f.slice(0, i.length + 1) === i + "-"))
						}
					},
					CHILD: function (n, t, i, r, u) {
						var s = "nth" !== n.slice(0, 3),
							o = "last" !== n.slice(-4),
							f = "of-type" === t;
						return 1 === r && 0 === u ? function (n) {
							return !!n.parentNode
						} : function (t, i, h) {
							var p, w, y, c, a, b, k = s !== o ? "nextSibling" : "previousSibling",
								d = t.parentNode,
								nt = f && t.nodeName.toLowerCase(),
								g = !h && !f,
								l = !1;
							if (d) {
								if (s) {
									while (k) {
										for (c = t; c = c[k];)
											if (f ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType) return !1;
										b = k = "only" === n && !b && "nextSibling"
									}
									return !0
								}
								if (b = [o ? d.firstChild : d.lastChild], o && g) {
									for (c = d, y = c[e] || (c[e] = {}), w = y[c.uniqueID] || (y[c.uniqueID] = {}), p = w[n] || [], a = p[0] === v && p[1], l = a && p[2], c = a && d.childNodes[a]; c = ++a && c && c[k] || (l = a = 0) || b.pop();)
										if (1 === c.nodeType && ++l && c === t) {
											w[n] = [v, a, l];
											break
										}
								} else if (g && (c = t, y = c[e] || (c[e] = {}), w = y[c.uniqueID] || (y[c.uniqueID] = {}), p = w[n] || [], a = p[0] === v && p[1], l = a), l === !1)
									while (c = ++a && c && c[k] || (l = a = 0) || b.pop())
										if ((f ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType) && ++l && (g && (y = c[e] || (c[e] = {}), w = y[c.uniqueID] || (y[c.uniqueID] = {}), w[n] = [v, l]), c === t)) break;
								return l -= u, l === r || l % r == 0 && l / r >= 0
							}
						}
					},
					PSEUDO: function (n, i) {
						var f, r = t.pseudos[n] || t.setFilters[n.toLowerCase()] || u.error("unsupported pseudo: " + n);
						return r[e] ? r(i) : r.length > 1 ? (f = [n, n, "", i], t.setFilters.hasOwnProperty(n.toLowerCase()) ? l(function (n, t) {
							for (var u, f = r(n, i), e = f.length; e--;) u = nt(n, f[e]), n[u] = !(t[u] = f[e])
						}) : function (n) {
							return r(n, 0, f)
						}) : r
					}
				},
				pseudos: {
					not: l(function (n) {
						var t = [],
							r = [],
							i = bt(n.replace(at, "$1"));
						return i[e] ? l(function (n, t, r, u) {
							for (var e, o = i(n, null, u, []), f = n.length; f--;)(e = o[f]) && (n[f] = !(t[f] = e))
						}) : function (n, u, f) {
							return t[0] = n, i(t, null, f, r), t[0] = null, !r.pop()
						}
					}),
					has: l(function (n) {
						return function (t) {
							return u(n, t).length > 0
						}
					}),
					contains: l(function (n) {
						return n = n.replace(y, p),
							function (t) {
								return (t.textContent || t.innerText || st(t)).indexOf(n) > -1
							}
					}),
					lang: l(function (n) {
						return or.test(n || "") || u.error("unsupported lang: " + n), n = n.replace(y, p).toLowerCase(),
							function (t) {
								var i;
								do
									if (i = c ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === n || 0 === i.indexOf(n + "-");
								while ((t = t.parentNode) && 1 === t.nodeType);
								return !1
							}
					}),
					target: function (t) {
						var i = n.location && n.location.hash;
						return i && i.slice(1) === t.id
					},
					root: function (n) {
						return n === s
					},
					focus: function (n) {
						return n === i.activeElement && (!i.hasFocus || i.hasFocus()) && !!(n.type || n.href || ~n.tabIndex)
					},
					enabled: bi(!1),
					disabled: bi(!0),
					checked: function (n) {
						var t = n.nodeName.toLowerCase();
						return "input" === t && !!n.checked || "option" === t && !!n.selected
					},
					selected: function (n) {
						return n.parentNode && n.parentNode.selectedIndex, n.selected === !0
					},
					empty: function (n) {
						for (n = n.firstChild; n; n = n.nextSibling)
							if (n.nodeType < 6) return !1;
						return !0
					},
					parent: function (n) {
						return !t.pseudos.empty(n)
					},
					header: function (n) {
						return hr.test(n.nodeName)
					},
					input: function (n) {
						return sr.test(n.nodeName)
					},
					button: function (n) {
						var t = n.nodeName.toLowerCase();
						return "input" === t && "button" === n.type || "button" === t
					},
					text: function (n) {
						var t;
						return "input" === n.nodeName.toLowerCase() && "text" === n.type && (null == (t = n.getAttribute("type")) || "text" === t.toLowerCase())
					},
					first: it(function () {
						return [0]
					}),
					last: it(function (n, t) {
						return [t - 1]
					}),
					eq: it(function (n, t, i) {
						return [i < 0 ? i + t : i]
					}),
					even: it(function (n, t) {
						for (var i = 0; i < t; i += 2) n.push(i);
						return n
					}),
					odd: it(function (n, t) {
						for (var i = 1; i < t; i += 2) n.push(i);
						return n
					}),
					lt: it(function (n, t, i) {
						for (var r = i < 0 ? i + t : i; --r >= 0;) n.push(r);
						return n
					}),
					gt: it(function (n, t, i) {
						for (var r = i < 0 ? i + t : i; ++r < t;) n.push(r);
						return n
					})
				}
			};
			t.pseudos.nth = t.pseudos.eq;
			for (rt in {
					radio: !0,
					checkbox: !0,
					file: !0,
					password: !0,
					image: !0
				}) t.pseudos[rt] = ar(rt);
			for (rt in {
					submit: !0,
					reset: !0
				}) t.pseudos[rt] = vr(rt);
			return ki.prototype = t.filters = t.pseudos, t.setFilters = new ki, ft = u.tokenize = function (n, i) {
				var e, f, s, o, r, h, c, l = ci[n + " "];
				if (l) return i ? 0 : l.slice(0);
				for (r = n, h = [], c = t.preFilter; r;) {
					(!e || (f = rr.exec(r))) && (f && (r = r.slice(f[0].length) || r), h.push(s = []));
					e = !1;
					(f = ur.exec(r)) && (e = f.shift(), s.push({
						value: e,
						type: f[0].replace(at, " ")
					}), r = r.slice(e.length));
					for (o in t.filter)(f = vt[o].exec(r)) && (!c[o] || (f = c[o](f))) && (e = f.shift(), s.push({
						value: e,
						type: o,
						matches: f
					}), r = r.slice(e.length));
					if (!e) break
				}
				return i ? r.length : r ? u.error(n) : ci(n, h).slice(0)
			}, bt = u.compile = function (n, t) {
				var r, u = [],
					f = [],
					i = lt[n + " "];
				if (!i) {
					for (t || (t = ft(n)), r = t.length; r--;) i = ei(t[r]), i[e] ? u.push(i) : f.push(i);
					i = lt(n, pr(f, u));
					i.selector = n
				}
				return i
			}, si = u.select = function (n, i, r, u) {
				var s, e, o, a, v, l = "function" == typeof n && n,
					h = !u && ft(n = l.selector || n);
				if (r = r || [], 1 === h.length) {
					if (e = h[0] = h[0].slice(0), e.length > 2 && "ID" === (o = e[0]).type && f.getById && 9 === i.nodeType && c && t.relative[e[1].type]) {
						if (i = (t.find.ID(o.matches[0].replace(y, p), i) || [])[0], !i) return r;
						l && (i = i.parentNode);
						n = n.slice(e.shift().value.length)
					}
					for (s = vt.needsContext.test(n) ? 0 : e.length; s--;) {
						if (o = e[s], t.relative[a = o.type]) break;
						if ((v = t.find[a]) && (u = v(o.matches[0].replace(y, p), ni.test(e[0].type) && ri(i.parentNode) || i))) {
							if (e.splice(s, 1), n = u.length && yt(e), !n) return k.apply(r, u), r;
							break
						}
					}
				}
				return (l || bt(n, h))(u, i, !c, r, !i || ni.test(n) && ri(i.parentNode) || i), r
			}, f.sortStable = e.split("").sort(kt).join("") === e, f.detectDuplicates = !!ut, b(), f.sortDetached = a(function (n) {
				return 1 & n.compareDocumentPosition(i.createElement("fieldset"))
			}), a(function (n) {
				return n.innerHTML = "<a href='#'><\/a>", "#" === n.firstChild.getAttribute("href")
			}) || ii("type|href|height|width", function (n, t, i) {
				if (!i) return n.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
			}), f.attributes && a(function (n) {
				return n.innerHTML = "<input/>", n.firstChild.setAttribute("value", ""), "" === n.firstChild.getAttribute("value")
			}) || ii("value", function (n, t, i) {
				if (!i && "input" === n.nodeName.toLowerCase()) return n.defaultValue
			}), a(function (n) {
				return null == n.getAttribute("disabled")
			}) || ii(dt, function (n, t, i) {
				var r;
				if (!i) return n[t] === !0 ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null
			}), u
		}(n);
		i.find = v;
		i.expr = v.selectors;
		i.expr[":"] = i.expr.pseudos;
		i.uniqueSort = i.unique = v.uniqueSort;
		i.text = v.getText;
		i.isXMLDoc = v.isXML;
		i.contains = v.contains;
		i.escapeSelector = v.escape;
		var k = function (n, t, r) {
				for (var u = [], f = void 0 !== r;
					(n = n[t]) && 9 !== n.nodeType;)
					if (1 === n.nodeType) {
						if (f && i(n).is(r)) break;
						u.push(n)
					}
				return u
			},
			tr = function (n, t) {
				for (var i = []; n; n = n.nextSibling) 1 === n.nodeType && n !== t && i.push(n);
				return i
			},
			ir = i.expr.match.needsContext,
			rr = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
			gf = /^.[^:#\[\.,]*$/;
		i.filter = function (n, t, r) {
			var u = t[0];
			return r && (n = ":not(" + n + ")"), 1 === t.length && 1 === u.nodeType ? i.find.matchesSelector(u, n) ? [u] : [] : i.find.matches(n, i.grep(t, function (n) {
				return 1 === n.nodeType
			}))
		};
		i.fn.extend({
			find: function (n) {
				var t, r, u = this.length,
					f = this;
				if ("string" != typeof n) return this.pushStack(i(n).filter(function () {
					for (t = 0; t < u; t++)
						if (i.contains(f[t], this)) return !0
				}));
				for (r = this.pushStack([]), t = 0; t < u; t++) i.find(n, f[t], r);
				return u > 1 ? i.uniqueSort(r) : r
			},
			filter: function (n) {
				return this.pushStack(fi(this, n || [], !1))
			},
			not: function (n) {
				return this.pushStack(fi(this, n || [], !0))
			},
			is: function (n) {
				return !!fi(this, "string" == typeof n && ir.test(n) ? i(n) : n || [], !1).length
			}
		});
		fr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
		er = i.fn.init = function (n, t, r) {
			var f, e;
			if (!n) return this;
			if (r = r || ur, "string" == typeof n) {
				if (f = "<" === n[0] && ">" === n[n.length - 1] && n.length >= 3 ? [null, n, null] : fr.exec(n), !f || !f[1] && t) return !t || t.jquery ? (t || r).find(n) : this.constructor(t).find(n);
				if (f[1]) {
					if (t = t instanceof i ? t[0] : t, i.merge(this, i.parseHTML(f[1], t && t.nodeType ? t.ownerDocument || t : u, !0)), rr.test(f[1]) && i.isPlainObject(t))
						for (f in t) i.isFunction(this[f]) ? this[f](t[f]) : this.attr(f, t[f]);
					return this
				}
				return e = u.getElementById(f[2]), e && (this[0] = e, this.length = 1), this
			}
			return n.nodeType ? (this[0] = n, this.length = 1, this) : i.isFunction(n) ? void 0 !== r.ready ? r.ready(n) : n(i) : i.makeArray(n, this)
		};
		er.prototype = i.fn;
		ur = i(u);
		or = /^(?:parents|prev(?:Until|All))/;
		sr = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
		i.fn.extend({
			has: function (n) {
				var t = i(n, this),
					r = t.length;
				return this.filter(function () {
					for (var n = 0; n < r; n++)
						if (i.contains(this, t[n])) return !0
				})
			},
			closest: function (n, t) {
				var r, f = 0,
					o = this.length,
					u = [],
					e = "string" != typeof n && i(n);
				if (!ir.test(n))
					for (; f < o; f++)
						for (r = this[f]; r && r !== t; r = r.parentNode)
							if (r.nodeType < 11 && (e ? e.index(r) > -1 : 1 === r.nodeType && i.find.matchesSelector(r, n))) {
								u.push(r);
								break
							}
				return this.pushStack(u.length > 1 ? i.uniqueSort(u) : u)
			},
			index: function (n) {
				return n ? "string" == typeof n ? lt.call(i(n), this[0]) : lt.call(this, n.jquery ? n[0] : n) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
			},
			add: function (n, t) {
				return this.pushStack(i.uniqueSort(i.merge(this.get(), i(n, t))))
			},
			addBack: function (n) {
				return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
			}
		});
		i.each({
			parent: function (n) {
				var t = n.parentNode;
				return t && 11 !== t.nodeType ? t : null
			},
			parents: function (n) {
				return k(n, "parentNode")
			},
			parentsUntil: function (n, t, i) {
				return k(n, "parentNode", i)
			},
			next: function (n) {
				return hr(n, "nextSibling")
			},
			prev: function (n) {
				return hr(n, "previousSibling")
			},
			nextAll: function (n) {
				return k(n, "nextSibling")
			},
			prevAll: function (n) {
				return k(n, "previousSibling")
			},
			nextUntil: function (n, t, i) {
				return k(n, "nextSibling", i)
			},
			prevUntil: function (n, t, i) {
				return k(n, "previousSibling", i)
			},
			siblings: function (n) {
				return tr((n.parentNode || {}).firstChild, n)
			},
			children: function (n) {
				return tr(n.firstChild)
			},
			contents: function (n) {
				return n.contentDocument || i.merge([], n.childNodes)
			}
		}, function (n, t) {
			i.fn[n] = function (r, u) {
				var f = i.map(this, t, r);
				return "Until" !== n.slice(-5) && (u = r), u && "string" == typeof u && (f = i.filter(u, f)), this.length > 1 && (sr[n] || i.uniqueSort(f), or.test(n) && f.reverse()), this.pushStack(f)
			}
		});
		h = /\S+/g;
		i.Callbacks = function (n) {
			n = "string" == typeof n ? ne(n) : i.extend({}, n);
			var f, r, h, e, t = [],
				o = [],
				u = -1,
				c = function () {
					for (e = n.once, h = f = !0; o.length; u = -1)
						for (r = o.shift(); ++u < t.length;) t[u].apply(r[0], r[1]) === !1 && n.stopOnFalse && (u = t.length, r = !1);
					n.memory || (r = !1);
					f = !1;
					e && (t = r ? [] : "")
				},
				s = {
					add: function () {
						return t && (r && !f && (u = t.length - 1, o.push(r)), function e(r) {
							i.each(r, function (r, u) {
								i.isFunction(u) ? n.unique && s.has(u) || t.push(u) : u && u.length && "string" !== i.type(u) && e(u)
							})
						}(arguments), r && !f && c()), this
					},
					remove: function () {
						return i.each(arguments, function (n, r) {
							for (var f;
								(f = i.inArray(r, t, f)) > -1;) t.splice(f, 1), f <= u && u--
						}), this
					},
					has: function (n) {
						return n ? i.inArray(n, t) > -1 : t.length > 0
					},
					empty: function () {
						return t && (t = []), this
					},
					disable: function () {
						return e = o = [], t = r = "", this
					},
					disabled: function () {
						return !t
					},
					lock: function () {
						return e = o = [], r || f || (t = r = ""), this
					},
					locked: function () {
						return !!e
					},
					fireWith: function (n, t) {
						return e || (t = t || [], t = [n, t.slice ? t.slice() : t], o.push(t), f || c()), this
					},
					fire: function () {
						return s.fireWith(this, arguments), this
					},
					fired: function () {
						return !!h
					}
				};
			return s
		};
		i.extend({
			Deferred: function (t) {
				var u = [
						["notify", "progress", i.Callbacks("memory"), i.Callbacks("memory"), 2],
						["resolve", "done", i.Callbacks("once memory"), i.Callbacks("once memory"), 0, "resolved"],
						["reject", "fail", i.Callbacks("once memory"), i.Callbacks("once memory"), 1, "rejected"]
					],
					e = "pending",
					f = {
						state: function () {
							return e
						},
						always: function () {
							return r.done(arguments).fail(arguments), this
						},
						"catch": function (n) {
							return f.then(null, n)
						},
						pipe: function () {
							var n = arguments;
							return i.Deferred(function (t) {
								i.each(u, function (u, f) {
									var e = i.isFunction(n[f[4]]) && n[f[4]];
									r[f[1]](function () {
										var n = e && e.apply(this, arguments);
										n && i.isFunction(n.promise) ? n.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[f[0] + "With"](this, e ? [n] : arguments)
									})
								});
								n = null
							}).promise()
						},
						then: function (t, r, f) {
							function o(t, r, u, f) {
								return function () {
									var s = this,
										h = arguments,
										l = function () {
											var n, c;
											if (!(t < e)) {
												if (n = u.apply(s, h), n === r.promise()) throw new TypeError("Thenable self-resolution");
												c = n && ("object" == typeof n || "function" == typeof n) && n.then;
												i.isFunction(c) ? f ? c.call(n, o(e, r, d, f), o(e, r, yt, f)) : (e++, c.call(n, o(e, r, d, f), o(e, r, yt, f), o(e, r, d, r.notifyWith))) : (u !== d && (s = void 0, h = [n]), (f || r.resolveWith)(s, h))
											}
										},
										c = f ? l : function () {
											try {
												l()
											} catch (n) {
												i.Deferred.exceptionHook && i.Deferred.exceptionHook(n, c.stackTrace);
												t + 1 >= e && (u !== yt && (s = void 0, h = [n]), r.rejectWith(s, h))
											}
										};
									t ? c() : (i.Deferred.getStackHook && (c.stackTrace = i.Deferred.getStackHook()), n.setTimeout(c))
								}
							}
							var e = 0;
							return i.Deferred(function (n) {
								u[0][3].add(o(0, n, i.isFunction(f) ? f : d, n.notifyWith));
								u[1][3].add(o(0, n, i.isFunction(t) ? t : d));
								u[2][3].add(o(0, n, i.isFunction(r) ? r : yt))
							}).promise()
						},
						promise: function (n) {
							return null != n ? i.extend(n, f) : f
						}
					},
					r = {};
				return i.each(u, function (n, t) {
					var i = t[2],
						o = t[5];
					f[t[1]] = i.add;
					o && i.add(function () {
						e = o
					}, u[3 - n][2].disable, u[0][2].lock);
					i.add(t[3].fire);
					r[t[0]] = function () {
						return r[t[0] + "With"](this === r ? void 0 : this, arguments), this
					};
					r[t[0] + "With"] = i.fireWith
				}), f.promise(r), t && t.call(r, r), r
			},
			when: function (n) {
				var f = arguments.length,
					t = f,
					e = Array(t),
					u = p.call(arguments),
					r = i.Deferred(),
					o = function (n) {
						return function (t) {
							e[n] = this;
							u[n] = arguments.length > 1 ? p.call(arguments) : t;
							--f || r.resolveWith(e, u)
						}
					};
				if (f <= 1 && (cr(n, r.done(o(t)).resolve, r.reject), "pending" === r.state() || i.isFunction(u[t] && u[t].then))) return r.then();
				while (t--) cr(u[t], o(t), r.reject);
				return r.promise()
			}
		});
		lr = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
		i.Deferred.exceptionHook = function (t, i) {
			n.console && n.console.warn && t && lr.test(t.name) && n.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i)
		};
		i.readyException = function (t) {
			n.setTimeout(function () {
				throw t;
			})
		};
		pt = i.Deferred();
		i.fn.ready = function (n) {
			return pt.then(n)["catch"](function (n) {
				i.readyException(n)
			}), this
		};
		i.extend({
			isReady: !1,
			readyWait: 1,
			holdReady: function (n) {
				n ? i.readyWait++ : i.ready(!0)
			},
			ready: function (n) {
				(n === !0 ? --i.readyWait : i.isReady) || (i.isReady = !0, n !== !0 && --i.readyWait > 0 || pt.resolveWith(u, [i]))
			}
		});
		i.ready.then = pt.then;
		"complete" === u.readyState || "loading" !== u.readyState && !u.documentElement.doScroll ? n.setTimeout(i.ready) : (u.addEventListener("DOMContentLoaded", wt), n.addEventListener("load", wt));
		a = function (n, t, r, u, f, e, o) {
			var s = 0,
				c = n.length,
				h = null == r;
			if ("object" === i.type(r)) {
				f = !0;
				for (s in r) a(n, t, s, r[s], !0, e, o)
			} else if (void 0 !== u && (f = !0, i.isFunction(u) || (o = !0), h && (o ? (t.call(n, u), t = null) : (h = t, t = function (n, t, r) {
					return h.call(i(n), r)
				})), t))
				for (; s < c; s++) t(n[s], r, o ? u : u.call(n[s], s, t(n[s], r)));
			return f ? n : h ? t.call(n) : c ? t(n[0], r) : e
		};
		et = function (n) {
			return 1 === n.nodeType || 9 === n.nodeType || !+n.nodeType
		};
		ot.uid = 1;
		ot.prototype = {
			cache: function (n) {
				var t = n[this.expando];
				return t || (t = {}, et(n) && (n.nodeType ? n[this.expando] = t : Object.defineProperty(n, this.expando, {
					value: t,
					configurable: !0
				}))), t
			},
			set: function (n, t, r) {
				var u, f = this.cache(n);
				if ("string" == typeof t) f[i.camelCase(t)] = r;
				else
					for (u in t) f[i.camelCase(u)] = t[u];
				return f
			},
			get: function (n, t) {
				return void 0 === t ? this.cache(n) : n[this.expando] && n[this.expando][i.camelCase(t)]
			},
			access: function (n, t, i) {
				return void 0 === t || t && "string" == typeof t && void 0 === i ? this.get(n, t) : (this.set(n, t, i), void 0 !== i ? i : t)
			},
			remove: function (n, t) {
				var u, r = n[this.expando];
				if (void 0 !== r) {
					if (void 0 !== t)
						for (i.isArray(t) ? t = t.map(i.camelCase) : (t = i.camelCase(t), t = (t in r) ? [t] : t.match(h) || []), u = t.length; u--;) delete r[t[u]];
					(void 0 === t || i.isEmptyObject(r)) && (n.nodeType ? n[this.expando] = void 0 : delete n[this.expando])
				}
			},
			hasData: function (n) {
				var t = n[this.expando];
				return void 0 !== t && !i.isEmptyObject(t)
			}
		};
		var r = new ot,
			e = new ot,
			te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			ie = /[A-Z]/g;
		i.extend({
			hasData: function (n) {
				return e.hasData(n) || r.hasData(n)
			},
			data: function (n, t, i) {
				return e.access(n, t, i)
			},
			removeData: function (n, t) {
				e.remove(n, t)
			},
			_data: function (n, t, i) {
				return r.access(n, t, i)
			},
			_removeData: function (n, t) {
				r.remove(n, t)
			}
		});
		i.fn.extend({
			data: function (n, t) {
				var o, f, s, u = this[0],
					h = u && u.attributes;
				if (void 0 === n) {
					if (this.length && (s = e.get(u), 1 === u.nodeType && !r.get(u, "hasDataAttrs"))) {
						for (o = h.length; o--;) h[o] && (f = h[o].name, 0 === f.indexOf("data-") && (f = i.camelCase(f.slice(5)), ar(u, f, s[f])));
						r.set(u, "hasDataAttrs", !0)
					}
					return s
				}
				return "object" == typeof n ? this.each(function () {
					e.set(this, n)
				}) : a(this, function (t) {
					var i;
					if (u && void 0 === t) {
						if ((i = e.get(u, n), void 0 !== i) || (i = ar(u, n), void 0 !== i)) return i
					} else this.each(function () {
						e.set(this, n, t)
					})
				}, null, t, arguments.length > 1, null, !0)
			},
			removeData: function (n) {
				return this.each(function () {
					e.remove(this, n)
				})
			}
		});
		i.extend({
			queue: function (n, t, u) {
				var f;
				if (n) return t = (t || "fx") + "queue", f = r.get(n, t), u && (!f || i.isArray(u) ? f = r.access(n, t, i.makeArray(u)) : f.push(u)), f || []
			},
			dequeue: function (n, t) {
				t = t || "fx";
				var r = i.queue(n, t),
					e = r.length,
					u = r.shift(),
					f = i._queueHooks(n, t),
					o = function () {
						i.dequeue(n, t)
					};
				"inprogress" === u && (u = r.shift(), e--);
				u && ("fx" === t && r.unshift("inprogress"), delete f.stop, u.call(n, o, f));
				!e && f && f.empty.fire()
			},
			_queueHooks: function (n, t) {
				var u = t + "queueHooks";
				return r.get(n, u) || r.access(n, u, {
					empty: i.Callbacks("once memory").add(function () {
						r.remove(n, [t + "queue", u])
					})
				})
			}
		});
		i.fn.extend({
			queue: function (n, t) {
				var r = 2;
				return "string" != typeof n && (t = n, n = "fx", r--), arguments.length < r ? i.queue(this[0], n) : void 0 === t ? this : this.each(function () {
					var r = i.queue(this, n, t);
					i._queueHooks(this, n);
					"fx" === n && "inprogress" !== r[0] && i.dequeue(this, n)
				})
			},
			dequeue: function (n) {
				return this.each(function () {
					i.dequeue(this, n)
				})
			},
			clearQueue: function (n) {
				return this.queue(n || "fx", [])
			},
			promise: function (n, t) {
				var u, e = 1,
					o = i.Deferred(),
					f = this,
					s = this.length,
					h = function () {
						--e || o.resolveWith(f, [f])
					};
				for ("string" != typeof n && (t = n, n = void 0), n = n || "fx"; s--;) u = r.get(f[s], n + "queueHooks"), u && u.empty && (e++, u.empty.add(h));
				return h(), o.promise(t)
			}
		});
		var vr = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
			st = new RegExp("^(?:([+-])=|)(" + vr + ")([a-z%]*)$", "i"),
			w = ["Top", "Right", "Bottom", "Left"],
			bt = function (n, t) {
				return n = t || n, "none" === n.style.display || "" === n.style.display && i.contains(n.ownerDocument, n) && "none" === i.css(n, "display")
			},
			yr = function (n, t, i, r) {
				var f, u, e = {};
				for (u in t) e[u] = n.style[u], n.style[u] = t[u];
				f = i.apply(n, r || []);
				for (u in t) n.style[u] = e[u];
				return f
			};
		ei = {};
		i.fn.extend({
			show: function () {
				return g(this, !0)
			},
			hide: function () {
				return g(this)
			},
			toggle: function (n) {
				return "boolean" == typeof n ? n ? this.show() : this.hide() : this.each(function () {
					bt(this) ? i(this).show() : i(this).hide()
				})
			}
		});
		var wr = /^(?:checkbox|radio)$/i,
			br = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
			kr = /^$|\/(?:java|ecma)script/i,
			c = {
				option: [1, "<select multiple='multiple'>", "<\/select>"],
				thead: [1, "<table>", "<\/table>"],
				col: [2, "<table><colgroup>", "<\/colgroup><\/table>"],
				tr: [2, "<table><tbody>", "<\/tbody><\/table>"],
				td: [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"],
				_default: [0, "", ""]
			};
		c.optgroup = c.option;
		c.tbody = c.tfoot = c.colgroup = c.caption = c.thead;
		c.th = c.td;
		dr = /<|&#?\w+;/;
		! function () {
			var i = u.createDocumentFragment(),
				n = i.appendChild(u.createElement("div")),
				t = u.createElement("input");
			t.setAttribute("type", "radio");
			t.setAttribute("checked", "checked");
			t.setAttribute("name", "t");
			n.appendChild(t);
			f.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked;
			n.innerHTML = "<textarea>x<\/textarea>";
			f.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue
		}();
		var kt = u.documentElement,
			ue = /^key/,
			fe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
			nu = /^([^.]*)(?:\.(.+)|)/;
		i.event = {
			global: {},
			add: function (n, t, u, f, e) {
				var v, y, w, p, b, c, s, l, o, k, d, a = r.get(n);
				if (a)
					for (u.handler && (v = u, u = v.handler, e = v.selector), e && i.find.matchesSelector(kt, e), u.guid || (u.guid = i.guid++), (p = a.events) || (p = a.events = {}), (y = a.handle) || (y = a.handle = function (t) {
							if ("undefined" != typeof i && i.event.triggered !== t.type) return i.event.dispatch.apply(n, arguments)
						}), t = (t || "").match(h) || [""], b = t.length; b--;) w = nu.exec(t[b]) || [], o = d = w[1], k = (w[2] || "").split(".").sort(), o && (s = i.event.special[o] || {}, o = (e ? s.delegateType : s.bindType) || o, s = i.event.special[o] || {}, c = i.extend({
						type: o,
						origType: d,
						data: f,
						handler: u,
						guid: u.guid,
						selector: e,
						needsContext: e && i.expr.match.needsContext.test(e),
						namespace: k.join(".")
					}, v), (l = p[o]) || (l = p[o] = [], l.delegateCount = 0, s.setup && s.setup.call(n, f, k, y) !== !1 || n.addEventListener && n.addEventListener(o, y)), s.add && (s.add.call(n, c), c.handler.guid || (c.handler.guid = u.guid)), e ? l.splice(l.delegateCount++, 0, c) : l.push(c), i.event.global[o] = !0)
			},
			remove: function (n, t, u, f, e) {
				var y, k, c, v, p, s, l, a, o, b, d, w = r.hasData(n) && r.get(n);
				if (w && (v = w.events)) {
					for (t = (t || "").match(h) || [""], p = t.length; p--;)
						if (c = nu.exec(t[p]) || [], o = d = c[1], b = (c[2] || "").split(".").sort(), o) {
							for (l = i.event.special[o] || {}, o = (f ? l.delegateType : l.bindType) || o, a = v[o] || [], c = c[2] && new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)"), k = y = a.length; y--;) s = a[y], !e && d !== s.origType || u && u.guid !== s.guid || c && !c.test(s.namespace) || f && f !== s.selector && ("**" !== f || !s.selector) || (a.splice(y, 1), s.selector && a.delegateCount--, l.remove && l.remove.call(n, s));
							k && !a.length && (l.teardown && l.teardown.call(n, b, w.handle) !== !1 || i.removeEvent(n, o, w.handle), delete v[o])
						} else
							for (o in v) i.event.remove(n, o + t[p], u, f, !0);
					i.isEmptyObject(v) && r.remove(n, "handle events")
				}
			},
			dispatch: function (n) {
				var t = i.event.fix(n),
					u, c, s, e, f, l, h = new Array(arguments.length),
					a = (r.get(this, "events") || {})[t.type] || [],
					o = i.event.special[t.type] || {};
				for (h[0] = t, u = 1; u < arguments.length; u++) h[u] = arguments[u];
				if (t.delegateTarget = this, !o.preDispatch || o.preDispatch.call(this, t) !== !1) {
					for (l = i.event.handlers.call(this, t, a), u = 0;
						(e = l[u++]) && !t.isPropagationStopped();)
						for (t.currentTarget = e.elem, c = 0;
							(f = e.handlers[c++]) && !t.isImmediatePropagationStopped();) t.rnamespace && !t.rnamespace.test(f.namespace) || (t.handleObj = f, t.data = f.data, s = ((i.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== s && (t.result = s) === !1 && (t.preventDefault(), t.stopPropagation()));
					return o.postDispatch && o.postDispatch.call(this, t), t.result
				}
			},
			handlers: function (n, t) {
				var e, u, f, o, h = [],
					s = t.delegateCount,
					r = n.target;
				if (s && r.nodeType && ("click" !== n.type || isNaN(n.button) || n.button < 1))
					for (; r !== this; r = r.parentNode || this)
						if (1 === r.nodeType && (r.disabled !== !0 || "click" !== n.type)) {
							for (u = [], e = 0; e < s; e++) o = t[e], f = o.selector + " ", void 0 === u[f] && (u[f] = o.needsContext ? i(f, this).index(r) > -1 : i.find(f, this, null, [r]).length), u[f] && u.push(o);
							u.length && h.push({
								elem: r,
								handlers: u
							})
						}
				return s < t.length && h.push({
					elem: this,
					handlers: t.slice(s)
				}), h
			},
			addProp: function (n, t) {
				Object.defineProperty(i.Event.prototype, n, {
					enumerable: !0,
					configurable: !0,
					get: i.isFunction(t) ? function () {
						if (this.originalEvent) return t(this.originalEvent)
					} : function () {
						if (this.originalEvent) return this.originalEvent[n]
					},
					set: function (t) {
						Object.defineProperty(this, n, {
							enumerable: !0,
							configurable: !0,
							writable: !0,
							value: t
						})
					}
				})
			},
			fix: function (n) {
				return n[i.expando] ? n : new i.Event(n)
			},
			special: {
				load: {
					noBubble: !0
				},
				focus: {
					trigger: function () {
						if (this !== tu() && this.focus) return this.focus(), !1
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function () {
						if (this === tu() && this.blur) return this.blur(), !1
					},
					delegateType: "focusout"
				},
				click: {
					trigger: function () {
						if ("checkbox" === this.type && this.click && i.nodeName(this, "input")) return this.click(), !1
					},
					_default: function (n) {
						return i.nodeName(n.target, "a")
					}
				},
				beforeunload: {
					postDispatch: function (n) {
						void 0 !== n.result && n.originalEvent && (n.originalEvent.returnValue = n.result)
					}
				}
			}
		};
		i.removeEvent = function (n, t, i) {
			n.removeEventListener && n.removeEventListener(t, i)
		};
		i.Event = function (n, t) {
			return this instanceof i.Event ? (n && n.type ? (this.originalEvent = n, this.type = n.type, this.isDefaultPrevented = n.defaultPrevented || void 0 === n.defaultPrevented && n.returnValue === !1 ? dt : nt, this.target = n.target && 3 === n.target.nodeType ? n.target.parentNode : n.target, this.currentTarget = n.currentTarget, this.relatedTarget = n.relatedTarget) : this.type = n, t && i.extend(this, t), this.timeStamp = n && n.timeStamp || i.now(), void(this[i.expando] = !0)) : new i.Event(n, t)
		};
		i.Event.prototype = {
			constructor: i.Event,
			isDefaultPrevented: nt,
			isPropagationStopped: nt,
			isImmediatePropagationStopped: nt,
			isSimulated: !1,
			preventDefault: function () {
				var n = this.originalEvent;
				this.isDefaultPrevented = dt;
				n && !this.isSimulated && n.preventDefault()
			},
			stopPropagation: function () {
				var n = this.originalEvent;
				this.isPropagationStopped = dt;
				n && !this.isSimulated && n.stopPropagation()
			},
			stopImmediatePropagation: function () {
				var n = this.originalEvent;
				this.isImmediatePropagationStopped = dt;
				n && !this.isSimulated && n.stopImmediatePropagation();
				this.stopPropagation()
			}
		};
		i.each({
			altKey: !0,
			bubbles: !0,
			cancelable: !0,
			changedTouches: !0,
			ctrlKey: !0,
			detail: !0,
			eventPhase: !0,
			metaKey: !0,
			pageX: !0,
			pageY: !0,
			shiftKey: !0,
			view: !0,
			char: !0,
			charCode: !0,
			key: !0,
			keyCode: !0,
			button: !0,
			buttons: !0,
			clientX: !0,
			clientY: !0,
			offsetX: !0,
			offsetY: !0,
			pointerId: !0,
			pointerType: !0,
			screenX: !0,
			screenY: !0,
			targetTouches: !0,
			toElement: !0,
			touches: !0,
			which: function (n) {
				var t = n.button;
				return null == n.which && ue.test(n.type) ? null != n.charCode ? n.charCode : n.keyCode : !n.which && void 0 !== t && fe.test(n.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : n.which
			}
		}, i.event.addProp);
		i.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			pointerenter: "pointerover",
			pointerleave: "pointerout"
		}, function (n, t) {
			i.event.special[n] = {
				delegateType: t,
				bindType: t,
				handle: function (n) {
					var u, f = this,
						r = n.relatedTarget,
						e = n.handleObj;
					return r && (r === f || i.contains(f, r)) || (n.type = e.origType, u = e.handler.apply(this, arguments), n.type = t), u
				}
			}
		});
		i.fn.extend({
			on: function (n, t, i, r) {
				return si(this, n, t, i, r)
			},
			one: function (n, t, i, r) {
				return si(this, n, t, i, r, 1)
			},
			off: function (n, t, r) {
				var u, f;
				if (n && n.preventDefault && n.handleObj) return u = n.handleObj, i(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler), this;
				if ("object" == typeof n) {
					for (f in n) this.off(f, t, n[f]);
					return this
				}
				return t !== !1 && "function" != typeof t || (r = t, t = void 0), r === !1 && (r = nt), this.each(function () {
					i.event.remove(this, n, r, t)
				})
			}
		});
		var ee = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
			oe = /<script|<style|<link/i,
			se = /checked\s*(?:[^=]|=\s*.checked.)/i,
			he = /^true\/(.*)/,
			ce = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
		i.extend({
			htmlPrefilter: function (n) {
				return n.replace(ee, "<$1><\/$2>")
			},
			clone: function (n, t, r) {
				var u, c, s, e, h = n.cloneNode(!0),
					l = i.contains(n.ownerDocument, n);
				if (!(f.noCloneChecked || 1 !== n.nodeType && 11 !== n.nodeType || i.isXMLDoc(n)))
					for (e = o(h), s = o(n), u = 0, c = s.length; u < c; u++) ve(s[u], e[u]);
				if (t)
					if (r)
						for (s = s || o(n), e = e || o(h), u = 0, c = s.length; u < c; u++) ru(s[u], e[u]);
					else ru(n, h);
				return e = o(h, "script"), e.length > 0 && oi(e, !l && o(n, "script")), h
			},
			cleanData: function (n) {
				for (var u, t, f, s = i.event.special, o = 0; void 0 !== (t = n[o]); o++)
					if (et(t)) {
						if (u = t[r.expando]) {
							if (u.events)
								for (f in u.events) s[f] ? i.event.remove(t, f) : i.removeEvent(t, f, u.handle);
							t[r.expando] = void 0
						}
						t[e.expando] && (t[e.expando] = void 0)
					}
			}
		});
		i.fn.extend({
			detach: function (n) {
				return uu(this, n, !0)
			},
			remove: function (n) {
				return uu(this, n)
			},
			text: function (n) {
				return a(this, function (n) {
					return void 0 === n ? i.text(this) : this.empty().each(function () {
						1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = n)
					})
				}, null, n, arguments.length)
			},
			append: function () {
				return tt(this, arguments, function (n) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var t = iu(this, n);
						t.appendChild(n)
					}
				})
			},
			prepend: function () {
				return tt(this, arguments, function (n) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var t = iu(this, n);
						t.insertBefore(n, t.firstChild)
					}
				})
			},
			before: function () {
				return tt(this, arguments, function (n) {
					this.parentNode && this.parentNode.insertBefore(n, this)
				})
			},
			after: function () {
				return tt(this, arguments, function (n) {
					this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
				})
			},
			empty: function () {
				for (var n, t = 0; null != (n = this[t]); t++) 1 === n.nodeType && (i.cleanData(o(n, !1)), n.textContent = "");
				return this
			},
			clone: function (n, t) {
				return n = null != n && n, t = null == t ? n : t, this.map(function () {
					return i.clone(this, n, t)
				})
			},
			html: function (n) {
				return a(this, function (n) {
					var t = this[0] || {},
						r = 0,
						u = this.length;
					if (void 0 === n && 1 === t.nodeType) return t.innerHTML;
					if ("string" == typeof n && !oe.test(n) && !c[(br.exec(n) || ["", ""])[1].toLowerCase()]) {
						n = i.htmlPrefilter(n);
						try {
							for (; r < u; r++) t = this[r] || {}, 1 === t.nodeType && (i.cleanData(o(t, !1)), t.innerHTML = n);
							t = 0
						} catch (f) {}
					}
					t && this.empty().append(n)
				}, null, n, arguments.length)
			},
			replaceWith: function () {
				var n = [];
				return tt(this, arguments, function (t) {
					var r = this.parentNode;
					i.inArray(this, n) < 0 && (i.cleanData(o(this)), r && r.replaceChild(t, this))
				}, n)
			}
		});
		i.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function (n, t) {
			i.fn[n] = function (n) {
				for (var u, f = [], e = i(n), o = e.length - 1, r = 0; r <= o; r++) u = r === o ? this : this.clone(!0), i(e[r])[t](u), ri.apply(f, u.get());
				return this.pushStack(f)
			}
		});
		var fu = /^margin/,
			hi = new RegExp("^(" + vr + ")(?!px)[a-z%]+$", "i"),
			gt = function (t) {
				var i = t.ownerDocument.defaultView;
				return i && i.opener || (i = n), i.getComputedStyle(t)
			};
		! function () {
			function r() {
				if (t) {
					t.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%";
					t.innerHTML = "";
					kt.appendChild(e);
					var i = n.getComputedStyle(t);
					o = "1%" !== i.top;
					c = "2px" === i.marginLeft;
					s = "4px" === i.width;
					t.style.marginRight = "50%";
					h = "4px" === i.marginRight;
					kt.removeChild(e);
					t = null
				}
			}
			var o, s, h, c, e = u.createElement("div"),
				t = u.createElement("div");
			t.style && (t.style.backgroundClip = "content-box", t.cloneNode(!0).style.backgroundClip = "", f.clearCloneStyle = "content-box" === t.style.backgroundClip, e.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", e.appendChild(t), i.extend(f, {
				pixelPosition: function () {
					return r(), o
				},
				boxSizingReliable: function () {
					return r(), s
				},
				pixelMarginRight: function () {
					return r(), h
				},
				reliableMarginLeft: function () {
					return r(), c
				}
			}))
		}();
		var ye = /^(none|table(?!-c[ea]).+)/,
			pe = {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			},
			ou = {
				letterSpacing: "0",
				fontWeight: "400"
			},
			su = ["Webkit", "Moz", "ms"],
			hu = u.createElement("div").style;
		i.extend({
			cssHooks: {
				opacity: {
					get: function (n, t) {
						if (t) {
							var i = ht(n, "opacity");
							return "" === i ? "1" : i
						}
					}
				}
			},
			cssNumber: {
				animationIterationCount: !0,
				columnCount: !0,
				fillOpacity: !0,
				flexGrow: !0,
				flexShrink: !0,
				fontWeight: !0,
				lineHeight: !0,
				opacity: !0,
				order: !0,
				orphans: !0,
				widows: !0,
				zIndex: !0,
				zoom: !0
			},
			cssProps: {
				float: "cssFloat"
			},
			style: function (n, t, r, u) {
				if (n && 3 !== n.nodeType && 8 !== n.nodeType && n.style) {
					var e, h, o, s = i.camelCase(t),
						c = n.style;
					return t = i.cssProps[s] || (i.cssProps[s] = cu(s) || s), o = i.cssHooks[t] || i.cssHooks[s], void 0 === r ? o && "get" in o && void 0 !== (e = o.get(n, !1, u)) ? e : c[t] : (h = typeof r, "string" === h && (e = st.exec(r)) && e[1] && (r = pr(n, t, e), h = "number"), null != r && r === r && ("number" === h && (r += e && e[3] || (i.cssNumber[s] ? "" : "px")), f.clearCloneStyle || "" !== r || 0 !== t.indexOf("background") || (c[t] = "inherit"), o && "set" in o && void 0 === (r = o.set(n, r, u)) || (c[t] = r)), void 0)
				}
			},
			css: function (n, t, r, u) {
				var f, s, o, e = i.camelCase(t);
				return t = i.cssProps[e] || (i.cssProps[e] = cu(e) || e), o = i.cssHooks[t] || i.cssHooks[e], o && "get" in o && (f = o.get(n, !0, r)), void 0 === f && (f = ht(n, t, u)), "normal" === f && t in ou && (f = ou[t]), "" === r || r ? (s = parseFloat(f), r === !0 || isFinite(s) ? s || 0 : f) : f
			}
		});
		i.each(["height", "width"], function (n, t) {
			i.cssHooks[t] = {
				get: function (n, r, u) {
					if (r) return !ye.test(i.css(n, "display")) || n.getClientRects().length && n.getBoundingClientRect().width ? vu(n, t, u) : yr(n, pe, function () {
						return vu(n, t, u)
					})
				},
				set: function (n, r, u) {
					var f, e = u && gt(n),
						o = u && au(n, t, u, "border-box" === i.css(n, "boxSizing", !1, e), e);
					return o && (f = st.exec(r)) && "px" !== (f[3] || "px") && (n.style[t] = r, r = i.css(n, t)), lu(n, r, o)
				}
			}
		});
		i.cssHooks.marginLeft = eu(f.reliableMarginLeft, function (n, t) {
			if (t) return (parseFloat(ht(n, "marginLeft")) || n.getBoundingClientRect().left - yr(n, {
				marginLeft: 0
			}, function () {
				return n.getBoundingClientRect().left
			})) + "px"
		});
		i.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function (n, t) {
			i.cssHooks[n + t] = {
				expand: function (i) {
					for (var r = 0, f = {}, u = "string" == typeof i ? i.split(" ") : [i]; r < 4; r++) f[n + w[r] + t] = u[r] || u[r - 2] || u[0];
					return f
				}
			};
			fu.test(n) || (i.cssHooks[n + t].set = lu)
		});
		i.fn.extend({
			css: function (n, t) {
				return a(this, function (n, t, r) {
					var f, e, o = {},
						u = 0;
					if (i.isArray(t)) {
						for (f = gt(n), e = t.length; u < e; u++) o[t[u]] = i.css(n, t[u], !1, f);
						return o
					}
					return void 0 !== r ? i.style(n, t, r) : i.css(n, t)
				}, n, t, arguments.length > 1)
			}
		});
		i.Tween = s;
		s.prototype = {
			constructor: s,
			init: function (n, t, r, u, f, e) {
				this.elem = n;
				this.prop = r;
				this.easing = f || i.easing._default;
				this.options = t;
				this.start = this.now = this.cur();
				this.end = u;
				this.unit = e || (i.cssNumber[r] ? "" : "px")
			},
			cur: function () {
				var n = s.propHooks[this.prop];
				return n && n.get ? n.get(this) : s.propHooks._default.get(this)
			},
			run: function (n) {
				var t, r = s.propHooks[this.prop];
				return this.pos = this.options.duration ? t = i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : t = n, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), r && r.set ? r.set(this) : s.propHooks._default.set(this), this
			}
		};
		s.prototype.init.prototype = s.prototype;
		s.propHooks = {
			_default: {
				get: function (n) {
					var t;
					return 1 !== n.elem.nodeType || null != n.elem[n.prop] && null == n.elem.style[n.prop] ? n.elem[n.prop] : (t = i.css(n.elem, n.prop, ""), t && "auto" !== t ? t : 0)
				},
				set: function (n) {
					i.fx.step[n.prop] ? i.fx.step[n.prop](n) : 1 !== n.elem.nodeType || null == n.elem.style[i.cssProps[n.prop]] && !i.cssHooks[n.prop] ? n.elem[n.prop] = n.now : i.style(n.elem, n.prop, n.now + n.unit)
				}
			}
		};
		s.propHooks.scrollTop = s.propHooks.scrollLeft = {
			set: function (n) {
				n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
			}
		};
		i.easing = {
			linear: function (n) {
				return n
			},
			swing: function (n) {
				return .5 - Math.cos(n * Math.PI) / 2
			},
			_default: "swing"
		};
		i.fx = s.prototype.init;
		i.fx.step = {};
		yu = /^(?:toggle|show|hide)$/;
		pu = /queueHooks$/;
		i.Animation = i.extend(l, {
			tweeners: {
				"*": [function (n, t) {
					var i = this.createTween(n, t);
					return pr(i.elem, n, st.exec(t), i), i
				}]
			},
			tweener: function (n, t) {
				i.isFunction(n) ? (t = n, n = ["*"]) : n = n.match(h);
				for (var r, u = 0, f = n.length; u < f; u++) r = n[u], l.tweeners[r] = l.tweeners[r] || [], l.tweeners[r].unshift(t)
			},
			prefilters: [we],
			prefilter: function (n, t) {
				t ? l.prefilters.unshift(n) : l.prefilters.push(n)
			}
		});
		i.speed = function (n, t, r) {
			var f = n && "object" == typeof n ? i.extend({}, n) : {
				complete: r || !r && t || i.isFunction(n) && n,
				duration: n,
				easing: r && t || t && !i.isFunction(t) && t
			};
			return f.duration = i.fx.off || u.hidden ? 0 : "number" == typeof f.duration ? f.duration : f.duration in i.fx.speeds ? i.fx.speeds[f.duration] : i.fx.speeds._default, null != f.queue && f.queue !== !0 || (f.queue = "fx"), f.old = f.complete, f.complete = function () {
				i.isFunction(f.old) && f.old.call(this);
				f.queue && i.dequeue(this, f.queue)
			}, f
		};
		i.fn.extend({
			fadeTo: function (n, t, i, r) {
				return this.filter(bt).css("opacity", 0).show().end().animate({
					opacity: t
				}, n, i, r)
			},
			animate: function (n, t, u, f) {
				var s = i.isEmptyObject(n),
					o = i.speed(t, u, f),
					e = function () {
						var t = l(this, i.extend({}, n), o);
						(s || r.get(this, "finish")) && t.stop(!0)
					};
				return e.finish = e, s || o.queue === !1 ? this.each(e) : this.queue(o.queue, e)
			},
			stop: function (n, t, u) {
				var f = function (n) {
					var t = n.stop;
					delete n.stop;
					t(u)
				};
				return "string" != typeof n && (u = t, t = n, n = void 0), t && n !== !1 && this.queue(n || "fx", []), this.each(function () {
					var s = !0,
						t = null != n && n + "queueHooks",
						o = i.timers,
						e = r.get(this);
					if (t) e[t] && e[t].stop && f(e[t]);
					else
						for (t in e) e[t] && e[t].stop && pu.test(t) && f(e[t]);
					for (t = o.length; t--;) o[t].elem !== this || null != n && o[t].queue !== n || (o[t].anim.stop(u), s = !1, o.splice(t, 1));
					!s && u || i.dequeue(this, n)
				})
			},
			finish: function (n) {
				return n !== !1 && (n = n || "fx"), this.each(function () {
					var t, e = r.get(this),
						u = e[n + "queue"],
						o = e[n + "queueHooks"],
						f = i.timers,
						s = u ? u.length : 0;
					for (e.finish = !0, i.queue(this, n, []), o && o.stop && o.stop.call(this, !0), t = f.length; t--;) f[t].elem === this && f[t].queue === n && (f[t].anim.stop(!0), f.splice(t, 1));
					for (t = 0; t < s; t++) u[t] && u[t].finish && u[t].finish.call(this);
					delete e.finish
				})
			}
		});
		i.each(["toggle", "show", "hide"], function (n, t) {
			var r = i.fn[t];
			i.fn[t] = function (n, i, u) {
				return null == n || "boolean" == typeof n ? r.apply(this, arguments) : this.animate(ni(t, !0), n, i, u)
			}
		});
		i.each({
			slideDown: ni("show"),
			slideUp: ni("hide"),
			slideToggle: ni("toggle"),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		}, function (n, t) {
			i.fn[n] = function (n, i, r) {
				return this.animate(t, n, i, r)
			}
		});
		i.timers = [];
		i.fx.tick = function () {
			var r, n = 0,
				t = i.timers;
			for (it = i.now(); n < t.length; n++) r = t[n], r() || t[n] !== r || t.splice(n--, 1);
			t.length || i.fx.stop();
			it = void 0
		};
		i.fx.timer = function (n) {
			i.timers.push(n);
			n() ? i.fx.start() : i.timers.pop()
		};
		i.fx.interval = 13;
		i.fx.start = function () {
			rt || (rt = n.requestAnimationFrame ? n.requestAnimationFrame(wu) : n.setInterval(i.fx.tick, i.fx.interval))
		};
		i.fx.stop = function () {
			n.cancelAnimationFrame ? n.cancelAnimationFrame(rt) : n.clearInterval(rt);
			rt = null
		};
		i.fx.speeds = {
			slow: 600,
			fast: 200,
			_default: 400
		};
		i.fn.delay = function (t, r) {
				return t = i.fx ? i.fx.speeds[t] || t : t, r = r || "fx", this.queue(r, function (i, r) {
					var u = n.setTimeout(i, t);
					r.stop = function () {
						n.clearTimeout(u)
					}
				})
			},
			function () {
				var n = u.createElement("input"),
					t = u.createElement("select"),
					i = t.appendChild(u.createElement("option"));
				n.type = "checkbox";
				f.checkOn = "" !== n.value;
				f.optSelected = i.selected;
				n = u.createElement("input");
				n.value = "t";
				n.type = "radio";
				f.radioValue = "t" === n.value
			}();
		ut = i.expr.attrHandle;
		i.fn.extend({
			attr: function (n, t) {
				return a(this, i.attr, n, t, arguments.length > 1)
			},
			removeAttr: function (n) {
				return this.each(function () {
					i.removeAttr(this, n)
				})
			}
		});
		i.extend({
			attr: function (n, t, r) {
				var u, f, e = n.nodeType;
				if (3 !== e && 8 !== e && 2 !== e) return "undefined" == typeof n.getAttribute ? i.prop(n, t, r) : (1 === e && i.isXMLDoc(n) || (f = i.attrHooks[t.toLowerCase()] || (i.expr.match.bool.test(t) ? du : void 0)), void 0 !== r ? null === r ? void i.removeAttr(n, t) : f && "set" in f && void 0 !== (u = f.set(n, r, t)) ? u : (n.setAttribute(t, r + ""), r) : f && "get" in f && null !== (u = f.get(n, t)) ? u : (u = i.find.attr(n, t), null == u ? void 0 : u))
			},
			attrHooks: {
				type: {
					set: function (n, t) {
						if (!f.radioValue && "radio" === t && i.nodeName(n, "input")) {
							var r = n.value;
							return n.setAttribute("type", t), r && (n.value = r), t
						}
					}
				}
			},
			removeAttr: function (n, t) {
				var i, u = 0,
					r = t && t.match(h);
				if (r && 1 === n.nodeType)
					while (i = r[u++]) n.removeAttribute(i)
			}
		});
		du = {
			set: function (n, t, r) {
				return t === !1 ? i.removeAttr(n, r) : n.setAttribute(r, r), r
			}
		};
		i.each(i.expr.match.bool.source.match(/\w+/g), function (n, t) {
			var r = ut[t] || i.find.attr;
			ut[t] = function (n, t, i) {
				var f, e, u = t.toLowerCase();
				return i || (e = ut[u], ut[u] = f, f = null != r(n, t, i) ? u : null, ut[u] = e), f
			}
		});
		gu = /^(?:input|select|textarea|button)$/i;
		nf = /^(?:a|area)$/i;
		i.fn.extend({
			prop: function (n, t) {
				return a(this, i.prop, n, t, arguments.length > 1)
			},
			removeProp: function (n) {
				return this.each(function () {
					delete this[i.propFix[n] || n]
				})
			}
		});
		i.extend({
			prop: function (n, t, r) {
				var f, u, e = n.nodeType;
				if (3 !== e && 8 !== e && 2 !== e) return 1 === e && i.isXMLDoc(n) || (t = i.propFix[t] || t, u = i.propHooks[t]), void 0 !== r ? u && "set" in u && void 0 !== (f = u.set(n, r, t)) ? f : n[t] = r : u && "get" in u && null !== (f = u.get(n, t)) ? f : n[t]
			},
			propHooks: {
				tabIndex: {
					get: function (n) {
						var t = i.find.attr(n, "tabindex");
						return t ? parseInt(t, 10) : gu.test(n.nodeName) || nf.test(n.nodeName) && n.href ? 0 : -1
					}
				}
			},
			propFix: {
				"for": "htmlFor",
				"class": "className"
			}
		});
		f.optSelected || (i.propHooks.selected = {
			get: function (n) {
				var t = n.parentNode;
				return t && t.parentNode && t.parentNode.selectedIndex, null
			},
			set: function (n) {
				var t = n.parentNode;
				t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
			}
		});
		i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
			i.propFix[this.toLowerCase()] = this
		});
		ti = /[\t\r\n\f]/g;
		i.fn.extend({
			addClass: function (n) {
				var o, t, r, u, f, s, e, c = 0;
				if (i.isFunction(n)) return this.each(function (t) {
					i(this).addClass(n.call(this, t, b(this)))
				});
				if ("string" == typeof n && n)
					for (o = n.match(h) || []; t = this[c++];)
						if (u = b(t), r = 1 === t.nodeType && (" " + u + " ").replace(ti, " ")) {
							for (s = 0; f = o[s++];) r.indexOf(" " + f + " ") < 0 && (r += f + " ");
							e = i.trim(r);
							u !== e && t.setAttribute("class", e)
						}
				return this
			},
			removeClass: function (n) {
				var o, r, t, u, f, s, e, c = 0;
				if (i.isFunction(n)) return this.each(function (t) {
					i(this).removeClass(n.call(this, t, b(this)))
				});
				if (!arguments.length) return this.attr("class", "");
				if ("string" == typeof n && n)
					for (o = n.match(h) || []; r = this[c++];)
						if (u = b(r), t = 1 === r.nodeType && (" " + u + " ").replace(ti, " ")) {
							for (s = 0; f = o[s++];)
								while (t.indexOf(" " + f + " ") > -1) t = t.replace(" " + f + " ", " ");
							e = i.trim(t);
							u !== e && r.setAttribute("class", e)
						}
				return this
			},
			toggleClass: function (n, t) {
				var u = typeof n;
				return "boolean" == typeof t && "string" === u ? t ? this.addClass(n) : this.removeClass(n) : i.isFunction(n) ? this.each(function (r) {
					i(this).toggleClass(n.call(this, r, b(this), t), t)
				}) : this.each(function () {
					var t, e, f, o;
					if ("string" === u)
						for (e = 0, f = i(this), o = n.match(h) || []; t = o[e++];) f.hasClass(t) ? f.removeClass(t) : f.addClass(t);
					else void 0 !== n && "boolean" !== u || (t = b(this), t && r.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || n === !1 ? "" : r.get(this, "__className__") || ""))
				})
			},
			hasClass: function (n) {
				for (var t, r = 0, i = " " + n + " "; t = this[r++];)
					if (1 === t.nodeType && (" " + b(t) + " ").replace(ti, " ").indexOf(i) > -1) return !0;
				return !1
			}
		});
		tf = /\r/g;
		rf = /[\x20\t\r\n\f]+/g;
		i.fn.extend({
			val: function (n) {
				var t, r, f, u = this[0];
				return arguments.length ? (f = i.isFunction(n), this.each(function (r) {
					var u;
					1 === this.nodeType && (u = f ? n.call(this, r, i(this).val()) : n, null == u ? u = "" : "number" == typeof u ? u += "" : i.isArray(u) && (u = i.map(u, function (n) {
						return null == n ? "" : n + ""
					})), t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, u, "value") || (this.value = u))
				})) : u ? (t = i.valHooks[u.type] || i.valHooks[u.nodeName.toLowerCase()], t && "get" in t && void 0 !== (r = t.get(u, "value")) ? r : (r = u.value, "string" == typeof r ? r.replace(tf, "") : null == r ? "" : r)) : void 0
			}
		});
		i.extend({
			valHooks: {
				option: {
					get: function (n) {
						var t = i.find.attr(n, "value");
						return null != t ? t : i.trim(i.text(n)).replace(rf, " ")
					}
				},
				select: {
					get: function (n) {
						for (var e, t, o = n.options, r = n.selectedIndex, u = "select-one" === n.type, s = u ? null : [], h = u ? r + 1 : o.length, f = r < 0 ? h : u ? r : 0; f < h; f++)
							if (t = o[f], (t.selected || f === r) && !t.disabled && (!t.parentNode.disabled || !i.nodeName(t.parentNode, "optgroup"))) {
								if (e = i(t).val(), u) return e;
								s.push(e)
							}
						return s
					},
					set: function (n, t) {
						for (var u, r, f = n.options, e = i.makeArray(t), o = f.length; o--;) r = f[o], (r.selected = i.inArray(i.valHooks.option.get(r), e) > -1) && (u = !0);
						return u || (n.selectedIndex = -1), e
					}
				}
			}
		});
		i.each(["radio", "checkbox"], function () {
			i.valHooks[this] = {
				set: function (n, t) {
					if (i.isArray(t)) return n.checked = i.inArray(i(n).val(), t) > -1
				}
			};
			f.checkOn || (i.valHooks[this].get = function (n) {
				return null === n.getAttribute("value") ? "on" : n.value
			})
		});
		ci = /^(?:focusinfocus|focusoutblur)$/;
		i.extend(i.event, {
			trigger: function (t, f, e, o) {
				var w, s, c, b, a, v, l, p = [e || u],
					h = vt.call(t, "type") ? t.type : t,
					y = vt.call(t, "namespace") ? t.namespace.split(".") : [];
				if (s = c = e = e || u, 3 !== e.nodeType && 8 !== e.nodeType && !ci.test(h + i.event.triggered) && (h.indexOf(".") > -1 && (y = h.split("."), h = y.shift(), y.sort()), a = h.indexOf(":") < 0 && "on" + h, t = t[i.expando] ? t : new i.Event(h, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = y.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = e), f = null == f ? [t] : i.makeArray(f, [t]), l = i.event.special[h] || {}, o || !l.trigger || l.trigger.apply(e, f) !== !1)) {
					if (!o && !l.noBubble && !i.isWindow(e)) {
						for (b = l.delegateType || h, ci.test(b + h) || (s = s.parentNode); s; s = s.parentNode) p.push(s), c = s;
						c === (e.ownerDocument || u) && p.push(c.defaultView || c.parentWindow || n)
					}
					for (w = 0;
						(s = p[w++]) && !t.isPropagationStopped();) t.type = w > 1 ? b : l.bindType || h, v = (r.get(s, "events") || {})[t.type] && r.get(s, "handle"), v && v.apply(s, f), v = a && s[a], v && v.apply && et(s) && (t.result = v.apply(s, f), t.result === !1 && t.preventDefault());
					return t.type = h, o || t.isDefaultPrevented() || l._default && l._default.apply(p.pop(), f) !== !1 || !et(e) || a && i.isFunction(e[h]) && !i.isWindow(e) && (c = e[a], c && (e[a] = null), i.event.triggered = h, e[h](), i.event.triggered = void 0, c && (e[a] = c)), t.result
				}
			},
			simulate: function (n, t, r) {
				var u = i.extend(new i.Event, r, {
					type: n,
					isSimulated: !0
				});
				i.event.trigger(u, null, t)
			}
		});
		i.fn.extend({
			trigger: function (n, t) {
				return this.each(function () {
					i.event.trigger(n, t, this)
				})
			},
			triggerHandler: function (n, t) {
				var r = this[0];
				if (r) return i.event.trigger(n, t, r, !0)
			}
		});
		i.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (n, t) {
			i.fn[t] = function (n, i) {
				return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t)
			}
		});
		i.fn.extend({
			hover: function (n, t) {
				return this.mouseenter(n).mouseleave(t || n)
			}
		});
		f.focusin = "onfocusin" in n;
		f.focusin || i.each({
			focus: "focusin",
			blur: "focusout"
		}, function (n, t) {
			var u = function (n) {
				i.event.simulate(t, n.target, i.event.fix(n))
			};
			i.event.special[t] = {
				setup: function () {
					var i = this.ownerDocument || this,
						f = r.access(i, t);
					f || i.addEventListener(n, u, !0);
					r.access(i, t, (f || 0) + 1)
				},
				teardown: function () {
					var i = this.ownerDocument || this,
						f = r.access(i, t) - 1;
					f ? r.access(i, t, f) : (i.removeEventListener(n, u, !0), r.remove(i, t))
				}
			}
		});
		var ct = n.location,
			uf = i.now(),
			li = /\?/;
		i.parseXML = function (t) {
			var r;
			if (!t || "string" != typeof t) return null;
			try {
				r = (new n.DOMParser).parseFromString(t, "text/xml")
			} catch (u) {
				r = void 0
			}
			return r && !r.getElementsByTagName("parsererror").length || i.error("Invalid XML: " + t), r
		};
		var ke = /\[\]$/,
			ff = /\r?\n/g,
			de = /^(?:submit|button|image|reset|file)$/i,
			ge = /^(?:input|select|textarea|keygen)/i;
		i.param = function (n, t) {
			var r, u = [],
				f = function (n, t) {
					var r = i.isFunction(t) ? t() : t;
					u[u.length] = encodeURIComponent(n) + "=" + encodeURIComponent(null == r ? "" : r)
				};
			if (i.isArray(n) || n.jquery && !i.isPlainObject(n)) i.each(n, function () {
				f(this.name, this.value)
			});
			else
				for (r in n) ai(r, n[r], t, f);
			return u.join("&")
		};
		i.fn.extend({
			serialize: function () {
				return i.param(this.serializeArray())
			},
			serializeArray: function () {
				return this.map(function () {
					var n = i.prop(this, "elements");
					return n ? i.makeArray(n) : this
				}).filter(function () {
					var n = this.type;
					return this.name && !i(this).is(":disabled") && ge.test(this.nodeName) && !de.test(n) && (this.checked || !wr.test(n))
				}).map(function (n, t) {
					var r = i(this).val();
					return null == r ? null : i.isArray(r) ? i.map(r, function (n) {
						return {
							name: t.name,
							value: n.replace(ff, "\r\n")
						}
					}) : {
						name: t.name,
						value: r.replace(ff, "\r\n")
					}
				}).get()
			}
		});
		var no = /%20/g,
			to = /#.*$/,
			io = /([?&])_=[^&]*/,
			ro = /^(.*?):[ \t]*([^\r\n]*)$/gm,
			uo = /^(?:GET|HEAD)$/,
			fo = /^\/\//,
			ef = {},
			vi = {},
			of = "*/".concat("*"),
			yi = u.createElement("a");
		return yi.href = ct.href, i.extend({
			active: 0,
			lastModified: {},
			etag: {},
			ajaxSettings: {
				url: ct.href,
				type: "GET",
				isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ct.protocol),
				global: !0,
				processData: !0,
				async: !0,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				accepts: {
					"*": of,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},
				contents: {
					xml: /\bxml\b/,
					html: /\bhtml/,
					json: /\bjson\b/
				},
				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},
				converters: {
					"* text": String,
					"text html": !0,
					"text json": JSON.parse,
					"text xml": i.parseXML
				},
				flatOptions: {
					url: !0,
					context: !0
				}
			},
			ajaxSetup: function (n, t) {
				return t ? pi(pi(n, i.ajaxSettings), t) : pi(i.ajaxSettings, n)
			},
			ajaxPrefilter: sf(ef),
			ajaxTransport: sf(vi),
			ajax: function (t, r) {
				function b(t, r, u, h) {
					var y, rt, g, p, b, l = r;
					s || (s = !0, d && n.clearTimeout(d), a = void 0, k = h || "", e.readyState = t > 0 ? 4 : 0, y = t >= 200 && t < 300 || 304 === t, u && (p = eo(f, e, u)), p = oo(f, p, e, y), y ? (f.ifModified && (b = e.getResponseHeader("Last-Modified"), b && (i.lastModified[o] = b), b = e.getResponseHeader("etag"), b && (i.etag[o] = b)), 204 === t || "HEAD" === f.type ? l = "nocontent" : 304 === t ? l = "notmodified" : (l = p.state, rt = p.data, g = p.error, y = !g)) : (g = l, !t && l || (l = "error", t < 0 && (t = 0))), e.status = t, e.statusText = (r || l) + "", y ? tt.resolveWith(c, [rt, l, e]) : tt.rejectWith(c, [e, l, g]), e.statusCode(w), w = void 0, v && nt.trigger(y ? "ajaxSuccess" : "ajaxError", [e, f, y ? rt : g]), it.fireWith(c, [e, l]), v && (nt.trigger("ajaxComplete", [e, f]), --i.active || i.event.trigger("ajaxStop")))
				}
				"object" == typeof t && (r = t, t = void 0);
				r = r || {};
				var a, o, k, y, d, l, s, v, g, p, f = i.ajaxSetup({}, r),
					c = f.context || f,
					nt = f.context && (c.nodeType || c.jquery) ? i(c) : i.event,
					tt = i.Deferred(),
					it = i.Callbacks("once memory"),
					w = f.statusCode || {},
					rt = {},
					ut = {},
					ft = "canceled",
					e = {
						readyState: 0,
						getResponseHeader: function (n) {
							var t;
							if (s) {
								if (!y)
									for (y = {}; t = ro.exec(k);) y[t[1].toLowerCase()] = t[2];
								t = y[n.toLowerCase()]
							}
							return null == t ? null : t
						},
						getAllResponseHeaders: function () {
							return s ? k : null
						},
						setRequestHeader: function (n, t) {
							return null == s && (n = ut[n.toLowerCase()] = ut[n.toLowerCase()] || n, rt[n] = t), this
						},
						overrideMimeType: function (n) {
							return null == s && (f.mimeType = n), this
						},
						statusCode: function (n) {
							var t;
							if (n)
								if (s) e.always(n[e.status]);
								else
									for (t in n) w[t] = [w[t], n[t]];
							return this
						},
						abort: function (n) {
							var t = n || ft;
							return a && a.abort(t), b(0, t), this
						}
					};
				if (tt.promise(e), f.url = ((t || f.url || ct.href) + "").replace(fo, ct.protocol + "//"), f.type = r.method || r.type || f.method || f.type, f.dataTypes = (f.dataType || "*").toLowerCase().match(h) || [""], null == f.crossDomain) {
					l = u.createElement("a");
					try {
						l.href = f.url;
						l.href = l.href;
						f.crossDomain = yi.protocol + "//" + yi.host != l.protocol + "//" + l.host
					} catch (et) {
						f.crossDomain = !0
					}
				}
				if (f.data && f.processData && "string" != typeof f.data && (f.data = i.param(f.data, f.traditional)), hf(ef, f, r, e), s) return e;
				v = i.event && f.global;
				v && 0 == i.active++ && i.event.trigger("ajaxStart");
				f.type = f.type.toUpperCase();
				f.hasContent = !uo.test(f.type);
				o = f.url.replace(to, "");
				f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(no, "+")) : (p = f.url.slice(o.length), f.data && (o += (li.test(o) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (o = o.replace(io, ""), p = (li.test(o) ? "&" : "?") + "_=" + uf++ + p), f.url = o + p);
				f.ifModified && (i.lastModified[o] && e.setRequestHeader("If-Modified-Since", i.lastModified[o]), i.etag[o] && e.setRequestHeader("If-None-Match", i.etag[o]));
				(f.data && f.hasContent && f.contentType !== !1 || r.contentType) && e.setRequestHeader("Content-Type", f.contentType);
				e.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + of + "; q=0.01" : "") : f.accepts["*"]);
				for (g in f.headers) e.setRequestHeader(g, f.headers[g]);
				if (f.beforeSend && (f.beforeSend.call(c, e, f) === !1 || s)) return e.abort();
				if (ft = "abort", it.add(f.complete), e.done(f.success), e.fail(f.error), a = hf(vi, f, r, e)) {
					if (e.readyState = 1, v && nt.trigger("ajaxSend", [e, f]), s) return e;
					f.async && f.timeout > 0 && (d = n.setTimeout(function () {
						e.abort("timeout")
					}, f.timeout));
					try {
						s = !1;
						a.send(rt, b)
					} catch (et) {
						if (s) throw et;
						b(-1, et)
					}
				} else b(-1, "No Transport");
				return e
			},
			getJSON: function (n, t, r) {
				return i.get(n, t, r, "json")
			},
			getScript: function (n, t) {
				return i.get(n, void 0, t, "script")
			}
		}), i.each(["get", "post"], function (n, t) {
			i[t] = function (n, r, u, f) {
				return i.isFunction(r) && (f = f || u, u = r, r = void 0), i.ajax(i.extend({
					url: n,
					type: t,
					dataType: f,
					data: r,
					success: u
				}, i.isPlainObject(n) && n))
			}
		}), i._evalUrl = function (n) {
			return i.ajax({
				url: n,
				type: "GET",
				dataType: "script",
				cache: !0,
				async: !1,
				global: !1,
				throws: !0
			})
		}, i.fn.extend({
			wrapAll: function (n) {
				var t;
				return this[0] && (i.isFunction(n) && (n = n.call(this[0])), t = i(n, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
					for (var n = this; n.firstElementChild;) n = n.firstElementChild;
					return n
				}).append(this)), this
			},
			wrapInner: function (n) {
				return i.isFunction(n) ? this.each(function (t) {
					i(this).wrapInner(n.call(this, t))
				}) : this.each(function () {
					var t = i(this),
						r = t.contents();
					r.length ? r.wrapAll(n) : t.append(n)
				})
			},
			wrap: function (n) {
				var t = i.isFunction(n);
				return this.each(function (r) {
					i(this).wrapAll(t ? n.call(this, r) : n)
				})
			},
			unwrap: function (n) {
				return this.parent(n).not("body").each(function () {
					i(this).replaceWith(this.childNodes)
				}), this
			}
		}), i.expr.pseudos.hidden = function (n) {
			return !i.expr.pseudos.visible(n)
		}, i.expr.pseudos.visible = function (n) {
			return !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length)
		}, i.ajaxSettings.xhr = function () {
			try {
				return new n.XMLHttpRequest
			} catch (t) {}
		}, cf = {
			0: 200,
			1223: 204
		}, ft = i.ajaxSettings.xhr(), f.cors = !!ft && "withCredentials" in ft, f.ajax = ft = !!ft, i.ajaxTransport(function (t) {
			var i, r;
			if (f.cors || ft && !t.crossDomain) return {
				send: function (u, f) {
					var o, e = t.xhr();
					if (e.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
						for (o in t.xhrFields) e[o] = t.xhrFields[o];
					t.mimeType && e.overrideMimeType && e.overrideMimeType(t.mimeType);
					t.crossDomain || u["X-Requested-With"] || (u["X-Requested-With"] = "XMLHttpRequest");
					for (o in u) e.setRequestHeader(o, u[o]);
					i = function (n) {
						return function () {
							i && (i = r = e.onload = e.onerror = e.onabort = e.onreadystatechange = null, "abort" === n ? e.abort() : "error" === n ? "number" != typeof e.status ? f(0, "error") : f(e.status, e.statusText) : f(cf[e.status] || e.status, e.statusText, "text" !== (e.responseType || "text") || "string" != typeof e.responseText ? {
								binary: e.response
							} : {
								text: e.responseText
							}, e.getAllResponseHeaders()))
						}
					};
					e.onload = i();
					r = e.onerror = i("error");
					void 0 !== e.onabort ? e.onabort = r : e.onreadystatechange = function () {
						4 === e.readyState && n.setTimeout(function () {
							i && r()
						})
					};
					i = i("abort");
					try {
						e.send(t.hasContent && t.data || null)
					} catch (s) {
						if (i) throw s;
					}
				},
				abort: function () {
					i && i()
				}
			}
		}), i.ajaxPrefilter(function (n) {
			n.crossDomain && (n.contents.script = !1)
		}), i.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /\b(?:java|ecma)script\b/
			},
			converters: {
				"text script": function (n) {
					return i.globalEval(n), n
				}
			}
		}), i.ajaxPrefilter("script", function (n) {
			void 0 === n.cache && (n.cache = !1);
			n.crossDomain && (n.type = "GET")
		}), i.ajaxTransport("script", function (n) {
			if (n.crossDomain) {
				var r, t;
				return {
					send: function (f, e) {
						r = i("<script>").prop({
							charset: n.scriptCharset,
							src: n.url
						}).on("load error", t = function (n) {
							r.remove();
							t = null;
							n && e("error" === n.type ? 404 : 200, n.type)
						});
						u.head.appendChild(r[0])
					},
					abort: function () {
						t && t()
					}
				}
			}
		}), wi = [], ii = /(=)\?(?=&|$)|\?\?/, i.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function () {
				var n = wi.pop() || i.expando + "_" + uf++;
				return this[n] = !0, n
			}
		}), i.ajaxPrefilter("json jsonp", function (t, r, u) {
			var f, e, o, s = t.jsonp !== !1 && (ii.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && ii.test(t.data) && "data");
			if (s || "jsonp" === t.dataTypes[0]) return f = t.jsonpCallback = i.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(ii, "$1" + f) : t.jsonp !== !1 && (t.url += (li.test(t.url) ? "&" : "?") + t.jsonp + "=" + f), t.converters["script json"] = function () {
				return o || i.error(f + " was not called"), o[0]
			}, t.dataTypes[0] = "json", e = n[f], n[f] = function () {
				o = arguments
			}, u.always(function () {
				void 0 === e ? i(n).removeProp(f) : n[f] = e;
				t[f] && (t.jsonpCallback = r.jsonpCallback, wi.push(f));
				o && i.isFunction(e) && e(o[0]);
				o = e = void 0
			}), "script"
		}), f.createHTMLDocument = function () {
			var n = u.implementation.createHTMLDocument("").body;
			return n.innerHTML = "<form><\/form><form><\/form>", 2 === n.childNodes.length
		}(), i.parseHTML = function (n, t, r) {
			if ("string" != typeof n) return [];
			"boolean" == typeof t && (r = t, t = !1);
			var s, e, o;
			return t || (f.createHTMLDocument ? (t = u.implementation.createHTMLDocument(""), s = t.createElement("base"), s.href = u.location.href, t.head.appendChild(s)) : t = u), e = rr.exec(n), o = !r && [], e ? [t.createElement(e[1])] : (e = gr([n], t, o), o && o.length && i(o).remove(), i.merge([], e.childNodes))
		}, i.fn.load = function (n, t, r) {
			var u, o, s, f = this,
				e = n.indexOf(" ");
			return e > -1 && (u = i.trim(n.slice(e)), n = n.slice(0, e)), i.isFunction(t) ? (r = t, t = void 0) : t && "object" == typeof t && (o = "POST"), f.length > 0 && i.ajax({
				url: n,
				type: o || "GET",
				dataType: "html",
				data: t
			}).done(function (n) {
				s = arguments;
				f.html(u ? i("<div>").append(i.parseHTML(n)).find(u) : n)
			}).always(r && function (n, t) {
				f.each(function () {
					r.apply(this, s || [n.responseText, t, n])
				})
			}), this
		}, i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (n, t) {
			i.fn[t] = function (n) {
				return this.on(t, n)
			}
		}), i.expr.pseudos.animated = function (n) {
			return i.grep(i.timers, function (t) {
				return n === t.elem
			}).length
		}, i.offset = {
			setOffset: function (n, t, r) {
				var e, o, s, h, u, c, v, l = i.css(n, "position"),
					a = i(n),
					f = {};
				"static" === l && (n.style.position = "relative");
				u = a.offset();
				s = i.css(n, "top");
				c = i.css(n, "left");
				v = ("absolute" === l || "fixed" === l) && (s + c).indexOf("auto") > -1;
				v ? (e = a.position(), h = e.top, o = e.left) : (h = parseFloat(s) || 0, o = parseFloat(c) || 0);
				i.isFunction(t) && (t = t.call(n, r, i.extend({}, u)));
				null != t.top && (f.top = t.top - u.top + h);
				null != t.left && (f.left = t.left - u.left + o);
				"using" in t ? t.using.call(n, f) : a.css(f)
			}
		}, i.fn.extend({
			offset: function (n) {
				if (arguments.length) return void 0 === n ? this : this.each(function (t) {
					i.offset.setOffset(this, n, t)
				});
				var u, f, t, e, r = this[0];
				if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), t.width || t.height ? (e = r.ownerDocument, f = lf(e), u = e.documentElement, {
					top: t.top + f.pageYOffset - u.clientTop,
					left: t.left + f.pageXOffset - u.clientLeft
				}) : t) : {
					top: 0,
					left: 0
				}
			},
			position: function () {
				if (this[0]) {
					var t, r, u = this[0],
						n = {
							top: 0,
							left: 0
						};
					return "fixed" === i.css(u, "position") ? r = u.getBoundingClientRect() : (t = this.offsetParent(), r = this.offset(), i.nodeName(t[0], "html") || (n = t.offset()), n = {
						top: n.top + i.css(t[0], "borderTopWidth", !0),
						left: n.left + i.css(t[0], "borderLeftWidth", !0)
					}), {
						top: r.top - n.top - i.css(u, "marginTop", !0),
						left: r.left - n.left - i.css(u, "marginLeft", !0)
					}
				}
			},
			offsetParent: function () {
				return this.map(function () {
					for (var n = this.offsetParent; n && "static" === i.css(n, "position");) n = n.offsetParent;
					return n || kt
				})
			}
		}), i.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function (n, t) {
			var r = "pageYOffset" === t;
			i.fn[n] = function (i) {
				return a(this, function (n, i, u) {
					var f = lf(n);
					return void 0 === u ? f ? f[t] : n[i] : void(f ? f.scrollTo(r ? f.pageXOffset : u, r ? u : f.pageYOffset) : n[i] = u)
				}, n, i, arguments.length)
			}
		}), i.each(["top", "left"], function (n, t) {
			i.cssHooks[t] = eu(f.pixelPosition, function (n, r) {
				if (r) return r = ht(n, t), hi.test(r) ? i(n).position()[t] + "px" : r
			})
		}), i.each({
			Height: "height",
			Width: "width"
		}, function (n, t) {
			i.each({
				padding: "inner" + n,
				content: t,
				"": "outer" + n
			}, function (r, u) {
				i.fn[u] = function (f, e) {
					var o = arguments.length && (r || "boolean" != typeof f),
						s = r || (f === !0 || e === !0 ? "margin" : "border");
					return a(this, function (t, r, f) {
						var e;
						return i.isWindow(t) ? 0 === u.indexOf("outer") ? t["inner" + n] : t.document.documentElement["client" + n] : 9 === t.nodeType ? (e = t.documentElement, Math.max(t.body["scroll" + n], e["scroll" + n], t.body["offset" + n], e["offset" + n], e["client" + n])) : void 0 === f ? i.css(t, r, s) : i.style(t, r, f, s)
					}, t, o ? f : void 0, o)
				}
			})
		}), i.fn.extend({
			bind: function (n, t, i) {
				return this.on(n, null, t, i)
			},
			unbind: function (n, t) {
				return this.off(n, null, t)
			},
			delegate: function (n, t, i, r) {
				return this.on(t, n, i, r)
			},
			undelegate: function (n, t, i) {
				return 1 === arguments.length ? this.off(n, "**") : this.off(t, n || "**", i)
			}
		}), i.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function () {
			return i
		}), af = n.jQuery, vf = n.$, i.noConflict = function (t) {
			return n.$ === i && (n.$ = vf), t && n.jQuery === i && (n.jQuery = af), i
		}, t || (n.jQuery = n.$ = i), i
	}), function (n) {
		"function" == typeof define && define.amd ? define(["jquery"], n) : n(jQuery)
	}(function (n) {
		function h(t, i) {
			var r, u, f, e = t.nodeName.toLowerCase();
			return "area" === e ? (r = t.parentNode, u = r.name, t.href && u && "map" === r.nodeName.toLowerCase() ? (f = n("img[usemap='#" + u + "']")[0], !!f && c(f)) : !1) : (/input|select|textarea|button|object/.test(e) ? !t.disabled : "a" === e ? t.href || i : i) && c(t)
		}

		function c(t) {
			return n.expr.filters.visible(t) && !n(t).parents().addBack().filter(function () {
				return "hidden" === n.css(this, "visibility")
			}).length
		}

		function k(n) {
			for (var t, i; n.length && n[0] !== document;) {
				if (t = n.css("position"), ("absolute" === t || "relative" === t || "fixed" === t) && (i = parseInt(n.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
				n = n.parent()
			}
			return 0
		}

		function l() {
			this._curInst = null;
			this._keyEvent = !1;
			this._disabledInputs = [];
			this._datepickerShowing = !1;
			this._inDialog = !1;
			this._mainDivId = "ui-datepicker-div";
			this._inlineClass = "ui-datepicker-inline";
			this._appendClass = "ui-datepicker-append";
			this._triggerClass = "ui-datepicker-trigger";
			this._dialogClass = "ui-datepicker-dialog";
			this._disableClass = "ui-datepicker-disabled";
			this._unselectableClass = "ui-datepicker-unselectable";
			this._currentClass = "ui-datepicker-current-day";
			this._dayOverClass = "ui-datepicker-days-cell-over";
			this.regional = [];
			this.regional[""] = {
				closeText: "Done",
				prevText: "Prev",
				nextText: "Next",
				currentText: "Today",
				monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
				weekHeader: "Wk",
				dateFormat: "mm/dd/yy",
				firstDay: 0,
				isRTL: !1,
				showMonthAfterYear: !1,
				yearSuffix: ""
			};
			this._defaults = {
				showOn: "focus",
				showAnim: "fadeIn",
				showOptions: {},
				defaultDate: null,
				appendText: "",
				buttonText: "...",
				buttonImage: "",
				buttonImageOnly: !1,
				hideIfNoPrevNext: !1,
				navigationAsDateFormat: !1,
				gotoCurrent: !1,
				changeMonth: !1,
				changeYear: !1,
				yearRange: "c-10:c+10",
				showOtherMonths: !1,
				selectOtherMonths: !1,
				showWeek: !1,
				calculateWeek: this.iso8601Week,
				shortYearCutoff: "+10",
				minDate: null,
				maxDate: null,
				duration: "fast",
				beforeShowDay: null,
				beforeShow: null,
				onSelect: null,
				onChangeMonthYear: null,
				onClose: null,
				numberOfMonths: 1,
				showCurrentAtPos: 0,
				stepMonths: 1,
				stepBigMonths: 12,
				altField: "",
				altFormat: "",
				constrainInput: !0,
				showButtonPanel: !1,
				autoSize: !1,
				disabled: !1
			};
			n.extend(this._defaults, this.regional[""]);
			this.regional.en = n.extend(!0, {}, this.regional[""]);
			this.regional["en-US"] = n.extend(!0, {}, this.regional.en);
			this.dpDiv = a(n("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>"))
		}

		function a(t) {
			var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
			return t.delegate(i, "mouseout", function () {
				n(this).removeClass("ui-state-hover"); - 1 !== this.className.indexOf("ui-datepicker-prev") && n(this).removeClass("ui-datepicker-prev-hover"); - 1 !== this.className.indexOf("ui-datepicker-next") && n(this).removeClass("ui-datepicker-next-hover")
			}).delegate(i, "mouseover", v)
		}

		function v() {
			n.datepicker._isDisabledDatepicker(u.inline ? u.dpDiv.parent()[0] : u.input[0]) || (n(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), n(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && n(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && n(this).addClass("ui-datepicker-next-hover"))
		}

		function r(t, i) {
			n.extend(t, i);
			for (var r in i) null == i[r] && (t[r] = i[r]);
			return t
		}

		function t(n) {
			return function () {
				var t = this.element.val();
				n.apply(this, arguments);
				this._refresh();
				t !== this.element.val() && this._trigger("change")
			}
		}
		var y, f, i, u, o, s;
		n.ui = n.ui || {};
		n.extend(n.ui, {
			version: "1.11.1",
			keyCode: {
				BACKSPACE: 8,
				COMMA: 188,
				DELETE: 46,
				DOWN: 40,
				END: 35,
				ENTER: 13,
				ESCAPE: 27,
				HOME: 36,
				LEFT: 37,
				PAGE_DOWN: 34,
				PAGE_UP: 33,
				PERIOD: 190,
				RIGHT: 39,
				SPACE: 32,
				TAB: 9,
				UP: 38
			}
		});
		n.fn.extend({
			scrollParent: function (t) {
				var i = this.css("position"),
					u = "absolute" === i,
					f = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
					r = this.parents().filter(function () {
						var t = n(this);
						return u && "static" === t.css("position") ? !1 : f.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
					}).eq(0);
				return "fixed" !== i && r.length ? r : n(this[0].ownerDocument || document)
			},
			uniqueId: function () {
				var n = 0;
				return function () {
					return this.each(function () {
						this.id || (this.id = "ui-id-" + ++n)
					})
				}
			}(),
			removeUniqueId: function () {
				return this.each(function () {
					/^ui-id-\d+$/.test(this.id) && n(this).removeAttr("id")
				})
			}
		});
		n.extend(n.expr[":"], {
			data: n.expr.createPseudo ? n.expr.createPseudo(function (t) {
				return function (i) {
					return !!n.data(i, t)
				}
			}) : function (t, i, r) {
				return !!n.data(t, r[3])
			},
			focusable: function (t) {
				return h(t, !isNaN(n.attr(t, "tabindex")))
			},
			tabbable: function (t) {
				var i = n.attr(t, "tabindex"),
					r = isNaN(i);
				return (r || i >= 0) && h(t, !r)
			}
		});
		n("<a>").outerWidth(1).jquery || n.each(["Width", "Height"], function (t, i) {
			function r(t, i, r, u) {
				return n.each(e, function () {
					i -= parseFloat(n.css(t, "padding" + this)) || 0;
					r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
					u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
				}), i
			}
			var e = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
				u = i.toLowerCase(),
				f = {
					innerWidth: n.fn.innerWidth,
					innerHeight: n.fn.innerHeight,
					outerWidth: n.fn.outerWidth,
					outerHeight: n.fn.outerHeight
				};
			n.fn["inner" + i] = function (t) {
				return void 0 === t ? f["inner" + i].call(this) : this.each(function () {
					n(this).css(u, r(this, t) + "px")
				})
			};
			n.fn["outer" + i] = function (t, e) {
				return "number" != typeof t ? f["outer" + i].call(this, t) : this.each(function () {
					n(this).css(u, r(this, t, !0, e) + "px")
				})
			}
		});
		n.fn.addBack || (n.fn.addBack = function (n) {
			return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
		});
		n("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (n.fn.removeData = function (t) {
			return function (i) {
				return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this)
			}
		}(n.fn.removeData));
		n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
		n.fn.extend({
			focus: function (t) {
				return function (i, r) {
					return "number" == typeof i ? this.each(function () {
						var t = this;
						setTimeout(function () {
							n(t).focus();
							r && r.call(t)
						}, i)
					}) : t.apply(this, arguments)
				}
			}(n.fn.focus),
			disableSelection: function () {
				var n = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
				return function () {
					return this.bind(n + ".ui-disableSelection", function (n) {
						n.preventDefault()
					})
				}
			}(),
			enableSelection: function () {
				return this.unbind(".ui-disableSelection")
			},
			zIndex: function (t) {
				if (void 0 !== t) return this.css("zIndex", t);
				if (this.length)
					for (var r, u, i = n(this[0]); i.length && i[0] !== document;) {
						if (r = i.css("position"), ("absolute" === r || "relative" === r || "fixed" === r) && (u = parseInt(i.css("zIndex"), 10), !isNaN(u) && 0 !== u)) return u;
						i = i.parent()
					}
				return 0
			}
		});
		n.ui.plugin = {
			add: function (t, i, r) {
				var u, f = n.ui[t].prototype;
				for (u in r) f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
			},
			call: function (n, t, i, r) {
				var u, f = n.plugins[t];
				if (f && (r || n.element[0].parentNode && 11 !== n.element[0].parentNode.nodeType))
					for (u = 0; f.length > u; u++) n.options[f[u][0]] && f[u][1].apply(n.element, i)
			}
		};
		y = 0;
		f = Array.prototype.slice;
		n.cleanData = function (t) {
			return function (i) {
				for (var r, u, f = 0; null != (u = i[f]); f++) try {
					r = n._data(u, "events");
					r && r.remove && n(u).triggerHandler("remove")
				} catch (e) {}
				t(i)
			}
		}(n.cleanData);
		n.widget = function (t, i, r) {
			var s, f, u, o, h = {},
				e = t.split(".")[0];
			return t = t.split(".")[1], s = e + "-" + t, r || (r = i, i = n.Widget), n.expr[":"][s.toLowerCase()] = function (t) {
				return !!n.data(t, s)
			}, n[e] = n[e] || {}, f = n[e][t], u = n[e][t] = function (n, t) {
				return this._createWidget ? (arguments.length && this._createWidget(n, t), void 0) : new u(n, t)
			}, n.extend(u, f, {
				version: r.version,
				_proto: n.extend({}, r),
				_childConstructors: []
			}), o = new i, o.options = n.widget.extend({}, o.options), n.each(r, function (t, r) {
				return n.isFunction(r) ? (h[t] = function () {
					var n = function () {
							return i.prototype[t].apply(this, arguments)
						},
						u = function (n) {
							return i.prototype[t].apply(this, n)
						};
					return function () {
						var t, i = this._super,
							f = this._superApply;
						return this._super = n, this._superApply = u, t = r.apply(this, arguments), this._super = i, this._superApply = f, t
					}
				}(), void 0) : (h[t] = r, void 0)
			}), u.prototype = n.widget.extend(o, {
				widgetEventPrefix: f ? o.widgetEventPrefix || t : t
			}, h, {
				constructor: u,
				namespace: e,
				widgetName: t,
				widgetFullName: s
			}), f ? (n.each(f._childConstructors, function (t, i) {
				var r = i.prototype;
				n.widget(r.namespace + "." + r.widgetName, u, i._proto)
			}), delete f._childConstructors) : i._childConstructors.push(u), n.widget.bridge(t, u), u
		};
		n.widget.extend = function (t) {
			for (var i, r, e = f.call(arguments, 1), u = 0, o = e.length; o > u; u++)
				for (i in e[u]) r = e[u][i], e[u].hasOwnProperty(i) && void 0 !== r && (t[i] = n.isPlainObject(r) ? n.isPlainObject(t[i]) ? n.widget.extend({}, t[i], r) : n.widget.extend({}, r) : r);
			return t
		};
		n.widget.bridge = function (t, i) {
			var r = i.prototype.widgetFullName || t;
			n.fn[t] = function (u) {
				var s = "string" == typeof u,
					o = f.call(arguments, 1),
					e = this;
				return u = !s && o.length ? n.widget.extend.apply(null, [u].concat(o)) : u, s ? this.each(function () {
					var i, f = n.data(this, r);
					return "instance" === u ? (e = f, !1) : f ? n.isFunction(f[u]) && "_" !== u.charAt(0) ? (i = f[u].apply(f, o), i !== f && void 0 !== i ? (e = i && i.jquery ? e.pushStack(i.get()) : i, !1) : void 0) : n.error("no such method '" + u + "' for " + t + " widget instance") : n.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + u + "'")
				}) : this.each(function () {
					var t = n.data(this, r);
					t ? (t.option(u || {}), t._init && t._init()) : n.data(this, r, new i(u, this))
				}), e
			}
		};
		n.Widget = function () {};
		n.Widget._childConstructors = [];
		n.Widget.prototype = {
			widgetName: "widget",
			widgetEventPrefix: "",
			defaultElement: "<div>",
			options: {
				disabled: !1,
				create: null
			},
			_createWidget: function (t, i) {
				i = n(i || this.defaultElement || this)[0];
				this.element = n(i);
				this.uuid = y++;
				this.eventNamespace = "." + this.widgetName + this.uuid;
				this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
				this.bindings = n();
				this.hoverable = n();
				this.focusable = n();
				i !== this && (n.data(i, this.widgetFullName, this), this._on(!0, this.element, {
					remove: function (n) {
						n.target === i && this.destroy()
					}
				}), this.document = n(i.style ? i.ownerDocument : i.document || i), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
				this._create();
				this._trigger("create", null, this._getCreateEventData());
				this._init()
			},
			_getCreateOptions: n.noop,
			_getCreateEventData: n.noop,
			_create: n.noop,
			_init: n.noop,
			destroy: function () {
				this._destroy();
				this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(n.camelCase(this.widgetFullName));
				this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
				this.bindings.unbind(this.eventNamespace);
				this.hoverable.removeClass("ui-state-hover");
				this.focusable.removeClass("ui-state-focus")
			},
			_destroy: n.noop,
			widget: function () {
				return this.element
			},
			option: function (t, i) {
				var r, u, f, e = t;
				if (0 === arguments.length) return n.widget.extend({}, this.options);
				if ("string" == typeof t)
					if (e = {}, r = t.split("."), t = r.shift(), r.length) {
						for (u = e[t] = n.widget.extend({}, this.options[t]), f = 0; r.length - 1 > f; f++) u[r[f]] = u[r[f]] || {}, u = u[r[f]];
						if (t = r.pop(), 1 === arguments.length) return void 0 === u[t] ? null : u[t];
						u[t] = i
					} else {
						if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
						e[t] = i
					}
				return this._setOptions(e), this
			},
			_setOptions: function (n) {
				for (var t in n) this._setOption(t, n[t]);
				return this
			},
			_setOption: function (n, t) {
				return this.options[n] = t, "disabled" === n && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
			},
			enable: function () {
				return this._setOptions({
					disabled: !1
				})
			},
			disable: function () {
				return this._setOptions({
					disabled: !0
				})
			},
			_on: function (t, i, r) {
				var f, u = this;
				"boolean" != typeof t && (r = i, i = t, t = !1);
				r ? (i = f = n(i), this.bindings = this.bindings.add(i)) : (r = i, i = this.element, f = this.widget());
				n.each(r, function (r, e) {
					function o() {
						if (t || u.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled")) return ("string" == typeof e ? u[e] : e).apply(u, arguments)
					}
					"string" != typeof e && (o.guid = e.guid = e.guid || o.guid || n.guid++);
					var s = r.match(/^([\w:-]*)\s*(.*)$/),
						h = s[1] + u.eventNamespace,
						c = s[2];
					c ? f.delegate(c, h, o) : i.bind(h, o)
				})
			},
			_off: function (n, t) {
				t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
				n.unbind(t).undelegate(t)
			},
			_delay: function (n, t) {
				function r() {
					return ("string" == typeof n ? i[n] : n).apply(i, arguments)
				}
				var i = this;
				return setTimeout(r, t || 0)
			},
			_hoverable: function (t) {
				this.hoverable = this.hoverable.add(t);
				this._on(t, {
					mouseenter: function (t) {
						n(t.currentTarget).addClass("ui-state-hover")
					},
					mouseleave: function (t) {
						n(t.currentTarget).removeClass("ui-state-hover")
					}
				})
			},
			_focusable: function (t) {
				this.focusable = this.focusable.add(t);
				this._on(t, {
					focusin: function (t) {
						n(t.currentTarget).addClass("ui-state-focus")
					},
					focusout: function (t) {
						n(t.currentTarget).removeClass("ui-state-focus")
					}
				})
			},
			_trigger: function (t, i, r) {
				var u, f, e = this.options[t];
				if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent)
					for (u in f) u in i || (i[u] = f[u]);
				return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
			}
		};
		n.each({
			show: "fadeIn",
			hide: "fadeOut"
		}, function (t, i) {
			n.Widget.prototype["_" + t] = function (r, u, f) {
				"string" == typeof u && (u = {
					effect: u
				});
				var o, e = u ? u === !0 || "number" == typeof u ? i : u.effect || i : t;
				u = u || {};
				"number" == typeof u && (u = {
					duration: u
				});
				o = !n.isEmptyObject(u);
				u.complete = f;
				u.delay && r.delay(u.delay);
				o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function (i) {
					n(this)[t]();
					f && f.call(r[0]);
					i()
				})
			}
		});
		n.widget;
		i = !1;
		n(document).mouseup(function () {
			i = !1
		});
		n.widget("ui.mouse", {
				version: "1.11.1",
				options: {
					cancel: "input,textarea,button,select,option",
					distance: 1,
					delay: 0
				},
				_mouseInit: function () {
					var t = this;
					this.element.bind("mousedown." + this.widgetName, function (n) {
						return t._mouseDown(n)
					}).bind("click." + this.widgetName, function (i) {
						if (!0 === n.data(i.target, t.widgetName + ".preventClickEvent")) return (n.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1)
					});
					this.started = !1
				},
				_mouseDestroy: function () {
					this.element.unbind("." + this.widgetName);
					this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
				},
				_mouseDown: function (t) {
					if (!i) {
						this._mouseStarted && this._mouseUp(t);
						this._mouseDownEvent = t;
						var r = this,
							u = 1 === t.which,
							f = "string" == typeof this.options.cancel && t.target.nodeName ? n(t.target).closest(this.options.cancel).length : !1;
						return u && !f && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
							r.mouseDelayMet = !0
						}, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === n.data(t.target, this.widgetName + ".preventClickEvent") && n.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (n) {
							return r._mouseMove(n)
						}, this._mouseUpDelegate = function (n) {
							return r._mouseUp(n)
						}, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), i = !0, !0)) : !0
					}
				},
				_mouseMove: function (t) {
					return n.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : t.which ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
				},
				_mouseUp: function (t) {
					return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && n.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), i = !1, !1
				},
				_mouseDistanceMet: function (n) {
					return Math.max(Math.abs(this._mouseDownEvent.pageX - n.pageX), Math.abs(this._mouseDownEvent.pageY - n.pageY)) >= this.options.distance
				},
				_mouseDelayMet: function () {
					return this.mouseDelayMet
				},
				_mouseStart: function () {},
				_mouseDrag: function () {},
				_mouseStop: function () {},
				_mouseCapture: function () {
					return !0
				}
			}),
			function () {
				function f(n, t, i) {
					return [parseFloat(n[0]) * (a.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (a.test(n[1]) ? i / 100 : 1)]
				}

				function i(t, i) {
					return parseInt(n.css(t, i), 10) || 0
				}

				function v(t) {
					var i = t[0];
					return 9 === i.nodeType ? {
						width: t.width(),
						height: t.height(),
						offset: {
							top: 0,
							left: 0
						}
					} : n.isWindow(i) ? {
						width: t.width(),
						height: t.height(),
						offset: {
							top: t.scrollTop(),
							left: t.scrollLeft()
						}
					} : i.preventDefault ? {
						width: 0,
						height: 0,
						offset: {
							top: i.pageY,
							left: i.pageX
						}
					} : {
						width: t.outerWidth(),
						height: t.outerHeight(),
						offset: t.offset()
					}
				}
				n.ui = n.ui || {};
				var u, e, r = Math.max,
					t = Math.abs,
					o = Math.round,
					s = /left|center|right/,
					h = /top|center|bottom/,
					c = /[\+\-]\d+(\.[\d]+)?%?/,
					l = /^\w+/,
					a = /%$/,
					y = n.fn.position;
				n.position = {
					scrollbarWidth: function () {
						if (void 0 !== u) return u;
						var r, i, t = n("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"),
							f = t.children()[0];
						return n("body").append(t), r = f.offsetWidth, t.css("overflow", "scroll"), i = f.offsetWidth, r === i && (i = t[0].clientWidth), t.remove(), u = r - i
					},
					getScrollInfo: function (t) {
						var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
							r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
							u = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
							f = "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight;
						return {
							width: f ? n.position.scrollbarWidth() : 0,
							height: u ? n.position.scrollbarWidth() : 0
						}
					},
					getWithinInfo: function (t) {
						var i = n(t || window),
							r = n.isWindow(i[0]),
							u = !!i[0] && 9 === i[0].nodeType;
						return {
							element: i,
							isWindow: r,
							isDocument: u,
							offset: i.offset() || {
								left: 0,
								top: 0
							},
							scrollLeft: i.scrollLeft(),
							scrollTop: i.scrollTop(),
							width: r || u ? i.width() : i.outerWidth(),
							height: r || u ? i.height() : i.outerHeight()
						}
					}
				};
				n.fn.position = function (u) {
					if (!u || !u.of) return y.apply(this, arguments);
					u = n.extend({}, u);
					var k, a, p, b, w, g, nt = n(u.of),
						it = n.position.getWithinInfo(u.within),
						rt = n.position.getScrollInfo(it),
						d = (u.collision || "flip").split(" "),
						tt = {};
					return g = v(nt), nt[0].preventDefault && (u.at = "left top"), a = g.width, p = g.height, b = g.offset, w = n.extend({}, b), n.each(["my", "at"], function () {
						var t, i, n = (u[this] || "").split(" ");
						1 === n.length && (n = s.test(n[0]) ? n.concat(["center"]) : h.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
						n[0] = s.test(n[0]) ? n[0] : "center";
						n[1] = h.test(n[1]) ? n[1] : "center";
						t = c.exec(n[0]);
						i = c.exec(n[1]);
						tt[this] = [t ? t[0] : 0, i ? i[0] : 0];
						u[this] = [l.exec(n[0])[0], l.exec(n[1])[0]]
					}), 1 === d.length && (d[1] = d[0]), "right" === u.at[0] ? w.left += a : "center" === u.at[0] && (w.left += a / 2), "bottom" === u.at[1] ? w.top += p : "center" === u.at[1] && (w.top += p / 2), k = f(tt.at, a, p), w.left += k[0], w.top += k[1], this.each(function () {
						var y, g, h = n(this),
							c = h.outerWidth(),
							l = h.outerHeight(),
							ut = i(this, "marginLeft"),
							ft = i(this, "marginTop"),
							et = c + ut + i(this, "marginRight") + rt.width,
							ot = l + ft + i(this, "marginBottom") + rt.height,
							s = n.extend({}, w),
							v = f(tt.my, h.outerWidth(), h.outerHeight());
						"right" === u.my[0] ? s.left -= c : "center" === u.my[0] && (s.left -= c / 2);
						"bottom" === u.my[1] ? s.top -= l : "center" === u.my[1] && (s.top -= l / 2);
						s.left += v[0];
						s.top += v[1];
						e || (s.left = o(s.left), s.top = o(s.top));
						y = {
							marginLeft: ut,
							marginTop: ft
						};
						n.each(["left", "top"], function (t, i) {
							n.ui.position[d[t]] && n.ui.position[d[t]][i](s, {
								targetWidth: a,
								targetHeight: p,
								elemWidth: c,
								elemHeight: l,
								collisionPosition: y,
								collisionWidth: et,
								collisionHeight: ot,
								offset: [k[0] + v[0], k[1] + v[1]],
								my: u.my,
								at: u.at,
								within: it,
								elem: h
							})
						});
						u.using && (g = function (n) {
							var i = b.left - s.left,
								o = i + a - c,
								f = b.top - s.top,
								v = f + p - l,
								e = {
									target: {
										element: nt,
										left: b.left,
										top: b.top,
										width: a,
										height: p
									},
									element: {
										element: h,
										left: s.left,
										top: s.top,
										width: c,
										height: l
									},
									horizontal: 0 > o ? "left" : i > 0 ? "right" : "center",
									vertical: 0 > v ? "top" : f > 0 ? "bottom" : "middle"
								};
							c > a && a > t(i + o) && (e.horizontal = "center");
							l > p && p > t(f + v) && (e.vertical = "middle");
							e.important = r(t(i), t(o)) > r(t(f), t(v)) ? "horizontal" : "vertical";
							u.using.call(this, n, e)
						});
						h.offset(n.extend(s, {
							using: g
						}))
					})
				};
				n.ui.position = {
						fit: {
							left: function (n, t) {
								var h, e = t.within,
									u = e.isWindow ? e.scrollLeft : e.offset.left,
									o = e.width,
									s = n.left - t.collisionPosition.marginLeft,
									i = u - s,
									f = s + t.collisionWidth - o - u;
								t.collisionWidth > o ? i > 0 && 0 >= f ? (h = n.left + i + t.collisionWidth - o - u, n.left += i - h) : n.left = f > 0 && 0 >= i ? u : i > f ? u + o - t.collisionWidth : u : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = r(n.left - s, n.left)
							},
							top: function (n, t) {
								var h, o = t.within,
									u = o.isWindow ? o.scrollTop : o.offset.top,
									e = t.within.height,
									s = n.top - t.collisionPosition.marginTop,
									i = u - s,
									f = s + t.collisionHeight - e - u;
								t.collisionHeight > e ? i > 0 && 0 >= f ? (h = n.top + i + t.collisionHeight - e - u, n.top += i - h) : n.top = f > 0 && 0 >= i ? u : i > f ? u + e - t.collisionHeight : u : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = r(n.top - s, n.top)
							}
						},
						flip: {
							left: function (n, i) {
								var o, s, r = i.within,
									y = r.offset.left + r.scrollLeft,
									c = r.width,
									h = r.isWindow ? r.scrollLeft : r.offset.left,
									l = n.left - i.collisionPosition.marginLeft,
									a = l - h,
									v = l + i.collisionWidth - c - h,
									u = "left" === i.my[0] ? -i.elemWidth : "right" === i.my[0] ? i.elemWidth : 0,
									f = "left" === i.at[0] ? i.targetWidth : "right" === i.at[0] ? -i.targetWidth : 0,
									e = -2 * i.offset[0];
								0 > a ? (o = n.left + u + f + e + i.collisionWidth - c - y, (0 > o || t(a) > o) && (n.left += u + f + e)) : v > 0 && (s = n.left - i.collisionPosition.marginLeft + u + f + e - h, (s > 0 || v > t(s)) && (n.left += u + f + e))
							},
							top: function (n, i) {
								var o, s, r = i.within,
									y = r.offset.top + r.scrollTop,
									a = r.height,
									h = r.isWindow ? r.scrollTop : r.offset.top,
									v = n.top - i.collisionPosition.marginTop,
									c = v - h,
									l = v + i.collisionHeight - a - h,
									p = "top" === i.my[1],
									u = p ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0,
									f = "top" === i.at[1] ? i.targetHeight : "bottom" === i.at[1] ? -i.targetHeight : 0,
									e = -2 * i.offset[1];
								0 > c ? (s = n.top + u + f + e + i.collisionHeight - a - y, n.top + u + f + e > c && (0 > s || t(c) > s) && (n.top += u + f + e)) : l > 0 && (o = n.top - i.collisionPosition.marginTop + u + f + e - h, n.top + u + f + e > l && (o > 0 || l > t(o)) && (n.top += u + f + e))
							}
						},
						flipfit: {
							left: function () {
								n.ui.position.flip.left.apply(this, arguments);
								n.ui.position.fit.left.apply(this, arguments)
							},
							top: function () {
								n.ui.position.flip.top.apply(this, arguments);
								n.ui.position.fit.top.apply(this, arguments)
							}
						}
					},
					function () {
						var t, i, r, u, f, o = document.getElementsByTagName("body")[0],
							s = document.createElement("div");
						t = document.createElement(o ? "div" : "body");
						r = {
							visibility: "hidden",
							width: 0,
							height: 0,
							border: 0,
							margin: 0,
							background: "none"
						};
						o && n.extend(r, {
							position: "absolute",
							left: "-1000px",
							top: "-1000px"
						});
						for (f in r) t.style[f] = r[f];
						t.appendChild(s);
						i = o || document.documentElement;
						i.insertBefore(t, i.firstChild);
						s.style.cssText = "position: absolute; left: 10.7432222px;";
						u = n(s).offset().left;
						e = u > 10 && 11 > u;
						t.innerHTML = "";
						i.removeChild(t)
					}()
			}();
		n.ui.position;
		n.widget("ui.draggable", n.ui.mouse, {
			version: "1.11.1",
			widgetEventPrefix: "drag",
			options: {
				addClasses: !0,
				appendTo: "parent",
				axis: !1,
				connectToSortable: !1,
				containment: !1,
				cursor: "auto",
				cursorAt: !1,
				grid: !1,
				handle: !1,
				helper: "original",
				iframeFix: !1,
				opacity: !1,
				refreshPositions: !1,
				revert: !1,
				revertDuration: 500,
				scope: "default",
				scroll: !0,
				scrollSensitivity: 20,
				scrollSpeed: 20,
				snap: !1,
				snapMode: "both",
				snapTolerance: 20,
				stack: !1,
				zIndex: !1,
				drag: null,
				start: null,
				stop: null
			},
			_create: function () {
				"original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
				this.options.addClasses && this.element.addClass("ui-draggable");
				this.options.disabled && this.element.addClass("ui-draggable-disabled");
				this._setHandleClassName();
				this._mouseInit()
			},
			_setOption: function (n, t) {
				this._super(n, t);
				"handle" === n && (this._removeHandleClassName(), this._setHandleClassName())
			},
			_destroy: function () {
				return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), this._mouseDestroy(), void 0)
			},
			_mouseCapture: function (t) {
				var i = this.document[0],
					r = this.options;
				try {
					i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && n(i.activeElement).blur()
				} catch (u) {}
				return this.helper || r.disabled || n(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (n(r.iframeFix === !0 ? "iframe" : r.iframeFix).each(function () {
					n("<div class='ui-draggable-iframeFix' style='background: #fff;'><\/div>").css({
						width: this.offsetWidth + "px",
						height: this.offsetHeight + "px",
						position: "absolute",
						opacity: "0.001",
						zIndex: 1e3
					}).css(n(this).offset()).appendTo("body")
				}), !0) : !1)
			},
			_mouseStart: function (t) {
				var i = this.options;
				return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), n.ui.ddmanager && (n.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
					top: this.offset.top - this.margins.top,
					left: this.offset.left - this.margins.left
				}, this.offset.scroll = !1, n.extend(this.offset, {
					click: {
						left: t.pageX - this.offset.left,
						top: t.pageY - this.offset.top
					},
					parent: this._getParentOffset(),
					relative: this._getRelativeOffset()
				}), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), n.ui.ddmanager && n.ui.ddmanager.dragStart(this, t), !0)
			},
			_mouseDrag: function (t, i) {
				if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
					var r = this._uiHash();
					if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
					this.position = r.position
				}
				return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", n.ui.ddmanager && n.ui.ddmanager.drag(this, t), !1
			},
			_mouseStop: function (t) {
				var r = this,
					i = !1;
				return n.ui.ddmanager && !this.options.dropBehaviour && (i = n.ui.ddmanager.drop(this, t)), this.dropped && (i = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !i || "valid" === this.options.revert && i || this.options.revert === !0 || n.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? n(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
					r._trigger("stop", t) !== !1 && r._clear()
				}) : this._trigger("stop", t) !== !1 && this._clear(), !1
			},
			_mouseUp: function (t) {
				return n("div.ui-draggable-iframeFix").each(function () {
					this.parentNode.removeChild(this)
				}), n.ui.ddmanager && n.ui.ddmanager.dragStop(this, t), this.element.focus(), n.ui.mouse.prototype._mouseUp.call(this, t)
			},
			cancel: function () {
				return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
			},
			_getHandle: function (t) {
				return this.options.handle ? !!n(t.target).closest(this.element.find(this.options.handle)).length : !0
			},
			_setHandleClassName: function () {
				this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
				this.handleElement.addClass("ui-draggable-handle")
			},
			_removeHandleClassName: function () {
				this.handleElement.removeClass("ui-draggable-handle")
			},
			_createHelper: function (t) {
				var r = this.options,
					i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t])) : "clone" === r.helper ? this.element.clone().removeAttr("id") : this.element;
				return i.parents("body").length || i.appendTo("parent" === r.appendTo ? this.element[0].parentNode : r.appendTo), i[0] === this.element[0] || /(fixed|absolute)/.test(i.css("position")) || i.css("position", "absolute"), i
			},
			_adjustOffsetFromHelper: function (t) {
				"string" == typeof t && (t = t.split(" "));
				n.isArray(t) && (t = {
					left: +t[0],
					top: +t[1] || 0
				});
				"left" in t && (this.offset.click.left = t.left + this.margins.left);
				"right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
				"top" in t && (this.offset.click.top = t.top + this.margins.top);
				"bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
			},
			_isRootNode: function (n) {
				return /(html|body)/i.test(n.tagName) || n === this.document[0]
			},
			_getParentOffset: function () {
				var t = this.offsetParent.offset(),
					i = this.document[0];
				return "absolute" === this.cssPosition && this.scrollParent[0] !== i && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {
					top: 0,
					left: 0
				}), {
					top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
					left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
				}
			},
			_getRelativeOffset: function () {
				if ("relative" !== this.cssPosition) return {
					top: 0,
					left: 0
				};
				var n = this.element.position(),
					t = this._isRootNode(this.scrollParent[0]);
				return {
					top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
					left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
				}
			},
			_cacheMargins: function () {
				this.margins = {
					left: parseInt(this.element.css("marginLeft"), 10) || 0,
					top: parseInt(this.element.css("marginTop"), 10) || 0,
					right: parseInt(this.element.css("marginRight"), 10) || 0,
					bottom: parseInt(this.element.css("marginBottom"), 10) || 0
				}
			},
			_cacheHelperProportions: function () {
				this.helperProportions = {
					width: this.helper.outerWidth(),
					height: this.helper.outerHeight()
				}
			},
			_setContainment: function () {
				var f, t, i, r = this.options,
					u = this.document[0];
				return this.relativeContainer = null, r.containment ? "window" === r.containment ? (this.containment = [n(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, n(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, n(window).scrollLeft() + n(window).width() - this.helperProportions.width - this.margins.left, n(window).scrollTop() + (n(window).height() || u.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === r.containment ? (this.containment = [0, 0, n(u).width() - this.helperProportions.width - this.margins.left, (n(u).height() || u.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : r.containment.constructor === Array ? (this.containment = r.containment, void 0) : ("parent" === r.containment && (r.containment = this.helper[0].parentNode), t = n(r.containment), i = t[0], i && (f = "hidden" !== t.css("overflow"), this.containment = [(parseInt(t.css("borderLeftWidth"), 10) || 0) + (parseInt(t.css("paddingLeft"), 10) || 0), (parseInt(t.css("borderTopWidth"), 10) || 0) + (parseInt(t.css("paddingTop"), 10) || 0), (f ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t.css("borderRightWidth"), 10) || 0) - (parseInt(t.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t.css("borderBottomWidth"), 10) || 0) - (parseInt(t.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = t), void 0) : (this.containment = null, void 0)
			},
			_convertPositionTo: function (n, t) {
				t || (t = this.position);
				var i = "absolute" === n ? 1 : -1,
					r = this._isRootNode(this.scrollParent[0]);
				return {
					top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top) * i,
					left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left) * i
				}
			},
			_generatePosition: function (n, t) {
				var i, s, u, f, r = this.options,
					h = this._isRootNode(this.scrollParent[0]),
					e = n.pageX,
					o = n.pageY;
				return h && this.offset.scroll || (this.offset.scroll = {
					top: this.scrollParent.scrollTop(),
					left: this.scrollParent.scrollLeft()
				}), t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, n.pageX - this.offset.click.left < i[0] && (e = i[0] + this.offset.click.left), n.pageY - this.offset.click.top < i[1] && (o = i[1] + this.offset.click.top), n.pageX - this.offset.click.left > i[2] && (e = i[2] + this.offset.click.left), n.pageY - this.offset.click.top > i[3] && (o = i[3] + this.offset.click.top)), r.grid && (u = r.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, o = i ? u - this.offset.click.top >= i[1] || u - this.offset.click.top > i[3] ? u : u - this.offset.click.top >= i[1] ? u - r.grid[1] : u + r.grid[1] : u, f = r.grid[0] ? this.originalPageX + Math.round((e - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, e = i ? f - this.offset.click.left >= i[0] || f - this.offset.click.left > i[2] ? f : f - this.offset.click.left >= i[0] ? f - r.grid[0] : f + r.grid[0] : f), "y" === r.axis && (e = this.originalPageX), "x" === r.axis && (o = this.originalPageY)), {
					top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
					left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
				}
			},
			_clear: function () {
				this.helper.removeClass("ui-draggable-dragging");
				this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove();
				this.helper = null;
				this.cancelHelperRemoval = !1;
				this.destroyOnClear && this.destroy()
			},
			_trigger: function (t, i, r) {
				return r = r || this._uiHash(), n.ui.plugin.call(this, t, [i, r, this], !0), "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")), n.Widget.prototype._trigger.call(this, t, i, r)
			},
			plugins: {},
			_uiHash: function () {
				return {
					helper: this.helper,
					position: this.position,
					originalPosition: this.originalPosition,
					offset: this.positionAbs
				}
			}
		});
		n.ui.plugin.add("draggable", "connectToSortable", {
			start: function (t, i, r) {
				var u = r.options,
					f = n.extend({}, i, {
						item: r.element
					});
				r.sortables = [];
				n(u.connectToSortable).each(function () {
					var i = n(this).sortable("instance");
					i && !i.options.disabled && (r.sortables.push({
						instance: i,
						shouldRevert: i.options.revert
					}), i.refreshPositions(), i._trigger("activate", t, f))
				})
			},
			stop: function (t, i, r) {
				var u = n.extend({}, i, {
					item: r.element
				});
				n.each(r.sortables, function () {
					this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" === r.options.helper && this.instance.currentItem.css({
						top: "auto",
						left: "auto"
					})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, u))
				})
			},
			drag: function (t, i, r) {
				var u = this;
				n.each(r.sortables, function () {
					var f = !1,
						e = this;
					this.instance.positionAbs = r.positionAbs;
					this.instance.helperProportions = r.helperProportions;
					this.instance.offset.click = r.offset.click;
					this.instance._intersectsWith(this.instance.containerCache) && (f = !0, n.each(r.sortables, function () {
						return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this !== e && this.instance._intersectsWith(this.instance.containerCache) && n.contains(e.instance.element[0], this.instance.element[0]) && (f = !1), f
					}));
					f ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = n(u).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
						return i.helper[0]
					}, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
				})
			}
		});
		n.ui.plugin.add("draggable", "cursor", {
			start: function (t, i, r) {
				var u = n("body"),
					f = r.options;
				u.css("cursor") && (f._cursor = u.css("cursor"));
				u.css("cursor", f.cursor)
			},
			stop: function (t, i, r) {
				var u = r.options;
				u._cursor && n("body").css("cursor", u._cursor)
			}
		});
		n.ui.plugin.add("draggable", "opacity", {
			start: function (t, i, r) {
				var u = n(i.helper),
					f = r.options;
				u.css("opacity") && (f._opacity = u.css("opacity"));
				u.css("opacity", f.opacity)
			},
			stop: function (t, i, r) {
				var u = r.options;
				u._opacity && n(i.helper).css("opacity", u._opacity)
			}
		});
		n.ui.plugin.add("draggable", "scroll", {
			start: function (n, t, i) {
				i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1));
				i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
			},
			drag: function (t, i, r) {
				var u = r.options,
					o = !1,
					e = r.scrollParentNotHidden[0],
					f = r.document[0];
				e !== f && "HTML" !== e.tagName ? (u.axis && "x" === u.axis || (r.overflowOffset.top + e.offsetHeight - t.pageY < u.scrollSensitivity ? e.scrollTop = o = e.scrollTop + u.scrollSpeed : t.pageY - r.overflowOffset.top < u.scrollSensitivity && (e.scrollTop = o = e.scrollTop - u.scrollSpeed)), u.axis && "y" === u.axis || (r.overflowOffset.left + e.offsetWidth - t.pageX < u.scrollSensitivity ? e.scrollLeft = o = e.scrollLeft + u.scrollSpeed : t.pageX - r.overflowOffset.left < u.scrollSensitivity && (e.scrollLeft = o = e.scrollLeft - u.scrollSpeed))) : (u.axis && "x" === u.axis || (t.pageY - n(f).scrollTop() < u.scrollSensitivity ? o = n(f).scrollTop(n(f).scrollTop() - u.scrollSpeed) : n(window).height() - (t.pageY - n(f).scrollTop()) < u.scrollSensitivity && (o = n(f).scrollTop(n(f).scrollTop() + u.scrollSpeed))), u.axis && "y" === u.axis || (t.pageX - n(f).scrollLeft() < u.scrollSensitivity ? o = n(f).scrollLeft(n(f).scrollLeft() - u.scrollSpeed) : n(window).width() - (t.pageX - n(f).scrollLeft()) < u.scrollSensitivity && (o = n(f).scrollLeft(n(f).scrollLeft() + u.scrollSpeed))));
				o !== !1 && n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(r, t)
			}
		});
		n.ui.plugin.add("draggable", "snap", {
			start: function (t, i, r) {
				var u = r.options;
				r.snapElements = [];
				n(u.snap.constructor !== String ? u.snap.items || ":data(ui-draggable)" : u.snap).each(function () {
					var t = n(this),
						i = t.offset();
					this !== r.element[0] && r.snapElements.push({
						item: this,
						width: t.outerWidth(),
						height: t.outerHeight(),
						top: i.top,
						left: i.left
					})
				})
			},
			drag: function (t, i, r) {
				for (var e, o, s, h, c, a, l, v, w, b = r.options, f = b.snapTolerance, y = i.offset.left, k = y + r.helperProportions.width, p = i.offset.top, d = p + r.helperProportions.height, u = r.snapElements.length - 1; u >= 0; u--) c = r.snapElements[u].left, a = c + r.snapElements[u].width, l = r.snapElements[u].top, v = l + r.snapElements[u].height, c - f > k || y > a + f || l - f > d || p > v + f || !n.contains(r.snapElements[u].item.ownerDocument, r.snapElements[u].item) ? (r.snapElements[u].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, n.extend(r._uiHash(), {
					snapItem: r.snapElements[u].item
				})), r.snapElements[u].snapping = !1) : ("inner" !== b.snapMode && (e = f >= Math.abs(l - d), o = f >= Math.abs(v - p), s = f >= Math.abs(c - k), h = f >= Math.abs(a - y), e && (i.position.top = r._convertPositionTo("relative", {
					top: l - r.helperProportions.height,
					left: 0
				}).top - r.margins.top), o && (i.position.top = r._convertPositionTo("relative", {
					top: v,
					left: 0
				}).top - r.margins.top), s && (i.position.left = r._convertPositionTo("relative", {
					top: 0,
					left: c - r.helperProportions.width
				}).left - r.margins.left), h && (i.position.left = r._convertPositionTo("relative", {
					top: 0,
					left: a
				}).left - r.margins.left)), w = e || o || s || h, "outer" !== b.snapMode && (e = f >= Math.abs(l - p), o = f >= Math.abs(v - d), s = f >= Math.abs(c - y), h = f >= Math.abs(a - k), e && (i.position.top = r._convertPositionTo("relative", {
					top: l,
					left: 0
				}).top - r.margins.top), o && (i.position.top = r._convertPositionTo("relative", {
					top: v - r.helperProportions.height,
					left: 0
				}).top - r.margins.top), s && (i.position.left = r._convertPositionTo("relative", {
					top: 0,
					left: c
				}).left - r.margins.left), h && (i.position.left = r._convertPositionTo("relative", {
					top: 0,
					left: a - r.helperProportions.width
				}).left - r.margins.left)), !r.snapElements[u].snapping && (e || o || s || h || w) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, n.extend(r._uiHash(), {
					snapItem: r.snapElements[u].item
				})), r.snapElements[u].snapping = e || o || s || h || w)
			}
		});
		n.ui.plugin.add("draggable", "stack", {
			start: function (t, i, r) {
				var f, e = r.options,
					u = n.makeArray(n(e.stack)).sort(function (t, i) {
						return (parseInt(n(t).css("zIndex"), 10) || 0) - (parseInt(n(i).css("zIndex"), 10) || 0)
					});
				u.length && (f = parseInt(n(u[0]).css("zIndex"), 10) || 0, n(u).each(function (t) {
					n(this).css("zIndex", f + t)
				}), this.css("zIndex", f + u.length))
			}
		});
		n.ui.plugin.add("draggable", "zIndex", {
			start: function (t, i, r) {
				var u = n(i.helper),
					f = r.options;
				u.css("zIndex") && (f._zIndex = u.css("zIndex"));
				u.css("zIndex", f.zIndex)
			},
			stop: function (t, i, r) {
				var u = r.options;
				u._zIndex && n(i.helper).css("zIndex", u._zIndex)
			}
		});
		n.ui.draggable;
		n.widget("ui.droppable", {
			version: "1.11.1",
			widgetEventPrefix: "drop",
			options: {
				accept: "*",
				activeClass: !1,
				addClasses: !0,
				greedy: !1,
				hoverClass: !1,
				scope: "default",
				tolerance: "intersect",
				activate: null,
				deactivate: null,
				drop: null,
				out: null,
				over: null
			},
			_create: function () {
				var t, i = this.options,
					r = i.accept;
				this.isover = !1;
				this.isout = !0;
				this.accept = n.isFunction(r) ? r : function (n) {
					return n.is(r)
				};
				this.proportions = function () {
					return arguments.length ? (t = arguments[0], void 0) : t ? t : t = {
						width: this.element[0].offsetWidth,
						height: this.element[0].offsetHeight
					}
				};
				this._addToManager(i.scope);
				i.addClasses && this.element.addClass("ui-droppable")
			},
			_addToManager: function (t) {
				n.ui.ddmanager.droppables[t] = n.ui.ddmanager.droppables[t] || [];
				n.ui.ddmanager.droppables[t].push(this)
			},
			_splice: function (n) {
				for (var t = 0; n.length > t; t++) n[t] === this && n.splice(t, 1)
			},
			_destroy: function () {
				var t = n.ui.ddmanager.droppables[this.options.scope];
				this._splice(t);
				this.element.removeClass("ui-droppable ui-droppable-disabled")
			},
			_setOption: function (t, i) {
				if ("accept" === t) this.accept = n.isFunction(i) ? i : function (n) {
					return n.is(i)
				};
				else if ("scope" === t) {
					var r = n.ui.ddmanager.droppables[this.options.scope];
					this._splice(r);
					this._addToManager(i)
				}
				this._super(t, i)
			},
			_activate: function (t) {
				var i = n.ui.ddmanager.current;
				this.options.activeClass && this.element.addClass(this.options.activeClass);
				i && this._trigger("activate", t, this.ui(i))
			},
			_deactivate: function (t) {
				var i = n.ui.ddmanager.current;
				this.options.activeClass && this.element.removeClass(this.options.activeClass);
				i && this._trigger("deactivate", t, this.ui(i))
			},
			_over: function (t) {
				var i = n.ui.ddmanager.current;
				i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i)))
			},
			_out: function (t) {
				var i = n.ui.ddmanager.current;
				i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i)))
			},
			_drop: function (t, i) {
				var r = i || n.ui.ddmanager.current,
					u = !1;
				return r && (r.currentItem || r.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
					var i = n(this).droppable("instance");
					if (i.options.greedy && !i.options.disabled && i.options.scope === r.options.scope && i.accept.call(i.element[0], r.currentItem || r.element) && n.ui.intersect(r, n.extend(i, {
							offset: i.element.offset()
						}), i.options.tolerance, t)) return (u = !0, !1)
				}), u ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(r)), this.element) : !1) : !1
			},
			ui: function (n) {
				return {
					draggable: n.currentItem || n.element,
					helper: n.helper,
					position: n.position,
					offset: n.positionAbs
				}
			}
		});
		n.ui.intersect = function () {
			function n(n, t, i) {
				return n >= t && t + i > n
			}
			return function (t, i, r, u) {
				if (!i.offset) return !1;
				var o = (t.positionAbs || t.position.absolute).left,
					s = (t.positionAbs || t.position.absolute).top,
					h = o + t.helperProportions.width,
					c = s + t.helperProportions.height,
					f = i.offset.left,
					e = i.offset.top,
					l = f + i.proportions().width,
					a = e + i.proportions().height;
				switch (r) {
					case "fit":
						return o >= f && l >= h && s >= e && a >= c;
					case "intersect":
						return o + t.helperProportions.width / 2 > f && l > h - t.helperProportions.width / 2 && s + t.helperProportions.height / 2 > e && a > c - t.helperProportions.height / 2;
					case "pointer":
						return n(u.pageY, e, i.proportions().height) && n(u.pageX, f, i.proportions().width);
					case "touch":
						return (s >= e && a >= s || c >= e && a >= c || e > s && c > a) && (o >= f && l >= o || h >= f && l >= h || f > o && h > l);
					default:
						return !1
				}
			}
		}();
		n.ui.ddmanager = {
			current: null,
			droppables: {
				"default": []
			},
			prepareOffsets: function (t, i) {
				var r, f, u = n.ui.ddmanager.droppables[t.options.scope] || [],
					o = i ? i.type : null,
					e = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
				n: for (r = 0; u.length > r; r++)
					if (!(u[r].options.disabled || t && !u[r].accept.call(u[r].element[0], t.currentItem || t.element))) {
						for (f = 0; e.length > f; f++)
							if (e[f] === u[r].element[0]) {
								u[r].proportions().height = 0;
								continue n
							}
						u[r].visible = "none" !== u[r].element.css("display");
						u[r].visible && ("mousedown" === o && u[r]._activate.call(u[r], i), u[r].offset = u[r].element.offset(), u[r].proportions({
							width: u[r].element[0].offsetWidth,
							height: u[r].element[0].offsetHeight
						}))
					}
			},
			drop: function (t, i) {
				var r = !1;
				return n.each((n.ui.ddmanager.droppables[t.options.scope] || []).slice(), function () {
					this.options && (!this.options.disabled && this.visible && n.ui.intersect(t, this, this.options.tolerance, i) && (r = this._drop.call(this, i) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
				}), r
			},
			dragStart: function (t, i) {
				t.element.parentsUntil("body").bind("scroll.droppable", function () {
					t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
				})
			},
			drag: function (t, i) {
				t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, i);
				n.each(n.ui.ddmanager.droppables[t.options.scope] || [], function () {
					if (!this.options.disabled && !this.greedyChild && this.visible) {
						var r, e, f, o = n.ui.intersect(t, this, this.options.tolerance, i),
							u = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
						u && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function () {
							return n(this).droppable("instance").options.scope === e
						}), f.length && (r = n(f[0]).droppable("instance"), r.greedyChild = "isover" === u)), r && "isover" === u && (r.isover = !1, r.isout = !0, r._out.call(r, i)), this[u] = !0, this["isout" === u ? "isover" : "isout"] = !1, this["isover" === u ? "_over" : "_out"].call(this, i), r && "isout" === u && (r.isout = !1, r.isover = !0, r._over.call(r, i)))
					}
				})
			},
			dragStop: function (t, i) {
				t.element.parentsUntil("body").unbind("scroll.droppable");
				t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
			}
		};
		n.ui.droppable;
		n.widget("ui.resizable", n.ui.mouse, {
			version: "1.11.1",
			widgetEventPrefix: "resize",
			options: {
				alsoResize: !1,
				animate: !1,
				animateDuration: "slow",
				animateEasing: "swing",
				aspectRatio: !1,
				autoHide: !1,
				containment: !1,
				ghost: !1,
				grid: !1,
				handles: "e,s,se",
				helper: !1,
				maxHeight: null,
				maxWidth: null,
				minHeight: 10,
				minWidth: 10,
				zIndex: 90,
				resize: null,
				start: null,
				stop: null
			},
			_num: function (n) {
				return parseInt(n, 10) || 0
			},
			_isNumber: function (n) {
				return !isNaN(parseInt(n, 10))
			},
			_hasScroll: function (t, i) {
				if ("hidden" === n(t).css("overflow")) return !1;
				var r = i && "left" === i ? "scrollLeft" : "scrollTop",
					u = !1;
				return t[r] > 0 ? !0 : (t[r] = 1, u = t[r] > 0, t[r] = 0, u)
			},
			_create: function () {
				var e, f, r, i, o, u = this,
					t = this.options;
				if (this.element.addClass("ui-resizable"), n.extend(this, {
						_aspectRatio: !!t.aspectRatio,
						aspectRatio: t.aspectRatio,
						originalElement: this.element,
						_proportionallyResizeElements: [],
						_helper: t.helper || t.ghost || t.animate ? t.helper || "ui-resizable-helper" : null
					}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(n("<div class='ui-wrapper' style='overflow: hidden;'><\/div>").css({
						position: this.element.css("position"),
						width: this.element.outerWidth(),
						height: this.element.outerHeight(),
						top: this.element.css("top"),
						left: this.element.css("left")
					})), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
						marginLeft: this.originalElement.css("marginLeft"),
						marginTop: this.originalElement.css("marginTop"),
						marginRight: this.originalElement.css("marginRight"),
						marginBottom: this.originalElement.css("marginBottom")
					}), this.originalElement.css({
						marginLeft: 0,
						marginTop: 0,
						marginRight: 0,
						marginBottom: 0
					}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
						position: "static",
						zoom: 1,
						display: "block"
					})), this.originalElement.css({
						margin: this.originalElement.css("margin")
					}), this._proportionallyResize()), this.handles = t.handles || (n(".ui-resizable-handle", this.element).length ? {
						n: ".ui-resizable-n",
						e: ".ui-resizable-e",
						s: ".ui-resizable-s",
						w: ".ui-resizable-w",
						se: ".ui-resizable-se",
						sw: ".ui-resizable-sw",
						ne: ".ui-resizable-ne",
						nw: ".ui-resizable-nw"
					} : "e,s,se"), this.handles.constructor === String)
					for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, f = 0; e.length > f; f++) r = n.trim(e[f]), o = "ui-resizable-" + r, i = n("<div class='ui-resizable-handle " + o + "'><\/div>"), i.css({
						zIndex: t.zIndex
					}), "se" === r && i.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[r] = ".ui-resizable-" + r, this.element.append(i);
				this._renderAxis = function (t) {
					var i, r, u, f;
					t = t || this.element;
					for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = this.element.children(this.handles[i]).first().show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (r = n(this.handles[i], this.element), f = /sw|ne|nw|se|n|s/.test(i) ? r.outerHeight() : r.outerWidth(), u = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(u, f), this._proportionallyResize()), n(this.handles[i]).length
				};
				this._renderAxis(this.element);
				this._handles = n(".ui-resizable-handle", this.element).disableSelection();
				this._handles.mouseover(function () {
					u.resizing || (this.className && (i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), u.axis = i && i[1] ? i[1] : "se")
				});
				t.autoHide && (this._handles.hide(), n(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
					t.disabled || (n(this).removeClass("ui-resizable-autohide"), u._handles.show())
				}).mouseleave(function () {
					t.disabled || u.resizing || (n(this).addClass("ui-resizable-autohide"), u._handles.hide())
				}));
				this._mouseInit()
			},
			_destroy: function () {
				this._mouseDestroy();
				var t, i = function (t) {
					n(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
				};
				return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
					position: t.css("position"),
					width: t.outerWidth(),
					height: t.outerHeight(),
					top: t.css("top"),
					left: t.css("left")
				}).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
			},
			_mouseCapture: function (t) {
				var r, i, u = !1;
				for (r in this.handles) i = n(this.handles[r])[0], (i === t.target || n.contains(i, t.target)) && (u = !0);
				return !this.options.disabled && u
			},
			_mouseStart: function (t) {
				var u, f, e, r = this.options,
					i = this.element;
				return this.resizing = !0, this._renderProxy(), u = this._num(this.helper.css("left")), f = this._num(this.helper.css("top")), r.containment && (u += n(r.containment).scrollLeft() || 0, f += n(r.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
					left: u,
					top: f
				}, this.size = this._helper ? {
					width: this.helper.width(),
					height: this.helper.height()
				} : {
					width: i.width(),
					height: i.height()
				}, this.originalSize = this._helper ? {
					width: i.outerWidth(),
					height: i.outerHeight()
				} : {
					width: i.width(),
					height: i.height()
				}, this.sizeDiff = {
					width: i.outerWidth() - i.width(),
					height: i.outerHeight() - i.height()
				}, this.originalPosition = {
					left: u,
					top: f
				}, this.originalMousePosition = {
					left: t.pageX,
					top: t.pageY
				}, this.aspectRatio = "number" == typeof r.aspectRatio ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1, e = n(".ui-resizable-" + this.axis).css("cursor"), n("body").css("cursor", "auto" === e ? this.axis + "-resize" : e), i.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
			},
			_mouseDrag: function (t) {
				var i, r, u = this.originalMousePosition,
					e = this.axis,
					o = t.pageX - u.left || 0,
					s = t.pageY - u.top || 0,
					f = this._change[e];
				return this._updatePrevProperties(), f ? (i = f.apply(this, [t, o, s]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), r = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), n.isEmptyObject(r) || (this._updatePrevProperties(), this._trigger("resize", t, this.ui()), this._applyChanges()), !1) : !1
			},
			_mouseStop: function (t) {
				this.resizing = !1;
				var r, u, f, e, o, s, h, c = this.options,
					i = this;
				return this._helper && (r = this._proportionallyResizeElements, u = r.length && /textarea/i.test(r[0].nodeName), f = u && this._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height, e = u ? 0 : i.sizeDiff.width, o = {
					width: i.helper.width() - e,
					height: i.helper.height() - f
				}, s = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, h = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null, c.animate || this.element.css(n.extend(o, {
					top: h,
					left: s
				})), i.helper.height(i.size.height), i.helper.width(i.size.width), this._helper && !c.animate && this._proportionallyResize()), n("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
			},
			_updatePrevProperties: function () {
				this.prevPosition = {
					top: this.position.top,
					left: this.position.left
				};
				this.prevSize = {
					width: this.size.width,
					height: this.size.height
				}
			},
			_applyChanges: function () {
				var n = {};
				return this.position.top !== this.prevPosition.top && (n.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (n.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (n.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (n.height = this.size.height + "px"), this.helper.css(n), n
			},
			_updateVirtualBoundaries: function (n) {
				var r, u, f, e, t, i = this.options;
				t = {
					minWidth: this._isNumber(i.minWidth) ? i.minWidth : 0,
					maxWidth: this._isNumber(i.maxWidth) ? i.maxWidth : 1 / 0,
					minHeight: this._isNumber(i.minHeight) ? i.minHeight : 0,
					maxHeight: this._isNumber(i.maxHeight) ? i.maxHeight : 1 / 0
				};
				(this._aspectRatio || n) && (r = t.minHeight * this.aspectRatio, f = t.minWidth / this.aspectRatio, u = t.maxHeight * this.aspectRatio, e = t.maxWidth / this.aspectRatio, r > t.minWidth && (t.minWidth = r), f > t.minHeight && (t.minHeight = f), t.maxWidth > u && (t.maxWidth = u), t.maxHeight > e && (t.maxHeight = e));
				this._vBoundaries = t
			},
			_updateCache: function (n) {
				this.offset = this.helper.offset();
				this._isNumber(n.left) && (this.position.left = n.left);
				this._isNumber(n.top) && (this.position.top = n.top);
				this._isNumber(n.height) && (this.size.height = n.height);
				this._isNumber(n.width) && (this.size.width = n.width)
			},
			_updateRatio: function (n) {
				var t = this.position,
					i = this.size,
					r = this.axis;
				return this._isNumber(n.height) ? n.width = n.height * this.aspectRatio : this._isNumber(n.width) && (n.height = n.width / this.aspectRatio), "sw" === r && (n.left = t.left + (i.width - n.width), n.top = null), "nw" === r && (n.top = t.top + (i.height - n.height), n.left = t.left + (i.width - n.width)), n
			},
			_respectSize: function (n) {
				var t = this._vBoundaries,
					i = this.axis,
					r = this._isNumber(n.width) && t.maxWidth && t.maxWidth < n.width,
					u = this._isNumber(n.height) && t.maxHeight && t.maxHeight < n.height,
					f = this._isNumber(n.width) && t.minWidth && t.minWidth > n.width,
					e = this._isNumber(n.height) && t.minHeight && t.minHeight > n.height,
					o = this.originalPosition.left + this.originalSize.width,
					s = this.position.top + this.size.height,
					h = /sw|nw|w/.test(i),
					c = /nw|ne|n/.test(i);
				return f && (n.width = t.minWidth), e && (n.height = t.minHeight), r && (n.width = t.maxWidth), u && (n.height = t.maxHeight), f && h && (n.left = o - t.minWidth), r && h && (n.left = o - t.maxWidth), e && c && (n.top = s - t.minHeight), u && c && (n.top = s - t.maxHeight), n.width || n.height || n.left || !n.top ? n.width || n.height || n.top || !n.left || (n.left = null) : n.top = null, n
			},
			_getPaddingPlusBorderDimensions: function (n) {
				for (var t = 0, i = [], r = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], u = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")]; 4 > t; t++) i[t] = parseInt(r[t], 10) || 0, i[t] += parseInt(u[t], 10) || 0;
				return {
					height: i[0] + i[2],
					width: i[1] + i[3]
				}
			},
			_proportionallyResize: function () {
				if (this._proportionallyResizeElements.length)
					for (var n, t = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > t; t++) n = this._proportionallyResizeElements[t], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(n)), n.css({
						height: i.height() - this.outerDimensions.height || 0,
						width: i.width() - this.outerDimensions.width || 0
					})
			},
			_renderProxy: function () {
				var t = this.element,
					i = this.options;
				this.elementOffset = t.offset();
				this._helper ? (this.helper = this.helper || n("<div style='overflow:hidden;'><\/div>"), this.helper.addClass(this._helper).css({
					width: this.element.outerWidth() - 1,
					height: this.element.outerHeight() - 1,
					position: "absolute",
					left: this.elementOffset.left + "px",
					top: this.elementOffset.top + "px",
					zIndex: ++i.zIndex
				}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
			},
			_change: {
				e: function (n, t) {
					return {
						width: this.originalSize.width + t
					}
				},
				w: function (n, t) {
					var i = this.originalSize,
						r = this.originalPosition;
					return {
						left: r.left + t,
						width: i.width - t
					}
				},
				n: function (n, t, i) {
					var r = this.originalSize,
						u = this.originalPosition;
					return {
						top: u.top + i,
						height: r.height - i
					}
				},
				s: function (n, t, i) {
					return {
						height: this.originalSize.height + i
					}
				},
				se: function (t, i, r) {
					return n.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
				},
				sw: function (t, i, r) {
					return n.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
				},
				ne: function (t, i, r) {
					return n.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
				},
				nw: function (t, i, r) {
					return n.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
				}
			},
			_propagate: function (t, i) {
				n.ui.plugin.call(this, t, [i, this.ui()]);
				"resize" !== t && this._trigger(t, i, this.ui())
			},
			plugins: {},
			ui: function () {
				return {
					originalElement: this.originalElement,
					element: this.element,
					helper: this.helper,
					position: this.position,
					size: this.size,
					originalSize: this.originalSize,
					originalPosition: this.originalPosition
				}
			}
		});
		n.ui.plugin.add("resizable", "animate", {
			stop: function (t) {
				var i = n(this).resizable("instance"),
					u = i.options,
					r = i._proportionallyResizeElements,
					f = r.length && /textarea/i.test(r[0].nodeName),
					s = f && i._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height,
					h = f ? 0 : i.sizeDiff.width,
					c = {
						width: i.size.width - h,
						height: i.size.height - s
					},
					e = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
					o = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
				i.element.animate(n.extend(c, o && e ? {
					top: o,
					left: e
				} : {}), {
					duration: u.animateDuration,
					easing: u.animateEasing,
					step: function () {
						var u = {
							width: parseInt(i.element.css("width"), 10),
							height: parseInt(i.element.css("height"), 10),
							top: parseInt(i.element.css("top"), 10),
							left: parseInt(i.element.css("left"), 10)
						};
						r && r.length && n(r[0]).css({
							width: u.width,
							height: u.height
						});
						i._updateCache(u);
						i._propagate("resize", t)
					}
				})
			}
		});
		n.ui.plugin.add("resizable", "containment", {
			start: function () {
				var r, f, e, o, s, h, c, t = n(this).resizable("instance"),
					l = t.options,
					a = t.element,
					u = l.containment,
					i = u instanceof n ? u.get(0) : /parent/.test(u) ? a.parent().get(0) : u;
				i && (t.containerElement = n(i), /document/.test(u) || u === document ? (t.containerOffset = {
					left: 0,
					top: 0
				}, t.containerPosition = {
					left: 0,
					top: 0
				}, t.parentData = {
					element: n(document),
					left: 0,
					top: 0,
					width: n(document).width(),
					height: n(document).height() || document.body.parentNode.scrollHeight
				}) : (r = n(i), f = [], n(["Top", "Right", "Left", "Bottom"]).each(function (n, i) {
					f[n] = t._num(r.css("padding" + i))
				}), t.containerOffset = r.offset(), t.containerPosition = r.position(), t.containerSize = {
					height: r.innerHeight() - f[3],
					width: r.innerWidth() - f[1]
				}, e = t.containerOffset, o = t.containerSize.height, s = t.containerSize.width, h = t._hasScroll(i, "left") ? i.scrollWidth : s, c = t._hasScroll(i) ? i.scrollHeight : o, t.parentData = {
					element: i,
					left: e.left,
					top: e.top,
					width: h,
					height: c
				}))
			},
			resize: function (t) {
				var o, s, h, c, i = n(this).resizable("instance"),
					v = i.options,
					r = i.containerOffset,
					l = i.position,
					f = i._aspectRatio || t.shiftKey,
					e = {
						top: 0,
						left: 0
					},
					a = i.containerElement,
					u = !0;
				a[0] !== document && /static/.test(a.css("position")) && (e = r);
				l.left < (i._helper ? r.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - r.left : i.position.left - e.left), f && (i.size.height = i.size.width / i.aspectRatio, u = !1), i.position.left = v.helper ? r.left : 0);
				l.top < (i._helper ? r.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - r.top : i.position.top), f && (i.size.width = i.size.height * i.aspectRatio, u = !1), i.position.top = i._helper ? r.top : 0);
				h = i.containerElement.get(0) === i.element.parent().get(0);
				c = /relative|absolute/.test(i.containerElement.css("position"));
				h && c ? (i.offset.left = i.parentData.left + i.position.left, i.offset.top = i.parentData.top + i.position.top) : (i.offset.left = i.element.offset().left, i.offset.top = i.element.offset().top);
				o = Math.abs(i.sizeDiff.width + (i._helper ? i.offset.left - e.left : i.offset.left - r.left));
				s = Math.abs(i.sizeDiff.height + (i._helper ? i.offset.top - e.top : i.offset.top - r.top));
				o + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - o, f && (i.size.height = i.size.width / i.aspectRatio, u = !1));
				s + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - s, f && (i.size.width = i.size.height * i.aspectRatio, u = !1));
				u || (i.position.left = i.prevPosition.left, i.position.top = i.prevPosition.top, i.size.width = i.prevSize.width, i.size.height = i.prevSize.height)
			},
			stop: function () {
				var t = n(this).resizable("instance"),
					r = t.options,
					u = t.containerOffset,
					f = t.containerPosition,
					e = t.containerElement,
					i = n(t.helper),
					o = i.offset(),
					s = i.outerWidth() - t.sizeDiff.width,
					h = i.outerHeight() - t.sizeDiff.height;
				t._helper && !r.animate && /relative/.test(e.css("position")) && n(this).css({
					left: o.left - f.left - u.left,
					width: s,
					height: h
				});
				t._helper && !r.animate && /static/.test(e.css("position")) && n(this).css({
					left: o.left - f.left - u.left,
					width: s,
					height: h
				})
			}
		});
		n.ui.plugin.add("resizable", "alsoResize", {
			start: function () {
				var r = n(this).resizable("instance"),
					t = r.options,
					i = function (t) {
						n(t).each(function () {
							var t = n(this);
							t.data("ui-resizable-alsoresize", {
								width: parseInt(t.width(), 10),
								height: parseInt(t.height(), 10),
								left: parseInt(t.css("left"), 10),
								top: parseInt(t.css("top"), 10)
							})
						})
					};
				"object" != typeof t.alsoResize || t.alsoResize.parentNode ? i(t.alsoResize) : t.alsoResize.length ? (t.alsoResize = t.alsoResize[0], i(t.alsoResize)) : n.each(t.alsoResize, function (n) {
					i(n)
				})
			},
			resize: function (t, i) {
				var r = n(this).resizable("instance"),
					u = r.options,
					f = r.originalSize,
					e = r.originalPosition,
					s = {
						height: r.size.height - f.height || 0,
						width: r.size.width - f.width || 0,
						top: r.position.top - e.top || 0,
						left: r.position.left - e.left || 0
					},
					o = function (t, r) {
						n(t).each(function () {
							var t = n(this),
								f = n(this).data("ui-resizable-alsoresize"),
								u = {},
								e = r && r.length ? r : t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
							n.each(e, function (n, t) {
								var i = (f[t] || 0) + (s[t] || 0);
								i && i >= 0 && (u[t] = i || null)
							});
							t.css(u)
						})
					};
				"object" != typeof u.alsoResize || u.alsoResize.nodeType ? o(u.alsoResize) : n.each(u.alsoResize, function (n, t) {
					o(n, t)
				})
			},
			stop: function () {
				n(this).removeData("resizable-alsoresize")
			}
		});
		n.ui.plugin.add("resizable", "ghost", {
			start: function () {
				var t = n(this).resizable("instance"),
					i = t.options,
					r = t.size;
				t.ghost = t.originalElement.clone();
				t.ghost.css({
					opacity: .25,
					display: "block",
					position: "relative",
					height: r.height,
					width: r.width,
					margin: 0,
					left: 0,
					top: 0
				}).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : "");
				t.ghost.appendTo(t.helper)
			},
			resize: function () {
				var t = n(this).resizable("instance");
				t.ghost && t.ghost.css({
					position: "relative",
					height: t.size.height,
					width: t.size.width
				})
			},
			stop: function () {
				var t = n(this).resizable("instance");
				t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
			}
		});
		n.ui.plugin.add("resizable", "grid", {
			resize: function () {
				var h, t = n(this).resizable("instance"),
					i = t.options,
					y = t.size,
					e = t.originalSize,
					o = t.originalPosition,
					c = t.axis,
					l = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
					s = l[0] || 1,
					f = l[1] || 1,
					a = Math.round((y.width - e.width) / s) * s,
					v = Math.round((y.height - e.height) / f) * f,
					r = e.width + a,
					u = e.height + v,
					p = i.maxWidth && r > i.maxWidth,
					w = i.maxHeight && u > i.maxHeight,
					b = i.minWidth && i.minWidth > r,
					k = i.minHeight && i.minHeight > u;
				i.grid = l;
				b && (r += s);
				k && (u += f);
				p && (r -= s);
				w && (u -= f);
				/^(se|s|e)$/.test(c) ? (t.size.width = r, t.size.height = u) : /^(ne)$/.test(c) ? (t.size.width = r, t.size.height = u, t.position.top = o.top - v) : /^(sw)$/.test(c) ? (t.size.width = r, t.size.height = u, t.position.left = o.left - a) : ((0 >= u - f || 0 >= r - s) && (h = t._getPaddingPlusBorderDimensions(this)), u - f > 0 ? (t.size.height = u, t.position.top = o.top - v) : (u = f - h.height, t.size.height = u, t.position.top = o.top + e.height - u), r - s > 0 ? (t.size.width = r, t.position.left = o.left - a) : (r = f - h.height, t.size.width = r, t.position.left = o.left + e.width - r))
			}
		});
		n.ui.resizable;
		n.widget("ui.selectable", n.ui.mouse, {
			version: "1.11.1",
			options: {
				appendTo: "body",
				autoRefresh: !0,
				distance: 0,
				filter: "*",
				tolerance: "touch",
				selected: null,
				selecting: null,
				start: null,
				stop: null,
				unselected: null,
				unselecting: null
			},
			_create: function () {
				var t, i = this;
				this.element.addClass("ui-selectable");
				this.dragged = !1;
				this.refresh = function () {
					t = n(i.options.filter, i.element[0]);
					t.addClass("ui-selectee");
					t.each(function () {
						var t = n(this),
							i = t.offset();
						n.data(this, "selectable-item", {
							element: this,
							$element: t,
							left: i.left,
							top: i.top,
							right: i.left + t.outerWidth(),
							bottom: i.top + t.outerHeight(),
							startselected: !1,
							selected: t.hasClass("ui-selected"),
							selecting: t.hasClass("ui-selecting"),
							unselecting: t.hasClass("ui-unselecting")
						})
					})
				};
				this.refresh();
				this.selectees = t.addClass("ui-selectee");
				this._mouseInit();
				this.helper = n("<div class='ui-selectable-helper'><\/div>")
			},
			_destroy: function () {
				this.selectees.removeClass("ui-selectee").removeData("selectable-item");
				this.element.removeClass("ui-selectable ui-selectable-disabled");
				this._mouseDestroy()
			},
			_mouseStart: function (t) {
				var i = this,
					r = this.options;
				this.opos = [t.pageX, t.pageY];
				this.options.disabled || (this.selectees = n(r.filter, this.element[0]), this._trigger("start", t), n(r.appendTo).append(this.helper), this.helper.css({
					left: t.pageX,
					top: t.pageY,
					width: 0,
					height: 0
				}), r.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
					var r = n.data(this, "selectable-item");
					r.startselected = !0;
					t.metaKey || t.ctrlKey || (r.$element.removeClass("ui-selected"), r.selected = !1, r.$element.addClass("ui-unselecting"), r.unselecting = !0, i._trigger("unselecting", t, {
						unselecting: r.element
					}))
				}), n(t.target).parents().addBack().each(function () {
					var u, r = n.data(this, "selectable-item");
					if (r) return (u = !t.metaKey && !t.ctrlKey || !r.$element.hasClass("ui-selected"), r.$element.removeClass(u ? "ui-unselecting" : "ui-selected").addClass(u ? "ui-selecting" : "ui-unselecting"), r.unselecting = !u, r.selecting = u, r.selected = u, u ? i._trigger("selecting", t, {
						selecting: r.element
					}) : i._trigger("unselecting", t, {
						unselecting: r.element
					}), !1)
				}))
			},
			_mouseDrag: function (t) {
				if (this.dragged = !0, !this.options.disabled) {
					var e, o = this,
						s = this.options,
						i = this.opos[0],
						r = this.opos[1],
						u = t.pageX,
						f = t.pageY;
					return i > u && (e = u, u = i, i = e), r > f && (e = f, f = r, r = e), this.helper.css({
						left: i,
						top: r,
						width: u - i,
						height: f - r
					}), this.selectees.each(function () {
						var e = n.data(this, "selectable-item"),
							h = !1;
						e && e.element !== o.element[0] && ("touch" === s.tolerance ? h = !(e.left > u || i > e.right || e.top > f || r > e.bottom) : "fit" === s.tolerance && (h = e.left > i && u > e.right && e.top > r && f > e.bottom), h ? (e.selected && (e.$element.removeClass("ui-selected"), e.selected = !1), e.unselecting && (e.$element.removeClass("ui-unselecting"), e.unselecting = !1), e.selecting || (e.$element.addClass("ui-selecting"), e.selecting = !0, o._trigger("selecting", t, {
							selecting: e.element
						}))) : (e.selecting && ((t.metaKey || t.ctrlKey) && e.startselected ? (e.$element.removeClass("ui-selecting"), e.selecting = !1, e.$element.addClass("ui-selected"), e.selected = !0) : (e.$element.removeClass("ui-selecting"), e.selecting = !1, e.startselected && (e.$element.addClass("ui-unselecting"), e.unselecting = !0), o._trigger("unselecting", t, {
							unselecting: e.element
						}))), e.selected && (t.metaKey || t.ctrlKey || e.startselected || (e.$element.removeClass("ui-selected"), e.selected = !1, e.$element.addClass("ui-unselecting"), e.unselecting = !0, o._trigger("unselecting", t, {
							unselecting: e.element
						})))))
					}), !1
				}
			},
			_mouseStop: function (t) {
				var i = this;
				return this.dragged = !1, n(".ui-unselecting", this.element[0]).each(function () {
					var r = n.data(this, "selectable-item");
					r.$element.removeClass("ui-unselecting");
					r.unselecting = !1;
					r.startselected = !1;
					i._trigger("unselected", t, {
						unselected: r.element
					})
				}), n(".ui-selecting", this.element[0]).each(function () {
					var r = n.data(this, "selectable-item");
					r.$element.removeClass("ui-selecting").addClass("ui-selected");
					r.selecting = !1;
					r.selected = !0;
					r.startselected = !0;
					i._trigger("selected", t, {
						selected: r.element
					})
				}), this._trigger("stop", t), this.helper.remove(), !1
			}
		});
		n.widget("ui.sortable", n.ui.mouse, {
			version: "1.11.1",
			widgetEventPrefix: "sort",
			ready: !1,
			options: {
				appendTo: "parent",
				axis: !1,
				connectWith: !1,
				containment: !1,
				cursor: "auto",
				cursorAt: !1,
				dropOnEmpty: !0,
				forcePlaceholderSize: !1,
				forceHelperSize: !1,
				grid: !1,
				handle: !1,
				helper: "original",
				items: "> *",
				opacity: !1,
				placeholder: !1,
				revert: !1,
				scroll: !0,
				scrollSensitivity: 20,
				scrollSpeed: 20,
				scope: "default",
				tolerance: "intersect",
				zIndex: 1e3,
				activate: null,
				beforeStop: null,
				change: null,
				deactivate: null,
				out: null,
				over: null,
				receive: null,
				remove: null,
				sort: null,
				start: null,
				stop: null,
				update: null
			},
			_isOverAxis: function (n, t, i) {
				return n >= t && t + i > n
			},
			_isFloating: function (n) {
				return /left|right/.test(n.css("float")) || /inline|table-cell/.test(n.css("display"))
			},
			_create: function () {
				var n = this.options;
				this.containerCache = {};
				this.element.addClass("ui-sortable");
				this.refresh();
				this.floating = this.items.length ? "x" === n.axis || this._isFloating(this.items[0].item) : !1;
				this.offset = this.element.offset();
				this._mouseInit();
				this._setHandleClassName();
				this.ready = !0
			},
			_setOption: function (n, t) {
				this._super(n, t);
				"handle" === n && this._setHandleClassName()
			},
			_setHandleClassName: function () {
				this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle");
				n.each(this.items, function () {
					(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
				})
			},
			_destroy: function () {
				this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle");
				this._mouseDestroy();
				for (var n = this.items.length - 1; n >= 0; n--) this.items[n].item.removeData(this.widgetName + "-item");
				return this
			},
			_mouseCapture: function (t, i) {
				var r = null,
					f = !1,
					u = this;
				return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(t), n(t.target).parents().each(function () {
					if (n.data(this, u.widgetName + "-item") === u) return (r = n(this), !1)
				}), n.data(t.target, u.widgetName + "-item") === u && (r = n(t.target)), r ? !this.options.handle || i || (n(this.options.handle, r).find("*").addBack().each(function () {
					this === t.target && (f = !0)
				}), f) ? (this.currentItem = r, this._removeCurrentsFromItems(), !0) : !1 : !1)
			},
			_mouseStart: function (t, i, r) {
				var f, e, u = this.options;
				if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
						top: this.offset.top - this.margins.top,
						left: this.offset.left - this.margins.left
					}, n.extend(this.offset, {
						click: {
							left: t.pageX - this.offset.left,
							top: t.pageY - this.offset.top
						},
						parent: this._getParentOffset(),
						relative: this._getRelativeOffset()
					}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt), this.domPosition = {
						prev: this.currentItem.prev()[0],
						parent: this.currentItem.parent()[0]
					}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), u.containment && this._setContainment(), u.cursor && "auto" !== u.cursor && (e = this.document.find("body"), this.storedCursor = e.css("cursor"), e.css("cursor", u.cursor), this.storedStylesheet = n("<style>*{ cursor: " + u.cursor + " !important; }<\/style>").appendTo(e)), u.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", u.opacity)), u.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", u.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !r)
					for (f = this.containers.length - 1; f >= 0; f--) this.containers[f]._trigger("activate", t, this._uiHash(this));
				return n.ui.ddmanager && (n.ui.ddmanager.current = this), n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
			},
			_mouseDrag: function (t) {
				var e, u, f, o, i = this.options,
					r = !1;
				for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - i.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (t.pageY - n(document).scrollTop() < i.scrollSensitivity ? r = n(document).scrollTop(n(document).scrollTop() - i.scrollSpeed) : n(window).height() - (t.pageY - n(document).scrollTop()) < i.scrollSensitivity && (r = n(document).scrollTop(n(document).scrollTop() + i.scrollSpeed)), t.pageX - n(document).scrollLeft() < i.scrollSensitivity ? r = n(document).scrollLeft(n(document).scrollLeft() - i.scrollSpeed) : n(window).width() - (t.pageX - n(document).scrollLeft()) < i.scrollSensitivity && (r = n(document).scrollLeft(n(document).scrollLeft() + i.scrollSpeed))), r !== !1 && n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e = this.items.length - 1; e >= 0; e--)
					if (u = this.items[e], f = u.item[0], o = this._intersectsWithPointer(u), o && u.instance === this.currentContainer && f !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== f && !n.contains(this.placeholder[0], f) && ("semi-dynamic" === this.options.type ? !n.contains(this.element[0], f) : !0)) {
						if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(u)) break;
						this._rearrange(t, u);
						this._trigger("change", t, this._uiHash());
						break
					}
				return this._contactContainers(t), n.ui.ddmanager && n.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
			},
			_mouseStop: function (t, i) {
				if (t) {
					if (n.ui.ddmanager && !this.options.dropBehaviour && n.ui.ddmanager.drop(this, t), this.options.revert) {
						var e = this,
							f = this.placeholder.offset(),
							r = this.options.axis,
							u = {};
						r && "x" !== r || (u.left = f.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft));
						r && "y" !== r || (u.top = f.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop));
						this.reverting = !0;
						n(this.helper).animate(u, parseInt(this.options.revert, 10) || 500, function () {
							e._clear(t)
						})
					} else this._clear(t, i);
					return !1
				}
			},
			cancel: function () {
				if (this.dragging) {
					this._mouseUp({
						target: null
					});
					"original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
					for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
				}
				return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), n.extend(this, {
					helper: null,
					dragging: !1,
					reverting: !1,
					_noFinalSort: null
				}), this.domPosition.prev ? n(this.domPosition.prev).after(this.currentItem) : n(this.domPosition.parent).prepend(this.currentItem)), this
			},
			serialize: function (t) {
				var r = this._getItemsAsjQuery(t && t.connected),
					i = [];
				return t = t || {}, n(r).each(function () {
					var r = (n(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
					r && i.push((t.key || r[1] + "[]") + "=" + (t.key && t.expression ? r[1] : r[2]))
				}), !i.length && t.key && i.push(t.key + "="), i.join("&")
			},
			toArray: function (t) {
				var r = this._getItemsAsjQuery(t && t.connected),
					i = [];
				return t = t || {}, r.each(function () {
					i.push(n(t.item || this).attr(t.attribute || "id") || "")
				}), i
			},
			_intersectsWith: function (n) {
				var t = this.positionAbs.left,
					h = t + this.helperProportions.width,
					i = this.positionAbs.top,
					c = i + this.helperProportions.height,
					r = n.left,
					f = r + n.width,
					u = n.top,
					e = u + n.height,
					o = this.offset.click.top,
					s = this.offset.click.left,
					l = "x" === this.options.axis || i + o > u && e > i + o,
					a = "y" === this.options.axis || t + s > r && f > t + s,
					v = l && a;
				return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > n[this.floating ? "width" : "height"] ? v : t + this.helperProportions.width / 2 > r && f > h - this.helperProportions.width / 2 && i + this.helperProportions.height / 2 > u && e > c - this.helperProportions.height / 2
			},
			_intersectsWithPointer: function (n) {
				var r = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, n.top, n.height),
					u = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, n.left, n.width),
					f = r && u,
					t = this._getDragVerticalDirection(),
					i = this._getDragHorizontalDirection();
				return f ? this.floating ? i && "right" === i || "down" === t ? 2 : 1 : t && ("down" === t ? 2 : 1) : !1
			},
			_intersectsWithSides: function (n) {
				var r = this._isOverAxis(this.positionAbs.top + this.offset.click.top, n.top + n.height / 2, n.height),
					u = this._isOverAxis(this.positionAbs.left + this.offset.click.left, n.left + n.width / 2, n.width),
					t = this._getDragVerticalDirection(),
					i = this._getDragHorizontalDirection();
				return this.floating && i ? "right" === i && u || "left" === i && !u : t && ("down" === t && r || "up" === t && !r)
			},
			_getDragVerticalDirection: function () {
				var n = this.positionAbs.top - this.lastPositionAbs.top;
				return 0 !== n && (n > 0 ? "down" : "up")
			},
			_getDragHorizontalDirection: function () {
				var n = this.positionAbs.left - this.lastPositionAbs.left;
				return 0 !== n && (n > 0 ? "right" : "left")
			},
			refresh: function (n) {
				return this._refreshItems(n), this._setHandleClassName(), this.refreshPositions(), this
			},
			_connectWith: function () {
				var n = this.options;
				return n.connectWith.constructor === String ? [n.connectWith] : n.connectWith
			},
			_getItemsAsjQuery: function (t) {
				function h() {
					s.push(this)
				}
				var r, u, e, i, s = [],
					f = [],
					o = this._connectWith();
				if (o && t)
					for (r = o.length - 1; r >= 0; r--)
						for (e = n(o[r]), u = e.length - 1; u >= 0; u--) i = n.data(e[u], this.widgetFullName), i && i !== this && !i.options.disabled && f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element) : n(i.options.items, i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), i]);
				for (f.push([n.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
						options: this.options,
						item: this.currentItem
					}) : n(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), r = f.length - 1; r >= 0; r--) f[r][0].each(h);
				return n(s)
			},
			_removeCurrentsFromItems: function () {
				var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
				this.items = n.grep(this.items, function (n) {
					for (var i = 0; t.length > i; i++)
						if (t[i] === n.item[0]) return !1;
					return !0
				})
			},
			_refreshItems: function (t) {
				this.items = [];
				this.containers = [this];
				var r, u, e, i, o, s, h, l, a = this.items,
					f = [
						[n.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
							item: this.currentItem
						}) : n(this.options.items, this.element), this]
					],
					c = this._connectWith();
				if (c && this.ready)
					for (r = c.length - 1; r >= 0; r--)
						for (e = n(c[r]), u = e.length - 1; u >= 0; u--) i = n.data(e[u], this.widgetFullName), i && i !== this && !i.options.disabled && (f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element[0], t, {
							item: this.currentItem
						}) : n(i.options.items, i.element), i]), this.containers.push(i));
				for (r = f.length - 1; r >= 0; r--)
					for (o = f[r][1], s = f[r][0], u = 0, l = s.length; l > u; u++) h = n(s[u]), h.data(this.widgetName + "-item", o), a.push({
						item: h,
						instance: o,
						width: 0,
						height: 0,
						left: 0,
						top: 0
					})
			},
			refreshPositions: function (t) {
				this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
				for (var r, f, u, i = this.items.length - 1; i >= 0; i--) r = this.items[i], r.instance !== this.currentContainer && this.currentContainer && r.item[0] !== this.currentItem[0] || (f = this.options.toleranceElement ? n(this.options.toleranceElement, r.item) : r.item, t || (r.width = f.outerWidth(), r.height = f.outerHeight()), u = f.offset(), r.left = u.left, r.top = u.top);
				if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
				else
					for (i = this.containers.length - 1; i >= 0; i--) u = this.containers[i].element.offset(), this.containers[i].containerCache.left = u.left, this.containers[i].containerCache.top = u.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
				return this
			},
			_createPlaceholder: function (t) {
				t = t || this;
				var r, i = t.options;
				i.placeholder && i.placeholder.constructor !== String || (r = i.placeholder, i.placeholder = {
					element: function () {
						var u = t.currentItem[0].nodeName.toLowerCase(),
							i = n("<" + u + ">", t.document[0]).addClass(r || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
						return "tr" === u ? t.currentItem.children().each(function () {
							n("<td>&#160;<\/td>", t.document[0]).attr("colspan", n(this).attr("colspan") || 1).appendTo(i)
						}) : "img" === u && i.attr("src", t.currentItem.attr("src")), r || i.css("visibility", "hidden"), i
					},
					update: function (n, u) {
						(!r || i.forcePlaceholderSize) && (u.height() || u.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), u.width() || u.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
					}
				});
				t.placeholder = n(i.placeholder.element.call(t.element, t.currentItem));
				t.currentItem.after(t.placeholder);
				i.placeholder.update(t, t.placeholder)
			},
			_contactContainers: function (t) {
				for (var u, c, f, a, v, o, l, s, h, e = null, r = null, i = this.containers.length - 1; i >= 0; i--)
					if (!n.contains(this.currentItem[0], this.containers[i].element[0]))
						if (this._intersectsWith(this.containers[i].containerCache)) {
							if (e && n.contains(this.containers[i].element[0], e.element[0])) continue;
							e = this.containers[i];
							r = i
						} else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", t, this._uiHash(this)), this.containers[i].containerCache.over = 0);
				if (e)
					if (1 === this.containers.length) this.containers[r].containerCache.over || (this.containers[r]._trigger("over", t, this._uiHash(this)), this.containers[r].containerCache.over = 1);
					else {
						for (c = 1e4, f = null, s = e.floating || this._isFloating(this.currentItem), a = s ? "left" : "top", v = s ? "width" : "height", h = s ? "clientX" : "clientY", u = this.items.length - 1; u >= 0; u--) n.contains(this.containers[r].element[0], this.items[u].item[0]) && this.items[u].item[0] !== this.currentItem[0] && (o = this.items[u].item.offset()[a], l = !1, t[h] - o > this.items[u][v] / 2 && (l = !0), c > Math.abs(t[h] - o) && (c = Math.abs(t[h] - o), f = this.items[u], this.direction = l ? "up" : "down"));
						if (!f && !this.options.dropOnEmpty) return;
						if (this.currentContainer === this.containers[r]) return;
						f ? this._rearrange(t, f, null, !0) : this._rearrange(t, null, this.containers[r].element, !0);
						this._trigger("change", t, this._uiHash());
						this.containers[r]._trigger("change", t, this._uiHash(this));
						this.currentContainer = this.containers[r];
						this.options.placeholder.update(this.currentContainer, this.placeholder);
						this.containers[r]._trigger("over", t, this._uiHash(this));
						this.containers[r].containerCache.over = 1
					}
			},
			_createHelper: function (t) {
				var r = this.options,
					i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === r.helper ? this.currentItem.clone() : this.currentItem;
				return i.parents("body").length || n("parent" !== r.appendTo ? r.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]), i[0] === this.currentItem[0] && (this._storedCSS = {
					width: this.currentItem[0].style.width,
					height: this.currentItem[0].style.height,
					position: this.currentItem.css("position"),
					top: this.currentItem.css("top"),
					left: this.currentItem.css("left")
				}), (!i[0].style.width || r.forceHelperSize) && i.width(this.currentItem.width()), (!i[0].style.height || r.forceHelperSize) && i.height(this.currentItem.height()), i
			},
			_adjustOffsetFromHelper: function (t) {
				"string" == typeof t && (t = t.split(" "));
				n.isArray(t) && (t = {
					left: +t[0],
					top: +t[1] || 0
				});
				"left" in t && (this.offset.click.left = t.left + this.margins.left);
				"right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
				"top" in t && (this.offset.click.top = t.top + this.margins.top);
				"bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
			},
			_getParentOffset: function () {
				this.offsetParent = this.helper.offsetParent();
				var t = this.offsetParent.offset();
				return "absolute" === this.cssPosition && this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && n.ui.ie) && (t = {
					top: 0,
					left: 0
				}), {
					top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
					left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
				}
			},
			_getRelativeOffset: function () {
				if ("relative" === this.cssPosition) {
					var n = this.currentItem.position();
					return {
						top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
						left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
					}
				}
				return {
					top: 0,
					left: 0
				}
			},
			_cacheMargins: function () {
				this.margins = {
					left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
					top: parseInt(this.currentItem.css("marginTop"), 10) || 0
				}
			},
			_cacheHelperProportions: function () {
				this.helperProportions = {
					width: this.helper.outerWidth(),
					height: this.helper.outerHeight()
				}
			},
			_setContainment: function () {
				var t, r, u, i = this.options;
				"parent" === i.containment && (i.containment = this.helper[0].parentNode);
				("document" === i.containment || "window" === i.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, n("document" === i.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (n("document" === i.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]);
				/^(document|window|parent)$/.test(i.containment) || (t = n(i.containment)[0], r = n(i.containment).offset(), u = "hidden" !== n(t).css("overflow"), this.containment = [r.left + (parseInt(n(t).css("borderLeftWidth"), 10) || 0) + (parseInt(n(t).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(n(t).css("borderTopWidth"), 10) || 0) + (parseInt(n(t).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(n(t).css("borderLeftWidth"), 10) || 0) - (parseInt(n(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (u ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(n(t).css("borderTopWidth"), 10) || 0) - (parseInt(n(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
			},
			_convertPositionTo: function (t, i) {
				i || (i = this.position);
				var r = "absolute" === t ? 1 : -1,
					u = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
					f = /(html|body)/i.test(u[0].tagName);
				return {
					top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : u.scrollTop()) * r,
					left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : u.scrollLeft()) * r
				}
			},
			_generatePosition: function (t) {
				var r, u, i = this.options,
					f = t.pageX,
					e = t.pageY,
					o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
					s = /(html|body)/i.test(o[0].tagName);
				return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (e = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (e = this.containment[3] + this.offset.click.top)), i.grid && (r = this.originalPageY + Math.round((e - this.originalPageY) / i.grid[1]) * i.grid[1], e = this.containment ? r - this.offset.click.top >= this.containment[1] && r - this.offset.click.top <= this.containment[3] ? r : r - this.offset.click.top >= this.containment[1] ? r - i.grid[1] : r + i.grid[1] : r, u = this.originalPageX + Math.round((f - this.originalPageX) / i.grid[0]) * i.grid[0], f = this.containment ? u - this.offset.click.left >= this.containment[0] && u - this.offset.click.left <= this.containment[2] ? u : u - this.offset.click.left >= this.containment[0] ? u - i.grid[0] : u + i.grid[0] : u)), {
					top: e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()),
					left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft())
				}
			},
			_rearrange: function (n, t, i, r) {
				i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] : t.item[0].nextSibling);
				this.counter = this.counter ? ++this.counter : 1;
				var u = this.counter;
				this._delay(function () {
					u === this.counter && this.refreshPositions(!r)
				})
			},
			_clear: function (n, t) {
				function u(n, t, i) {
					return function (r) {
						i._trigger(n, r, t._uiHash(t))
					}
				}
				this.reverting = !1;
				var i, r = [];
				if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
					for (i in this._storedCSS)("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
					this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
				} else this.currentItem.show();
				for (this.fromOutside && !t && r.push(function (n) {
						this._trigger("receive", n, this._uiHash(this.fromOutside))
					}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || r.push(function (n) {
						this._trigger("update", n, this._uiHash())
					}), this !== this.currentContainer && (t || (r.push(function (n) {
						this._trigger("remove", n, this._uiHash())
					}), r.push(function (n) {
						return function (t) {
							n._trigger("receive", t, this._uiHash(this))
						}
					}.call(this, this.currentContainer)), r.push(function (n) {
						return function (t) {
							n._trigger("update", t, this._uiHash(this))
						}
					}.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) t || r.push(u("deactivate", this, this.containers[i])), this.containers[i].containerCache.over && (r.push(u("out", this, this.containers[i])), this.containers[i].containerCache.over = 0);
				if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
					if (!t) {
						for (this._trigger("beforeStop", n, this._uiHash()), i = 0; r.length > i; i++) r[i].call(this, n);
						this._trigger("stop", n, this._uiHash())
					}
					return this.fromOutside = !1, !1
				}
				if (t || this._trigger("beforeStop", n, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !t) {
					for (i = 0; r.length > i; i++) r[i].call(this, n);
					this._trigger("stop", n, this._uiHash())
				}
				return this.fromOutside = !1, !0
			},
			_trigger: function () {
				n.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
			},
			_uiHash: function (t) {
				var i = t || this;
				return {
					helper: i.helper,
					placeholder: i.placeholder || n([]),
					position: i.position,
					originalPosition: i.originalPosition,
					offset: i.positionAbs,
					item: i.currentItem,
					sender: t ? t.element : null
				}
			}
		});
		n.widget("ui.accordion", {
			version: "1.11.1",
			options: {
				active: 0,
				animate: {},
				collapsible: !1,
				event: "click",
				header: "> li > :first-child,> :not(li):even",
				heightStyle: "auto",
				icons: {
					activeHeader: "ui-icon-triangle-1-s",
					header: "ui-icon-triangle-1-e"
				},
				activate: null,
				beforeActivate: null
			},
			hideProps: {
				borderTopWidth: "hide",
				borderBottomWidth: "hide",
				paddingTop: "hide",
				paddingBottom: "hide",
				height: "hide"
			},
			showProps: {
				borderTopWidth: "show",
				borderBottomWidth: "show",
				paddingTop: "show",
				paddingBottom: "show",
				height: "show"
			},
			_create: function () {
				var t = this.options;
				this.prevShow = this.prevHide = n();
				this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist");
				t.collapsible || t.active !== !1 && null != t.active || (t.active = 0);
				this._processPanels();
				0 > t.active && (t.active += this.headers.length);
				this._refresh()
			},
			_getCreateEventData: function () {
				return {
					header: this.active,
					panel: this.active.length ? this.active.next() : n()
				}
			},
			_createIcons: function () {
				var t = this.options.icons;
				t && (n("<span>").addClass("ui-accordion-header-icon ui-icon " + t.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader), this.headers.addClass("ui-accordion-icons"))
			},
			_destroyIcons: function () {
				this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
			},
			_destroy: function () {
				var n;
				this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
				this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId();
				this._destroyIcons();
				n = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId();
				"content" !== this.options.heightStyle && n.css("height", "")
			},
			_setOption: function (n, t) {
				return "active" === n ? (this._activate(t), void 0) : ("event" === n && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)), this._super(n, t), "collapsible" !== n || t || this.options.active !== !1 || this._activate(0), "icons" === n && (this._destroyIcons(), t && this._createIcons()), "disabled" === n && (this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!t)), void 0)
			},
			_keydown: function (t) {
				if (!t.altKey && !t.ctrlKey) {
					var i = n.ui.keyCode,
						u = this.headers.length,
						f = this.headers.index(t.target),
						r = !1;
					switch (t.keyCode) {
						case i.RIGHT:
						case i.DOWN:
							r = this.headers[(f + 1) % u];
							break;
						case i.LEFT:
						case i.UP:
							r = this.headers[(f - 1 + u) % u];
							break;
						case i.SPACE:
						case i.ENTER:
							this._eventHandler(t);
							break;
						case i.HOME:
							r = this.headers[0];
							break;
						case i.END:
							r = this.headers[u - 1]
					}
					r && (n(t.target).attr("tabIndex", -1), n(r).attr("tabIndex", 0), r.focus(), t.preventDefault())
				}
			},
			_panelKeyDown: function (t) {
				t.keyCode === n.ui.keyCode.UP && t.ctrlKey && n(t.currentTarget).prev().focus()
			},
			refresh: function () {
				var t = this.options;
				this._processPanels();
				t.active === !1 && t.collapsible === !0 || !this.headers.length ? (t.active = !1, this.active = n()) : t.active === !1 ? this._activate(0) : this.active.length && !n.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1, this.active = n()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active);
				this._destroyIcons();
				this._refresh()
			},
			_processPanels: function () {
				this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all");
				this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
			},
			_refresh: function () {
				var t, i = this.options,
					r = i.heightStyle,
					u = this.element.parent();
				this.active = this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all");
				this.active.next().addClass("ui-accordion-content-active").show();
				this.headers.attr("role", "tab").each(function () {
					var t = n(this),
						r = t.uniqueId().attr("id"),
						i = t.next(),
						u = i.uniqueId().attr("id");
					t.attr("aria-controls", u);
					i.attr("aria-labelledby", r)
				}).next().attr("role", "tabpanel");
				this.headers.not(this.active).attr({
					"aria-selected": "false",
					"aria-expanded": "false",
					tabIndex: -1
				}).next().attr({
					"aria-hidden": "true"
				}).hide();
				this.active.length ? this.active.attr({
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				}).next().attr({
					"aria-hidden": "false"
				}) : this.headers.eq(0).attr("tabIndex", 0);
				this._createIcons();
				this._setupEvents(i.event);
				"fill" === r ? (t = u.height(), this.element.siblings(":visible").each(function () {
					var i = n(this),
						r = i.css("position");
					"absolute" !== r && "fixed" !== r && (t -= i.outerHeight(!0))
				}), this.headers.each(function () {
					t -= n(this).outerHeight(!0)
				}), this.headers.next().each(function () {
					n(this).height(Math.max(0, t - n(this).innerHeight() + n(this).height()))
				}).css("overflow", "auto")) : "auto" === r && (t = 0, this.headers.next().each(function () {
					t = Math.max(t, n(this).css("height", "").height())
				}).height(t))
			},
			_activate: function (t) {
				var i = this._findActive(t)[0];
				i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
					target: i,
					currentTarget: i,
					preventDefault: n.noop
				}))
			},
			_findActive: function (t) {
				return "number" == typeof t ? this.headers.eq(t) : n()
			},
			_setupEvents: function (t) {
				var i = {
					keydown: "_keydown"
				};
				t && n.each(t.split(" "), function (n, t) {
					i[t] = "_eventHandler"
				});
				this._off(this.headers.add(this.headers.next()));
				this._on(this.headers, i);
				this._on(this.headers.next(), {
					keydown: "_panelKeyDown"
				});
				this._hoverable(this.headers);
				this._focusable(this.headers)
			},
			_eventHandler: function (t) {
				var i = this.options,
					u = this.active,
					r = n(t.currentTarget),
					f = r[0] === u[0],
					e = f && i.collapsible,
					s = e ? n() : r.next(),
					h = u.next(),
					o = {
						oldHeader: u,
						oldPanel: h,
						newHeader: e ? n() : r,
						newPanel: s
					};
				t.preventDefault();
				f && !i.collapsible || this._trigger("beforeActivate", t, o) === !1 || (i.active = e ? !1 : this.headers.index(r), this.active = f ? n() : r, this._toggle(o), u.removeClass("ui-accordion-header-active ui-state-active"), i.icons && u.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), f || (r.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && r.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), r.next().addClass("ui-accordion-content-active")))
			},
			_toggle: function (t) {
				var r = t.newPanel,
					i = this.prevShow.length ? this.prevShow : t.oldPanel;
				this.prevShow.add(this.prevHide).stop(!0, !0);
				this.prevShow = r;
				this.prevHide = i;
				this.options.animate ? this._animate(r, i, t) : (i.hide(), r.show(), this._toggleComplete(t));
				i.attr({
					"aria-hidden": "true"
				});
				i.prev().attr("aria-selected", "false");
				r.length && i.length ? i.prev().attr({
					tabIndex: -1,
					"aria-expanded": "false"
				}) : r.length && this.headers.filter(function () {
					return 0 === n(this).attr("tabIndex")
				}).attr("tabIndex", -1);
				r.attr("aria-hidden", "false").prev().attr({
					"aria-selected": "true",
					tabIndex: 0,
					"aria-expanded": "true"
				})
			},
			_animate: function (n, t, i) {
				var h, r, u, c = this,
					o = 0,
					l = n.length && (!t.length || n.index() < t.index()),
					e = this.options.animate || {},
					f = l && e.down || e,
					s = function () {
						c._toggleComplete(i)
					};
				return "number" == typeof f && (u = f), "string" == typeof f && (r = f), r = r || f.easing || e.easing, u = u || f.duration || e.duration, t.length ? n.length ? (h = n.show().outerHeight(), t.animate(this.hideProps, {
					duration: u,
					easing: r,
					step: function (n, t) {
						t.now = Math.round(n)
					}
				}), n.hide().animate(this.showProps, {
					duration: u,
					easing: r,
					complete: s,
					step: function (n, i) {
						i.now = Math.round(n);
						"height" !== i.prop ? o += i.now : "content" !== c.options.heightStyle && (i.now = Math.round(h - t.outerHeight() - o), o = 0)
					}
				}), void 0) : t.animate(this.hideProps, u, r, s) : n.animate(this.showProps, u, r, s)
			},
			_toggleComplete: function (n) {
				var t = n.oldPanel;
				t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all");
				t.length && (t.parent()[0].className = t.parent()[0].className);
				this._trigger("activate", null, n)
			}
		});
		n.widget("ui.menu", {
			version: "1.11.1",
			defaultElement: "<ul>",
			delay: 300,
			options: {
				icons: {
					submenu: "ui-icon-carat-1-e"
				},
				items: "> *",
				menus: "ul",
				position: {
					my: "left-1 top",
					at: "right top"
				},
				role: "menu",
				blur: null,
				focus: null,
				select: null
			},
			_create: function () {
				this.activeMenu = this.element;
				this.mouseHandled = !1;
				this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
					role: this.options.role,
					tabIndex: 0
				});
				this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true");
				this._on({
					"mousedown .ui-menu-item": function (n) {
						n.preventDefault()
					},
					"click .ui-menu-item": function (t) {
						var i = n(t.target);
						!this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && n(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
					},
					"mouseenter .ui-menu-item": function (t) {
						var i = n(t.currentTarget);
						i.siblings(".ui-state-active").removeClass("ui-state-active");
						this.focus(t, i)
					},
					mouseleave: "collapseAll",
					"mouseleave .ui-menu": "collapseAll",
					focus: function (n, t) {
						var i = this.active || this.element.find(this.options.items).eq(0);
						t || this.focus(n, i)
					},
					blur: function (t) {
						this._delay(function () {
							n.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
						})
					},
					keydown: "_keydown"
				});
				this.refresh();
				this._on(this.document, {
					click: function (n) {
						this._closeOnDocumentClick(n) && this.collapseAll(n);
						this.mouseHandled = !1
					}
				})
			},
			_destroy: function () {
				this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
				this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
					var t = n(this);
					t.data("ui-menu-submenu-carat") && t.remove()
				});
				this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
			},
			_keydown: function (t) {
				function o(n) {
					return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
				}
				var i, f, r, e, u, s = !0;
				switch (t.keyCode) {
					case n.ui.keyCode.PAGE_UP:
						this.previousPage(t);
						break;
					case n.ui.keyCode.PAGE_DOWN:
						this.nextPage(t);
						break;
					case n.ui.keyCode.HOME:
						this._move("first", "first", t);
						break;
					case n.ui.keyCode.END:
						this._move("last", "last", t);
						break;
					case n.ui.keyCode.UP:
						this.previous(t);
						break;
					case n.ui.keyCode.DOWN:
						this.next(t);
						break;
					case n.ui.keyCode.LEFT:
						this.collapse(t);
						break;
					case n.ui.keyCode.RIGHT:
						this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
						break;
					case n.ui.keyCode.ENTER:
					case n.ui.keyCode.SPACE:
						this._activate(t);
						break;
					case n.ui.keyCode.ESCAPE:
						this.collapse(t);
						break;
					default:
						s = !1;
						f = this.previousFilter || "";
						r = String.fromCharCode(t.keyCode);
						e = !1;
						clearTimeout(this.filterTimer);
						r === f ? e = !0 : r = f + r;
						u = RegExp("^" + o(r), "i");
						i = this.activeMenu.find(this.options.items).filter(function () {
							return u.test(n(this).text())
						});
						i = e && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i;
						i.length || (r = String.fromCharCode(t.keyCode), u = RegExp("^" + o(r), "i"), i = this.activeMenu.find(this.options.items).filter(function () {
							return u.test(n(this).text())
						}));
						i.length ? (this.focus(t, i), i.length > 1 ? (this.previousFilter = r, this.filterTimer = this._delay(function () {
							delete this.previousFilter
						}, 1e3)) : delete this.previousFilter) : delete this.previousFilter
				}
				s && t.preventDefault()
			},
			_activate: function (n) {
				this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(n) : this.select(n))
			},
			refresh: function () {
				var i, t, u = this,
					f = this.options.icons.submenu,
					r = this.element.find(this.options.menus);
				this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length);
				r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
					role: this.options.role,
					"aria-hidden": "true",
					"aria-expanded": "false"
				}).each(function () {
					var t = n(this),
						i = t.parent(),
						r = n("<span>").addClass("ui-menu-icon ui-icon " + f).data("ui-menu-submenu-carat", !0);
					i.attr("aria-haspopup", "true").prepend(r);
					t.attr("aria-labelledby", i.attr("id"))
				});
				i = r.add(this.element);
				t = i.find(this.options.items);
				t.not(".ui-menu-item").each(function () {
					var t = n(this);
					u._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider")
				});
				t.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
					tabIndex: -1,
					role: this._itemRole()
				});
				t.filter(".ui-state-disabled").attr("aria-disabled", "true");
				this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
			},
			_itemRole: function () {
				return {
					menu: "menuitem",
					listbox: "option"
				}[this.options.role]
			},
			_setOption: function (n, t) {
				"icons" === n && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu);
				"disabled" === n && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t);
				this._super(n, t)
			},
			focus: function (n, t) {
				var i, r;
				this.blur(n, n && "focus" === n.type);
				this._scrollIntoView(t);
				this.active = t.first();
				r = this.active.addClass("ui-state-focus").removeClass("ui-state-active");
				this.options.role && this.element.attr("aria-activedescendant", r.attr("id"));
				this.active.parent().closest(".ui-menu-item").addClass("ui-state-active");
				n && "keydown" === n.type ? this._close() : this.timer = this._delay(function () {
					this._close()
				}, this.delay);
				i = t.children(".ui-menu");
				i.length && n && /^mouse/.test(n.type) && this._startOpening(i);
				this.activeMenu = t.parent();
				this._trigger("focus", n, {
					item: t
				})
			},
			_scrollIntoView: function (t) {
				var e, o, i, r, u, f;
				this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0, o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - e - o, r = this.activeMenu.scrollTop(), u = this.activeMenu.height(), f = t.outerHeight(), 0 > i ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
			},
			blur: function (n, t) {
				t || clearTimeout(this.timer);
				this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", n, {
					item: this.active
				}))
			},
			_startOpening: function (n) {
				clearTimeout(this.timer);
				"true" === n.attr("aria-hidden") && (this.timer = this._delay(function () {
					this._close();
					this._open(n)
				}, this.delay))
			},
			_open: function (t) {
				var i = n.extend({
					of: this.active
				}, this.options.position);
				clearTimeout(this.timer);
				this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true");
				t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
			},
			collapseAll: function (t, i) {
				clearTimeout(this.timer);
				this.timer = this._delay(function () {
					var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
					r.length || (r = this.element);
					this._close(r);
					this.blur(t);
					this.activeMenu = r
				}, this.delay)
			},
			_close: function (n) {
				n || (n = this.active ? this.active.parent() : this.element);
				n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
			},
			_closeOnDocumentClick: function (t) {
				return !n(t.target).closest(".ui-menu").length
			},
			_isDivider: function (n) {
				return !/[^\-\u2014\u2013\s]/.test(n.text())
			},
			collapse: function (n) {
				var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
				t && t.length && (this._close(), this.focus(n, t))
			},
			expand: function (n) {
				var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
				t && t.length && (this._open(t.parent()), this._delay(function () {
					this.focus(n, t)
				}))
			},
			next: function (n) {
				this._move("next", "first", n)
			},
			previous: function (n) {
				this._move("prev", "last", n)
			},
			isFirstItem: function () {
				return this.active && !this.active.prevAll(".ui-menu-item").length
			},
			isLastItem: function () {
				return this.active && !this.active.nextAll(".ui-menu-item").length
			},
			_move: function (n, t, i) {
				var r;
				this.active && (r = "first" === n || "last" === n ? this.active["first" === n ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0));
				r && r.length && this.active || (r = this.activeMenu.find(this.options.items)[t]());
				this.focus(i, r)
			},
			nextPage: function (t) {
				var i, r, u;
				return this.active ? (this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
					return i = n(this), 0 > i.offset().top - r - u
				}), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(t), void 0)
			},
			previousPage: function (t) {
				var i, r, u;
				return this.active ? (this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
					return i = n(this), i.offset().top - r + u > 0
				}), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(t), void 0)
			},
			_hasScroll: function () {
				return this.element.outerHeight() < this.element.prop("scrollHeight")
			},
			select: function (t) {
				this.active = this.active || n(t.target).closest(".ui-menu-item");
				var i = {
					item: this.active
				};
				this.active.has(".ui-menu").length || this.collapseAll(t, !0);
				this._trigger("select", t, i)
			}
		});
		n.widget("ui.autocomplete", {
			version: "1.11.1",
			defaultElement: "<input>",
			options: {
				appendTo: null,
				autoFocus: !1,
				delay: 300,
				minLength: 1,
				position: {
					my: "left top",
					at: "left bottom",
					collision: "none"
				},
				source: null,
				change: null,
				close: null,
				focus: null,
				open: null,
				response: null,
				search: null,
				select: null
			},
			requestIndex: 0,
			pending: 0,
			_create: function () {
				var t, i, r, u = this.element[0].nodeName.toLowerCase(),
					f = "textarea" === u,
					e = "input" === u;
				this.isMultiLine = f ? !0 : e ? !1 : this.element.prop("isContentEditable");
				this.valueMethod = this.element[f || e ? "val" : "text"];
				this.isNewMenu = !0;
				this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
				this._on(this.element, {
					keydown: function (u) {
						if (this.element.prop("readOnly")) return t = !0, r = !0, i = !0, void 0;
						t = !1;
						r = !1;
						i = !1;
						var f = n.ui.keyCode;
						switch (u.keyCode) {
							case f.PAGE_UP:
								t = !0;
								this._move("previousPage", u);
								break;
							case f.PAGE_DOWN:
								t = !0;
								this._move("nextPage", u);
								break;
							case f.UP:
								t = !0;
								this._keyEvent("previous", u);
								break;
							case f.DOWN:
								t = !0;
								this._keyEvent("next", u);
								break;
							case f.ENTER:
								this.menu.active && (t = !0, u.preventDefault(), this.menu.select(u));
								break;
							case f.TAB:
								this.menu.active && this.menu.select(u);
								break;
							case f.ESCAPE:
								this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(u), u.preventDefault());
								break;
							default:
								i = !0;
								this._searchTimeout(u)
						}
					},
					keypress: function (r) {
						if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault(), void 0;
						if (!i) {
							var u = n.ui.keyCode;
							switch (r.keyCode) {
								case u.PAGE_UP:
									this._move("previousPage", r);
									break;
								case u.PAGE_DOWN:
									this._move("nextPage", r);
									break;
								case u.UP:
									this._keyEvent("previous", r);
									break;
								case u.DOWN:
									this._keyEvent("next", r)
							}
						}
					},
					input: function (n) {
						return r ? (r = !1, n.preventDefault(), void 0) : (this._searchTimeout(n), void 0)
					},
					focus: function () {
						this.selectedItem = null;
						this.previous = this._value()
					},
					blur: function (n) {
						return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(n), this._change(n), void 0)
					}
				});
				this._initSource();
				this.menu = n("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
					role: null
				}).hide().menu("instance");
				this._on(this.menu.element, {
					mousedown: function (t) {
						t.preventDefault();
						this.cancelBlur = !0;
						this._delay(function () {
							delete this.cancelBlur
						});
						var i = this.menu.element[0];
						n(t.target).closest(".ui-menu-item").length || this._delay(function () {
							var t = this;
							this.document.one("mousedown", function (r) {
								r.target === t.element[0] || r.target === i || n.contains(i, r.target) || t.close()
							})
						})
					},
					menufocus: function (t, i) {
						var r, u;
						return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function () {
							n(t.target).trigger(t.originalEvent)
						}), void 0) : (u = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, {
							item: u
						}) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(u.value), r = i.item.attr("aria-label") || u.value, r && n.trim(r).length && (this.liveRegion.children().hide(), n("<div>").text(r).appendTo(this.liveRegion)), void 0)
					},
					menuselect: function (n, t) {
						var i = t.item.data("ui-autocomplete-item"),
							r = this.previous;
						this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function () {
							this.previous = r;
							this.selectedItem = i
						}));
						!1 !== this._trigger("select", n, {
							item: i
						}) && this._value(i.value);
						this.term = this._value();
						this.close(n);
						this.selectedItem = i
					}
				});
				this.liveRegion = n("<span>", {
					role: "status",
					"aria-live": "assertive",
					"aria-relevant": "additions"
				}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);
				this._on(this.window, {
					beforeunload: function () {
						this.element.removeAttr("autocomplete")
					}
				})
			},
			_destroy: function () {
				clearTimeout(this.searching);
				this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
				this.menu.element.remove();
				this.liveRegion.remove()
			},
			_setOption: function (n, t) {
				this._super(n, t);
				"source" === n && this._initSource();
				"appendTo" === n && this.menu.element.appendTo(this._appendTo());
				"disabled" === n && t && this.xhr && this.xhr.abort()
			},
			_appendTo: function () {
				var t = this.options.appendTo;
				return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
			},
			_initSource: function () {
				var i, r, t = this;
				n.isArray(this.options.source) ? (i = this.options.source, this.source = function (t, r) {
					r(n.ui.autocomplete.filter(i, t.term))
				}) : "string" == typeof this.options.source ? (r = this.options.source, this.source = function (i, u) {
					t.xhr && t.xhr.abort();
					t.xhr = n.ajax({
						url: r,
						data: i,
						dataType: "json",
						success: function (n) {
							u(n)
						},
						error: function () {
							u([])
						}
					})
				}) : this.source = this.options.source
			},
			_searchTimeout: function (n) {
				clearTimeout(this.searching);
				this.searching = this._delay(function () {
					var t = this.term === this._value(),
						i = this.menu.element.is(":visible"),
						r = n.altKey || n.ctrlKey || n.metaKey || n.shiftKey;
					t && (!t || i || r) || (this.selectedItem = null, this.search(null, n))
				}, this.options.delay)
			},
			search: function (n, t) {
				return n = null != n ? n : this._value(), this.term = this._value(), n.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(n) : void 0
			},
			_search: function (n) {
				this.pending++;
				this.element.addClass("ui-autocomplete-loading");
				this.cancelSearch = !1;
				this.source({
					term: n
				}, this._response())
			},
			_response: function () {
				var t = ++this.requestIndex;
				return n.proxy(function (n) {
					t === this.requestIndex && this.__response(n);
					this.pending--;
					this.pending || this.element.removeClass("ui-autocomplete-loading")
				}, this)
			},
			__response: function (n) {
				n && (n = this._normalize(n));
				this._trigger("response", null, {
					content: n
				});
				!this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n), this._trigger("open")) : this._close()
			},
			close: function (n) {
				this.cancelSearch = !0;
				this._close(n)
			},
			_close: function (n) {
				this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", n))
			},
			_change: function (n) {
				this.previous !== this._value() && this._trigger("change", n, {
					item: this.selectedItem
				})
			},
			_normalize: function (t) {
				return t.length && t[0].label && t[0].value ? t : n.map(t, function (t) {
					return "string" == typeof t ? {
						label: t,
						value: t
					} : n.extend({}, t, {
						label: t.label || t.value,
						value: t.value || t.label
					})
				})
			},
			_suggest: function (t) {
				var i = this.menu.element.empty();
				this._renderMenu(i, t);
				this.isNewMenu = !0;
				this.menu.refresh();
				i.show();
				this._resizeMenu();
				i.position(n.extend({
					of: this.element
				}, this.options.position));
				this.options.autoFocus && this.menu.next()
			},
			_resizeMenu: function () {
				var n = this.menu.element;
				n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
			},
			_renderMenu: function (t, i) {
				var r = this;
				n.each(i, function (n, i) {
					r._renderItemData(t, i)
				})
			},
			_renderItemData: function (n, t) {
				return this._renderItem(n, t).data("ui-autocomplete-item", t)
			},
			_renderItem: function (t, i) {
				return n("<li>").text(i.label).appendTo(t)
			},
			_move: function (n, t) {
				return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[n](t), void 0) : (this.search(null, t), void 0)
			},
			widget: function () {
				return this.menu.element
			},
			_value: function () {
				return this.valueMethod.apply(this.element, arguments)
			},
			_keyEvent: function (n, t) {
				(!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t), t.preventDefault())
			}
		});
		n.extend(n.ui.autocomplete, {
			escapeRegex: function (n) {
				return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
			},
			filter: function (t, i) {
				var r = RegExp(n.ui.autocomplete.escapeRegex(i), "i");
				return n.grep(t, function (n) {
					return r.test(n.label || n.value || n)
				})
			}
		});
		n.widget("ui.autocomplete", n.ui.autocomplete, {
			options: {
				messages: {
					noResults: "No search results.",
					results: function (n) {
						return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
					}
				}
			},
			__response: function (t) {
				var i;
				this._superApply(arguments);
				this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), n("<div>").text(i).appendTo(this.liveRegion))
			}
		});
		n.ui.autocomplete;
		var e, p = "ui-button ui-widget ui-state-default ui-corner-all",
			w = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
			d = function () {
				var t = n(this);
				setTimeout(function () {
					t.find(":ui-button").button("refresh")
				}, 1)
			},
			b = function (t) {
				var i = t.name,
					r = t.form,
					u = n([]);
				return i && (i = i.replace(/'/g, "\\'"), u = r ? n(r).find("[name='" + i + "'][type=radio]") : n("[name='" + i + "'][type=radio]", t.ownerDocument).filter(function () {
					return !this.form
				})), u
			};
		n.widget("ui.button", {
			version: "1.11.1",
			defaultElement: "<button>",
			options: {
				disabled: null,
				text: !0,
				label: null,
				icons: {
					primary: null,
					secondary: null
				}
			},
			_create: function () {
				this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, d);
				"boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled);
				this._determineButtonType();
				this.hasTitle = !!this.buttonElement.attr("title");
				var i = this,
					t = this.options,
					r = "checkbox" === this.type || "radio" === this.type,
					u = r ? "" : "ui-state-active";
				null === t.label && (t.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html());
				this._hoverable(this.buttonElement);
				this.buttonElement.addClass(p).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
					t.disabled || this === e && n(this).addClass("ui-state-active")
				}).bind("mouseleave" + this.eventNamespace, function () {
					t.disabled || n(this).removeClass(u)
				}).bind("click" + this.eventNamespace, function (n) {
					t.disabled && (n.preventDefault(), n.stopImmediatePropagation())
				});
				this._on({
					focus: function () {
						this.buttonElement.addClass("ui-state-focus")
					},
					blur: function () {
						this.buttonElement.removeClass("ui-state-focus")
					}
				});
				r && this.element.bind("change" + this.eventNamespace, function () {
					i.refresh()
				});
				"checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
					if (t.disabled) return !1
				}) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
					if (t.disabled) return !1;
					n(this).addClass("ui-state-active");
					i.buttonElement.attr("aria-pressed", "true");
					var r = i.element[0];
					b(r).not(r).map(function () {
						return n(this).button("widget")[0]
					}).removeClass("ui-state-active").attr("aria-pressed", "false")
				}) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
					return t.disabled ? !1 : (n(this).addClass("ui-state-active"), e = this, i.document.one("mouseup", function () {
						e = null
					}), void 0)
				}).bind("mouseup" + this.eventNamespace, function () {
					return t.disabled ? !1 : (n(this).removeClass("ui-state-active"), void 0)
				}).bind("keydown" + this.eventNamespace, function (i) {
					return t.disabled ? !1 : ((i.keyCode === n.ui.keyCode.SPACE || i.keyCode === n.ui.keyCode.ENTER) && n(this).addClass("ui-state-active"), void 0)
				}).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
					n(this).removeClass("ui-state-active")
				}), this.buttonElement.is("a") && this.buttonElement.keyup(function (t) {
					t.keyCode === n.ui.keyCode.SPACE && n(this).click()
				}));
				this._setOption("disabled", t.disabled);
				this._resetButton()
			},
			_determineButtonType: function () {
				var n, t, i;
				this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button";
				"checkbox" === this.type || "radio" === this.type ? (n = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = n.find(t), this.buttonElement.length || (n = n.length ? n.siblings() : this.element.siblings(), this.buttonElement = n.filter(t), this.buttonElement.length || (this.buttonElement = n.find(t))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
			},
			widget: function () {
				return this.buttonElement
			},
			_destroy: function () {
				this.element.removeClass("ui-helper-hidden-accessible");
				this.buttonElement.removeClass(p + " ui-state-active " + w).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
				this.hasTitle || this.buttonElement.removeAttr("title")
			},
			_setOption: function (n, t) {
				return this._super(n, t), "disabled" === n ? (this.widget().toggleClass("ui-state-disabled", !!t), this.element.prop("disabled", !!t), t && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")), void 0) : (this._resetButton(), void 0)
			},
			refresh: function () {
				var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
				t !== this.options.disabled && this._setOption("disabled", t);
				"radio" === this.type ? b(this.element[0]).each(function () {
					n(this).is(":checked") ? n(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : n(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
				}) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
			},
			_resetButton: function () {
				if ("input" === this.type) return this.options.label && this.element.val(this.options.label), void 0;
				var i = this.buttonElement.removeClass(w),
					f = n("<span><\/span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(i.empty()).text(),
					t = this.options.icons,
					u = t.primary && t.secondary,
					r = [];
				t.primary || t.secondary ? (this.options.text && r.push("ui-button-text-icon" + (u ? "s" : t.primary ? "-primary" : "-secondary")), t.primary && i.prepend("<span class='ui-button-icon-primary ui-icon " + t.primary + "'><\/span>"), t.secondary && i.append("<span class='ui-button-icon-secondary ui-icon " + t.secondary + "'><\/span>"), this.options.text || (r.push(u ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || i.attr("title", n.trim(f)))) : r.push("ui-button-text-only");
				i.addClass(r.join(" "))
			}
		});
		n.widget("ui.buttonset", {
			version: "1.11.1",
			options: {
				items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
			},
			_create: function () {
				this.element.addClass("ui-buttonset")
			},
			_init: function () {
				this.refresh()
			},
			_setOption: function (n, t) {
				"disabled" === n && this.buttons.button("option", n, t);
				this._super(n, t)
			},
			refresh: function () {
				var i = "rtl" === this.element.css("direction"),
					t = this.element.find(this.options.items),
					r = t.filter(":ui-button");
				t.not(":ui-button").button();
				r.button("refresh");
				this.buttons = t.map(function () {
					return n(this).button("widget")[0]
				}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(i ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(i ? "ui-corner-left" : "ui-corner-right").end().end()
			},
			_destroy: function () {
				this.element.removeClass("ui-buttonset");
				this.buttons.map(function () {
					return n(this).button("widget")[0]
				}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
			}
		});
		n.ui.button;
		n.extend(n.ui, {
			datepicker: {
				version: "1.11.1"
			}
		});
		n.extend(l.prototype, {
			markerClassName: "hasDatepicker",
			maxRows: 4,
			_widgetDatepicker: function () {
				return this.dpDiv
			},
			setDefaults: function (n) {
				return r(this._defaults, n || {}), this
			},
			_attachDatepicker: function (t, i) {
				var r, f, u;
				r = t.nodeName.toLowerCase();
				f = "div" === r || "span" === r;
				t.id || (this.uuid += 1, t.id = "dp" + this.uuid);
				u = this._newInst(n(t), f);
				u.settings = n.extend({}, i || {});
				"input" === r ? this._connectDatepicker(t, u) : f && this._inlineDatepicker(t, u)
			},
			_newInst: function (t, i) {
				var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
				return {
					id: r,
					input: t,
					selectedDay: 0,
					selectedMonth: 0,
					selectedYear: 0,
					drawMonth: 0,
					drawYear: 0,
					inline: i,
					dpDiv: i ? a(n("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>")) : this.dpDiv
				}
			},
			_connectDatepicker: function (t, i) {
				var r = n(t);
				i.append = n([]);
				i.trigger = n([]);
				r.hasClass(this.markerClassName) || (this._attachments(r, i), r.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), n.data(t, "datepicker", i), i.settings.disabled && this._disableDatepicker(t))
			},
			_attachments: function (t, i) {
				var u, r, f, e = this._get(i, "appendText"),
					o = this._get(i, "isRTL");
				i.append && i.append.remove();
				e && (i.append = n("<span class='" + this._appendClass + "'>" + e + "<\/span>"), t[o ? "before" : "after"](i.append));
				t.unbind("focus", this._showDatepicker);
				i.trigger && i.trigger.remove();
				u = this._get(i, "showOn");
				("focus" === u || "both" === u) && t.focus(this._showDatepicker);
				("button" === u || "both" === u) && (r = this._get(i, "buttonText"), f = this._get(i, "buttonImage"), i.trigger = n(this._get(i, "buttonImageOnly") ? n("<img/>").addClass(this._triggerClass).attr({
					src: f,
					alt: r,
					title: r
				}) : n("<button type='button'><\/button>").addClass(this._triggerClass).html(f ? n("<img/>").attr({
					src: f,
					alt: r,
					title: r
				}) : r)), t[o ? "before" : "after"](i.trigger), i.trigger.click(function () {
					return n.datepicker._datepickerShowing && n.datepicker._lastInput === t[0] ? n.datepicker._hideDatepicker() : n.datepicker._datepickerShowing && n.datepicker._lastInput !== t[0] ? (n.datepicker._hideDatepicker(), n.datepicker._showDatepicker(t[0])) : n.datepicker._showDatepicker(t[0]), !1
				}))
			},
			_autoSize: function (n) {
				if (this._get(n, "autoSize") && !n.inline) {
					var r, u, f, t, i = new Date(2009, 11, 20),
						e = this._get(n, "dateFormat");
					e.match(/[DM]/) && (r = function (n) {
						for (u = 0, f = 0, t = 0; n.length > t; t++) n[t].length > u && (u = n[t].length, f = t);
						return f
					}, i.setMonth(r(this._get(n, e.match(/MM/) ? "monthNames" : "monthNamesShort"))), i.setDate(r(this._get(n, e.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - i.getDay()));
					n.input.attr("size", this._formatDate(n, i).length)
				}
			},
			_inlineDatepicker: function (t, i) {
				var r = n(t);
				r.hasClass(this.markerClassName) || (r.addClass(this.markerClassName).append(i.dpDiv), n.data(t, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"))
			},
			_dialogDatepicker: function (t, i, u, f, e) {
				var s, h, c, l, a, o = this._dialogInst;
				return o || (this.uuid += 1, s = "dp" + this.uuid, this._dialogInput = n("<input type='text' id='" + s + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), n("body").append(this._dialogInput), o = this._dialogInst = this._newInst(this._dialogInput, !1), o.settings = {}, n.data(this._dialogInput[0], "datepicker", o)), r(o.settings, f || {}), i = i && i.constructor === Date ? this._formatDate(o, i) : i, this._dialogInput.val(i), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null, this._pos || (h = document.documentElement.clientWidth, c = document.documentElement.clientHeight, l = document.documentElement.scrollLeft || document.body.scrollLeft, a = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + l, c / 2 - 150 + a]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), o.settings.onSelect = u, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), n.blockUI && n.blockUI(this.dpDiv), n.data(this._dialogInput[0], "datepicker", o), this
			},
			_destroyDatepicker: function (t) {
				var i, r = n(t),
					u = n.data(t, "datepicker");
				r.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), n.removeData(t, "datepicker"), "input" === i ? (u.append.remove(), u.trigger.remove(), r.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && r.removeClass(this.markerClassName).empty())
			},
			_enableDatepicker: function (t) {
				var i, r, u = n(t),
					f = n.data(t, "datepicker");
				u.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !1, f.trigger.filter("button").each(function () {
					this.disabled = !1
				}).end().filter("img").css({
					opacity: "1.0",
					cursor: ""
				})) : ("div" === i || "span" === i) && (r = u.children("." + this._inlineClass), r.children().removeClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = n.map(this._disabledInputs, function (n) {
					return n === t ? null : n
				}))
			},
			_disableDatepicker: function (t) {
				var i, r, u = n(t),
					f = n.data(t, "datepicker");
				u.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !0, f.trigger.filter("button").each(function () {
					this.disabled = !0
				}).end().filter("img").css({
					opacity: "0.5",
					cursor: "default"
				})) : ("div" === i || "span" === i) && (r = u.children("." + this._inlineClass), r.children().addClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = n.map(this._disabledInputs, function (n) {
					return n === t ? null : n
				}), this._disabledInputs[this._disabledInputs.length] = t)
			},
			_isDisabledDatepicker: function (n) {
				if (!n) return !1;
				for (var t = 0; this._disabledInputs.length > t; t++)
					if (this._disabledInputs[t] === n) return !0;
				return !1
			},
			_getInst: function (t) {
				try {
					return n.data(t, "datepicker")
				} catch (i) {
					throw "Missing instance data for this datepicker";
				}
			},
			_optionDatepicker: function (t, i, u) {
				var e, h, o, s, f = this._getInst(t);
				return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? n.extend({}, n.datepicker._defaults) : f ? "all" === i ? n.extend({}, f.settings) : this._get(f, i) : null : (e = i || {}, "string" == typeof i && (e = {}, e[i] = u), f && (this._curInst === f && this._hideDatepicker(), h = this._getDateDatepicker(t, !0), o = this._getMinMaxDate(f, "min"), s = this._getMinMaxDate(f, "max"), r(f.settings, e), null !== o && void 0 !== e.dateFormat && void 0 === e.minDate && (f.settings.minDate = this._formatDate(f, o)), null !== s && void 0 !== e.dateFormat && void 0 === e.maxDate && (f.settings.maxDate = this._formatDate(f, s)), "disabled" in e && (e.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(n(t), f), this._autoSize(f), this._setDate(f, h), this._updateAlternate(f), this._updateDatepicker(f)), void 0)
			},
			_changeDatepicker: function (n, t, i) {
				this._optionDatepicker(n, t, i)
			},
			_refreshDatepicker: function (n) {
				var t = this._getInst(n);
				t && this._updateDatepicker(t)
			},
			_setDateDatepicker: function (n, t) {
				var i = this._getInst(n);
				i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
			},
			_getDateDatepicker: function (n, t) {
				var i = this._getInst(n);
				return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
			},
			_doKeyDown: function (t) {
				var u, e, f, i = n.datepicker._getInst(t.target),
					r = !0,
					o = i.dpDiv.is(".ui-datepicker-rtl");
				if (i._keyEvent = !0, n.datepicker._datepickerShowing) switch (t.keyCode) {
					case 9:
						n.datepicker._hideDatepicker();
						r = !1;
						break;
					case 13:
						return f = n("td." + n.datepicker._dayOverClass + ":not(." + n.datepicker._currentClass + ")", i.dpDiv), f[0] && n.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, f[0]), u = n.datepicker._get(i, "onSelect"), u ? (e = n.datepicker._formatDate(i), u.apply(i.input ? i.input[0] : null, [e, i])) : n.datepicker._hideDatepicker(), !1;
					case 27:
						n.datepicker._hideDatepicker();
						break;
					case 33:
						n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
						break;
					case 34:
						n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
						break;
					case 35:
						(t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target);
						r = t.ctrlKey || t.metaKey;
						break;
					case 36:
						(t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target);
						r = t.ctrlKey || t.metaKey;
						break;
					case 37:
						(t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? 1 : -1, "D");
						r = t.ctrlKey || t.metaKey;
						t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
						break;
					case 38:
						(t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, -7, "D");
						r = t.ctrlKey || t.metaKey;
						break;
					case 39:
						(t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? -1 : 1, "D");
						r = t.ctrlKey || t.metaKey;
						t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
						break;
					case 40:
						(t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, 7, "D");
						r = t.ctrlKey || t.metaKey;
						break;
					default:
						r = !1
				} else 36 === t.keyCode && t.ctrlKey ? n.datepicker._showDatepicker(this) : r = !1;
				r && (t.preventDefault(), t.stopPropagation())
			},
			_doKeyPress: function (t) {
				var i, r, u = n.datepicker._getInst(t.target);
				if (n.datepicker._get(u, "constrainInput")) return (i = n.datepicker._possibleChars(n.datepicker._get(u, "dateFormat")), r = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || " " > r || !i || i.indexOf(r) > -1)
			},
			_doKeyUp: function (t) {
				var r, i = n.datepicker._getInst(t.target);
				if (i.input.val() !== i.lastVal) try {
					r = n.datepicker.parseDate(n.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, n.datepicker._getFormatConfig(i));
					r && (n.datepicker._setDateFromField(i), n.datepicker._updateAlternate(i), n.datepicker._updateDatepicker(i))
				} catch (u) {}
				return !0
			},
			_showDatepicker: function (t) {
				if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = n("input", t.parentNode)[0]), !n.datepicker._isDisabledDatepicker(t) && n.datepicker._lastInput !== t) {
					var i, o, s, u, f, e, h;
					i = n.datepicker._getInst(t);
					n.datepicker._curInst && n.datepicker._curInst !== i && (n.datepicker._curInst.dpDiv.stop(!0, !0), i && n.datepicker._datepickerShowing && n.datepicker._hideDatepicker(n.datepicker._curInst.input[0]));
					o = n.datepicker._get(i, "beforeShow");
					s = o ? o.apply(t, [t, i]) : {};
					s !== !1 && (r(i.settings, s), i.lastVal = null, n.datepicker._lastInput = t, n.datepicker._setDateFromField(i), n.datepicker._inDialog && (t.value = ""), n.datepicker._pos || (n.datepicker._pos = n.datepicker._findPos(t), n.datepicker._pos[1] += t.offsetHeight), u = !1, n(t).parents().each(function () {
						return u |= "fixed" === n(this).css("position"), !u
					}), f = {
						left: n.datepicker._pos[0],
						top: n.datepicker._pos[1]
					}, n.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
						position: "absolute",
						display: "block",
						top: "-1000px"
					}), n.datepicker._updateDatepicker(i), f = n.datepicker._checkOffset(i, f, u), i.dpDiv.css({
						position: n.datepicker._inDialog && n.blockUI ? "static" : u ? "fixed" : "absolute",
						display: "none",
						left: f.left + "px",
						top: f.top + "px"
					}), i.inline || (e = n.datepicker._get(i, "showAnim"), h = n.datepicker._get(i, "duration"), i.dpDiv.css("z-index", k(n(t)) + 1), n.datepicker._datepickerShowing = !0, n.effects && n.effects.effect[e] ? i.dpDiv.show(e, n.datepicker._get(i, "showOptions"), h) : i.dpDiv[e || "show"](e ? h : null), n.datepicker._shouldFocusInput(i) && i.input.focus(), n.datepicker._curInst = i))
				}
			},
			_updateDatepicker: function (t) {
				this.maxRows = 4;
				u = t;
				t.dpDiv.empty().append(this._generateHTML(t));
				this._attachHandlers(t);
				var i, r = this._getNumberOfMonths(t),
					f = r[1],
					e = t.dpDiv.find("." + this._dayOverClass + " a");
				e.length > 0 && v.apply(e.get(0));
				t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
				f > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", 17 * f + "em");
				t.dpDiv[(1 !== r[0] || 1 !== r[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi");
				t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
				t === n.datepicker._curInst && n.datepicker._datepickerShowing && n.datepicker._shouldFocusInput(t) && t.input.focus();
				t.yearshtml && (i = t.yearshtml, setTimeout(function () {
					i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml);
					i = t.yearshtml = null
				}, 0))
			},
			_shouldFocusInput: function (n) {
				return n.input && n.input.is(":visible") && !n.input.is(":disabled") && !n.input.is(":focus")
			},
			_checkOffset: function (t, i, r) {
				var u = t.dpDiv.outerWidth(),
					f = t.dpDiv.outerHeight(),
					h = t.input ? t.input.outerWidth() : 0,
					o = t.input ? t.input.outerHeight() : 0,
					e = document.documentElement.clientWidth + (r ? 0 : n(document).scrollLeft()),
					s = document.documentElement.clientHeight + (r ? 0 : n(document).scrollTop());
				return i.left -= this._get(t, "isRTL") ? u - h : 0, i.left -= r && i.left === t.input.offset().left ? n(document).scrollLeft() : 0, i.top -= r && i.top === t.input.offset().top + o ? n(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + u > e && e > u ? Math.abs(i.left + u - e) : 0), i.top -= Math.min(i.top, i.top + f > s && s > f ? Math.abs(f + o) : 0), i
			},
			_findPos: function (t) {
				for (var i, r = this._getInst(t), u = this._get(r, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || n.expr.filters.hidden(t));) t = t[u ? "previousSibling" : "nextSibling"];
				return i = n(t).offset(), [i.left, i.top]
			},
			_hideDatepicker: function (t) {
				var r, f, u, e, i = this._curInst;
				!i || t && i !== n.data(t, "datepicker") || this._datepickerShowing && (r = this._get(i, "showAnim"), f = this._get(i, "duration"), u = function () {
					n.datepicker._tidyDialog(i)
				}, n.effects && (n.effects.effect[r] || n.effects[r]) ? i.dpDiv.hide(r, n.datepicker._get(i, "showOptions"), f, u) : i.dpDiv["slideDown" === r ? "slideUp" : "fadeIn" === r ? "fadeOut" : "hide"](r ? f : null, u), r || u(), this._datepickerShowing = !1, e = this._get(i, "onClose"), e && e.apply(i.input ? i.input[0] : null, [i.input ? i.input.val() : "", i]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
					position: "absolute",
					left: "0",
					top: "-100px"
				}), n.blockUI && (n.unblockUI(), n("body").append(this.dpDiv))), this._inDialog = !1)
			},
			_tidyDialog: function (n) {
				n.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
			},
			_checkExternalClick: function (t) {
				if (n.datepicker._curInst) {
					var i = n(t.target),
						r = n.datepicker._getInst(i[0]);
					(i[0].id === n.datepicker._mainDivId || 0 !== i.parents("#" + n.datepicker._mainDivId).length || i.hasClass(n.datepicker.markerClassName) || i.closest("." + n.datepicker._triggerClass).length || !n.datepicker._datepickerShowing || n.datepicker._inDialog && n.blockUI) && (!i.hasClass(n.datepicker.markerClassName) || n.datepicker._curInst === r) || n.datepicker._hideDatepicker()
				}
			},
			_adjustDate: function (t, i, r) {
				var f = n(t),
					u = this._getInst(f[0]);
				this._isDisabledDatepicker(f[0]) || (this._adjustInstDate(u, i + ("M" === r ? this._get(u, "showCurrentAtPos") : 0), r), this._updateDatepicker(u))
			},
			_gotoToday: function (t) {
				var r, u = n(t),
					i = this._getInst(u[0]);
				this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (r = new Date, i.selectedDay = r.getDate(), i.drawMonth = i.selectedMonth = r.getMonth(), i.drawYear = i.selectedYear = r.getFullYear());
				this._notifyChange(i);
				this._adjustDate(u)
			},
			_selectMonthYear: function (t, i, r) {
				var f = n(t),
					u = this._getInst(f[0]);
				u["selected" + ("M" === r ? "Month" : "Year")] = u["draw" + ("M" === r ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10);
				this._notifyChange(u);
				this._adjustDate(f)
			},
			_selectDay: function (t, i, r, u) {
				var f, e = n(t);
				n(u).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]) || (f = this._getInst(e[0]), f.selectedDay = f.currentDay = n("a", u).html(), f.selectedMonth = f.currentMonth = i, f.selectedYear = f.currentYear = r, this._selectDate(t, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
			},
			_clearDate: function (t) {
				var i = n(t);
				this._selectDate(i, "")
			},
			_selectDate: function (t, i) {
				var u, f = n(t),
					r = this._getInst(f[0]);
				i = null != i ? i : this._formatDate(r);
				r.input && r.input.val(i);
				this._updateAlternate(r);
				u = this._get(r, "onSelect");
				u ? u.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change");
				r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.focus(), this._lastInput = null)
			},
			_updateAlternate: function (t) {
				var i, r, u, f = this._get(t, "altField");
				f && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), r = this._getDate(t), u = this.formatDate(i, r, this._getFormatConfig(t)), n(f).each(function () {
					n(this).val(u)
				}))
			},
			noWeekends: function (n) {
				var t = n.getDay();
				return [t > 0 && 6 > t, ""]
			},
			iso8601Week: function (n) {
				var i, t = new Date(n.getTime());
				return t.setDate(t.getDate() + 4 - (t.getDay() || 7)), i = t.getTime(), t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1
			},
			parseDate: function (t, i, r) {
				if (null == t || null == i) throw "Invalid arguments";
				if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
				for (var a, v, u, f = 0, y = (r ? r.shortYearCutoff : null) || this._defaults.shortYearCutoff, d = "string" != typeof y ? y : (new Date).getFullYear() % 100 + parseInt(y, 10), g = (r ? r.dayNamesShort : null) || this._defaults.dayNamesShort, nt = (r ? r.dayNames : null) || this._defaults.dayNames, tt = (r ? r.monthNamesShort : null) || this._defaults.monthNamesShort, it = (r ? r.monthNames : null) || this._defaults.monthNames, e = -1, s = -1, h = -1, p = -1, w = !1, l = function (n) {
						var i = t.length > o + 1 && t.charAt(o + 1) === n;
						return i && o++, i
					}, c = function (n) {
						var u = l(n),
							r = "@" === n ? 14 : "!" === n ? 20 : "y" === n && u ? 4 : "o" === n ? 3 : 2,
							e = "y" === n ? r : 1,
							o = RegExp("^\\d{" + e + "," + r + "}"),
							t = i.substring(f).match(o);
						if (!t) throw "Missing number at position " + f;
						return f += t[0].length, parseInt(t[0], 10)
					}, k = function (t, r, u) {
						var e = -1,
							o = n.map(l(t) ? u : r, function (n, t) {
								return [
									[t, n]
								]
							}).sort(function (n, t) {
								return -(n[1].length - t[1].length)
							});
						if (n.each(o, function (n, t) {
								var r = t[1];
								if (i.substr(f, r.length).toLowerCase() === r.toLowerCase()) return (e = t[0], f += r.length, !1)
							}), -1 !== e) return e + 1;
						throw "Unknown name at position " + f;
					}, b = function () {
						if (i.charAt(f) !== t.charAt(o)) throw "Unexpected literal at position " + f;
						f++
					}, o = 0; t.length > o; o++)
					if (w) "'" !== t.charAt(o) || l("'") ? b() : w = !1;
					else switch (t.charAt(o)) {
						case "d":
							h = c("d");
							break;
						case "D":
							k("D", g, nt);
							break;
						case "o":
							p = c("o");
							break;
						case "m":
							s = c("m");
							break;
						case "M":
							s = k("M", tt, it);
							break;
						case "y":
							e = c("y");
							break;
						case "@":
							u = new Date(c("@"));
							e = u.getFullYear();
							s = u.getMonth() + 1;
							h = u.getDate();
							break;
						case "!":
							u = new Date((c("!") - this._ticksTo1970) / 1e4);
							e = u.getFullYear();
							s = u.getMonth() + 1;
							h = u.getDate();
							break;
						case "'":
							l("'") ? b() : w = !0;
							break;
						default:
							b()
					}
					if (i.length > f && (v = i.substr(f), !/^\s+/.test(v))) throw "Extra/unparsed characters found in date: " + v;
				if (-1 === e ? e = (new Date).getFullYear() : 100 > e && (e += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d >= e ? 0 : -100)), p > -1)
					for (s = 1, h = p;;) {
						if (a = this._getDaysInMonth(e, s - 1), a >= h) break;
						s++;
						h -= a
					}
				if (u = this._daylightSavingAdjust(new Date(e, s - 1, h)), u.getFullYear() !== e || u.getMonth() + 1 !== s || u.getDate() !== h) throw "Invalid date";
				return u
			},
			ATOM: "yy-mm-dd",
			COOKIE: "D, dd M yy",
			ISO_8601: "yy-mm-dd",
			RFC_822: "D, d M y",
			RFC_850: "DD, dd-M-y",
			RFC_1036: "D, d M y",
			RFC_1123: "D, d M yy",
			RFC_2822: "D, d M yy",
			RSS: "D, d M y",
			TICKS: "!",
			TIMESTAMP: "@",
			W3C: "yy-mm-dd",
			_ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
			formatDate: function (n, t, i) {
				if (!t) return "";
				var u, h = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
					c = (i ? i.dayNames : null) || this._defaults.dayNames,
					l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
					a = (i ? i.monthNames : null) || this._defaults.monthNames,
					f = function (t) {
						var i = n.length > u + 1 && n.charAt(u + 1) === t;
						return i && u++, i
					},
					e = function (n, t, i) {
						var r = "" + t;
						if (f(n))
							for (; i > r.length;) r = "0" + r;
						return r
					},
					s = function (n, t, i, r) {
						return f(n) ? r[t] : i[t]
					},
					r = "",
					o = !1;
				if (t)
					for (u = 0; n.length > u; u++)
						if (o) "'" !== n.charAt(u) || f("'") ? r += n.charAt(u) : o = !1;
						else switch (n.charAt(u)) {
							case "d":
								r += e("d", t.getDate(), 2);
								break;
							case "D":
								r += s("D", t.getDay(), h, c);
								break;
							case "o":
								r += e("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
								break;
							case "m":
								r += e("m", t.getMonth() + 1, 2);
								break;
							case "M":
								r += s("M", t.getMonth(), l, a);
								break;
							case "y":
								r += f("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
								break;
							case "@":
								r += t.getTime();
								break;
							case "!":
								r += 1e4 * t.getTime() + this._ticksTo1970;
								break;
							case "'":
								f("'") ? r += "'" : o = !0;
								break;
							default:
								r += n.charAt(u)
						}
						return r
			},
			_possibleChars: function (n) {
				for (var i = "", r = !1, u = function (i) {
						var r = n.length > t + 1 && n.charAt(t + 1) === i;
						return r && t++, r
					}, t = 0; n.length > t; t++)
					if (r) "'" !== n.charAt(t) || u("'") ? i += n.charAt(t) : r = !1;
					else switch (n.charAt(t)) {
						case "d":
						case "m":
						case "y":
						case "@":
							i += "0123456789";
							break;
						case "D":
						case "M":
							return null;
						case "'":
							u("'") ? i += "'" : r = !0;
							break;
						default:
							i += n.charAt(t)
					}
					return i
			},
			_get: function (n, t) {
				return void 0 !== n.settings[t] ? n.settings[t] : this._defaults[t]
			},
			_setDateFromField: function (n, t) {
				if (n.input.val() !== n.lastVal) {
					var f = this._get(n, "dateFormat"),
						r = n.lastVal = n.input ? n.input.val() : null,
						u = this._getDefaultDate(n),
						i = u,
						e = this._getFormatConfig(n);
					try {
						i = this.parseDate(f, r, e) || u
					} catch (o) {
						r = t ? "" : r
					}
					n.selectedDay = i.getDate();
					n.drawMonth = n.selectedMonth = i.getMonth();
					n.drawYear = n.selectedYear = i.getFullYear();
					n.currentDay = r ? i.getDate() : 0;
					n.currentMonth = r ? i.getMonth() : 0;
					n.currentYear = r ? i.getFullYear() : 0;
					this._adjustInstDate(n)
				}
			},
			_getDefaultDate: function (n) {
				return this._restrictMinMax(n, this._determineDate(n, this._get(n, "defaultDate"), new Date))
			},
			_determineDate: function (t, i, r) {
				var f = function (n) {
						var t = new Date;
						return t.setDate(t.getDate() + n), t
					},
					e = function (i) {
						try {
							return n.datepicker.parseDate(n.datepicker._get(t, "dateFormat"), i, n.datepicker._getFormatConfig(t))
						} catch (h) {}
						for (var o = (i.toLowerCase().match(/^c/) ? n.datepicker._getDate(t) : null) || new Date, f = o.getFullYear(), e = o.getMonth(), r = o.getDate(), s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = s.exec(i); u;) {
							switch (u[2] || "d") {
								case "d":
								case "D":
									r += parseInt(u[1], 10);
									break;
								case "w":
								case "W":
									r += 7 * parseInt(u[1], 10);
									break;
								case "m":
								case "M":
									e += parseInt(u[1], 10);
									r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
									break;
								case "y":
								case "Y":
									f += parseInt(u[1], 10);
									r = Math.min(r, n.datepicker._getDaysInMonth(f, e))
							}
							u = s.exec(i)
						}
						return new Date(f, e, r)
					},
					u = null == i || "" === i ? r : "string" == typeof i ? e(i) : "number" == typeof i ? isNaN(i) ? r : f(i) : new Date(i.getTime());
				return u = u && "Invalid Date" == "" + u ? r : u, u && (u.setHours(0), u.setMinutes(0), u.setSeconds(0), u.setMilliseconds(0)), this._daylightSavingAdjust(u)
			},
			_daylightSavingAdjust: function (n) {
				return n ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n) : null
			},
			_setDate: function (n, t, i) {
				var u = !t,
					f = n.selectedMonth,
					e = n.selectedYear,
					r = this._restrictMinMax(n, this._determineDate(n, t, new Date));
				n.selectedDay = n.currentDay = r.getDate();
				n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth();
				n.drawYear = n.selectedYear = n.currentYear = r.getFullYear();
				f === n.selectedMonth && e === n.selectedYear || i || this._notifyChange(n);
				this._adjustInstDate(n);
				n.input && n.input.val(u ? "" : this._formatDate(n))
			},
			_getDate: function (n) {
				return !n.currentYear || n.input && "" === n.input.val() ? null : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay))
			},
			_attachHandlers: function (t) {
				var r = this._get(t, "stepMonths"),
					i = "#" + t.id.replace(/\\\\/g, "\\");
				t.dpDiv.find("[data-handler]").map(function () {
					var t = {
						prev: function () {
							n.datepicker._adjustDate(i, -r, "M")
						},
						next: function () {
							n.datepicker._adjustDate(i, +r, "M")
						},
						hide: function () {
							n.datepicker._hideDatepicker()
						},
						today: function () {
							n.datepicker._gotoToday(i)
						},
						selectDay: function () {
							return n.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
						},
						selectMonth: function () {
							return n.datepicker._selectMonthYear(i, this, "M"), !1
						},
						selectYear: function () {
							return n.datepicker._selectMonthYear(i, this, "Y"), !1
						}
					};
					n(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
				})
			},
			_generateHTML: function (n) {
				var b, s, rt, h, ut, k, ft, et, ri, c, ot, ui, fi, ei, oi, st, g, si, ht, nt, o, y, ct, p, lt, l, u, at, vt, yt, pt, tt, wt, i, bt, kt, d, a, it, dt = new Date,
					gt = this._daylightSavingAdjust(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())),
					f = this._get(n, "isRTL"),
					li = this._get(n, "showButtonPanel"),
					hi = this._get(n, "hideIfNoPrevNext"),
					ni = this._get(n, "navigationAsDateFormat"),
					e = this._getNumberOfMonths(n),
					ai = this._get(n, "showCurrentAtPos"),
					ci = this._get(n, "stepMonths"),
					ti = 1 !== e[0] || 1 !== e[1],
					ii = this._daylightSavingAdjust(n.currentDay ? new Date(n.currentYear, n.currentMonth, n.currentDay) : new Date(9999, 9, 9)),
					w = this._getMinMaxDate(n, "min"),
					v = this._getMinMaxDate(n, "max"),
					t = n.drawMonth - ai,
					r = n.drawYear;
				if (0 > t && (t += 12, r--), v)
					for (b = this._daylightSavingAdjust(new Date(v.getFullYear(), v.getMonth() - e[0] * e[1] + 1, v.getDate())), b = w && w > b ? w : b; this._daylightSavingAdjust(new Date(r, t, 1)) > b;) t--, 0 > t && (t = 11, r--);
				for (n.drawMonth = t, n.drawYear = r, s = this._get(n, "prevText"), s = ni ? this.formatDate(s, this._daylightSavingAdjust(new Date(r, t - ci, 1)), this._getFormatConfig(n)) : s, rt = this._canAdjustMonth(n, -1, r, t) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>", h = this._get(n, "nextText"), h = ni ? this.formatDate(h, this._daylightSavingAdjust(new Date(r, t + ci, 1)), this._getFormatConfig(n)) : h, ut = this._canAdjustMonth(n, 1, r, t) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>", k = this._get(n, "currentText"), ft = this._get(n, "gotoCurrent") && n.currentDay ? ii : gt, k = ni ? this.formatDate(k, ft, this._getFormatConfig(n)) : k, et = n.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(n, "closeText") + "<\/button>", ri = li ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (f ? et : "") + (this._isInRange(n, ft) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + k + "<\/button>" : "") + (f ? "" : et) + "<\/div>" : "", c = parseInt(this._get(n, "firstDay"), 10), c = isNaN(c) ? 0 : c, ot = this._get(n, "showWeek"), ui = this._get(n, "dayNames"), fi = this._get(n, "dayNamesMin"), ei = this._get(n, "monthNames"), oi = this._get(n, "monthNamesShort"), st = this._get(n, "beforeShowDay"), g = this._get(n, "showOtherMonths"), si = this._get(n, "selectOtherMonths"), ht = this._getDefaultDate(n), nt = "", y = 0; e[0] > y; y++) {
					for (ct = "", this.maxRows = 4, p = 0; e[1] > p; p++) {
						if (lt = this._daylightSavingAdjust(new Date(r, t, n.selectedDay)), l = " ui-corner-all", u = "", ti) {
							if (u += "<div class='ui-datepicker-group", e[1] > 1) switch (p) {
								case 0:
									u += " ui-datepicker-group-first";
									l = " ui-corner-" + (f ? "right" : "left");
									break;
								case e[1] - 1:
									u += " ui-datepicker-group-last";
									l = " ui-corner-" + (f ? "left" : "right");
									break;
								default:
									u += " ui-datepicker-group-middle";
									l = ""
							}
							u += "'>"
						}
						for (u += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + l + "'>" + (/all|left/.test(l) && 0 === y ? f ? ut : rt : "") + (/all|right/.test(l) && 0 === y ? f ? rt : ut : "") + this._generateMonthYearHeader(n, t, r, w, v, y > 0 || p > 0, ei, oi) + "<\/div><table class='ui-datepicker-calendar'><thead><tr>", at = ot ? "<th class='ui-datepicker-week-col'>" + this._get(n, "weekHeader") + "<\/th>" : "", o = 0; 7 > o; o++) vt = (o + c) % 7, at += "<th scope='col'" + ((o + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + ui[vt] + "'>" + fi[vt] + "<\/span><\/th>";
						for (u += at + "<\/tr><\/thead><tbody>", yt = this._getDaysInMonth(r, t), r === n.selectedYear && t === n.selectedMonth && (n.selectedDay = Math.min(n.selectedDay, yt)), pt = (this._getFirstDayOfMonth(r, t) - c + 7) % 7, tt = Math.ceil((pt + yt) / 7), wt = ti ? this.maxRows > tt ? this.maxRows : tt : tt, this.maxRows = wt, i = this._daylightSavingAdjust(new Date(r, t, 1 - pt)), bt = 0; wt > bt; bt++) {
							for (u += "<tr>", kt = ot ? "<td class='ui-datepicker-week-col'>" + this._get(n, "calculateWeek")(i) + "<\/td>" : "", o = 0; 7 > o; o++) d = st ? st.apply(n.input ? n.input[0] : null, [i]) : [!0, ""], a = i.getMonth() !== t, it = a && !si || !d[0] || w && w > i || v && i > v, kt += "<td class='" + ((o + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (a ? " ui-datepicker-other-month" : "") + (i.getTime() === lt.getTime() && t === n.selectedMonth && n._keyEvent || ht.getTime() === i.getTime() && ht.getTime() === lt.getTime() ? " " + this._dayOverClass : "") + (it ? " " + this._unselectableClass + " ui-state-disabled" : "") + (a && !g ? "" : " " + d[1] + (i.getTime() === ii.getTime() ? " " + this._currentClass : "") + (i.getTime() === gt.getTime() ? " ui-datepicker-today" : "")) + "'" + (a && !g || !d[2] ? "" : " title='" + d[2].replace(/'/g, "&#39;") + "'") + (it ? "" : " data-handler='selectDay' data-event='click' data-month='" + i.getMonth() + "' data-year='" + i.getFullYear() + "'") + ">" + (a && !g ? "&#xa0;" : it ? "<span class='ui-state-default'>" + i.getDate() + "<\/span>" : "<a class='ui-state-default" + (i.getTime() === gt.getTime() ? " ui-state-highlight" : "") + (i.getTime() === ii.getTime() ? " ui-state-active" : "") + (a ? " ui-priority-secondary" : "") + "' href='#'>" + i.getDate() + "<\/a>") + "<\/td>", i.setDate(i.getDate() + 1), i = this._daylightSavingAdjust(i);
							u += kt + "<\/tr>"
						}
						t++;
						t > 11 && (t = 0, r++);
						u += "<\/tbody><\/table>" + (ti ? "<\/div>" + (e[0] > 0 && p === e[1] - 1 ? "<div class='ui-datepicker-row-break'><\/div>" : "") : "");
						ct += u
					}
					nt += ct
				}
				return nt += ri, n._keyEvent = !1, nt
			},
			_generateMonthYearHeader: function (n, t, i, r, u, f, e, o) {
				var k, d, h, v, y, p, s, a, w = this._get(n, "changeMonth"),
					b = this._get(n, "changeYear"),
					g = this._get(n, "showMonthAfterYear"),
					c = "<div class='ui-datepicker-title'>",
					l = "";
				if (f || !w) l += "<span class='ui-datepicker-month'>" + e[t] + "<\/span>";
				else {
					for (k = r && r.getFullYear() === i, d = u && u.getFullYear() === i, l += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", h = 0; 12 > h; h++)(!k || h >= r.getMonth()) && (!d || u.getMonth() >= h) && (l += "<option value='" + h + "'" + (h === t ? " selected='selected'" : "") + ">" + o[h] + "<\/option>");
					l += "<\/select>"
				}
				if (g || (c += l + (!f && w && b ? "" : "&#xa0;")), !n.yearshtml)
					if (n.yearshtml = "", f || !b) c += "<span class='ui-datepicker-year'>" + i + "<\/span>";
					else {
						for (v = this._get(n, "yearRange").split(":"), y = (new Date).getFullYear(), p = function (n) {
								var t = n.match(/c[+\-].*/) ? i + parseInt(n.substring(1), 10) : n.match(/[+\-].*/) ? y + parseInt(n, 10) : parseInt(n, 10);
								return isNaN(t) ? y : t
							}, s = p(v[0]), a = Math.max(s, p(v[1] || "")), s = r ? Math.max(s, r.getFullYear()) : s, a = u ? Math.min(a, u.getFullYear()) : a, n.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; a >= s; s++) n.yearshtml += "<option value='" + s + "'" + (s === i ? " selected='selected'" : "") + ">" + s + "<\/option>";
						n.yearshtml += "<\/select>";
						c += n.yearshtml;
						n.yearshtml = null
					}
				return c += this._get(n, "yearSuffix"), g && (c += (!f && w && b ? "" : "&#xa0;") + l), c + "<\/div>"
			},
			_adjustInstDate: function (n, t, i) {
				var u = n.drawYear + ("Y" === i ? t : 0),
					f = n.drawMonth + ("M" === i ? t : 0),
					e = Math.min(n.selectedDay, this._getDaysInMonth(u, f)) + ("D" === i ? t : 0),
					r = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(u, f, e)));
				n.selectedDay = r.getDate();
				n.drawMonth = n.selectedMonth = r.getMonth();
				n.drawYear = n.selectedYear = r.getFullYear();
				("M" === i || "Y" === i) && this._notifyChange(n)
			},
			_restrictMinMax: function (n, t) {
				var i = this._getMinMaxDate(n, "min"),
					r = this._getMinMaxDate(n, "max"),
					u = i && i > t ? i : t;
				return r && u > r ? r : u
			},
			_notifyChange: function (n) {
				var t = this._get(n, "onChangeMonthYear");
				t && t.apply(n.input ? n.input[0] : null, [n.selectedYear, n.selectedMonth + 1, n])
			},
			_getNumberOfMonths: function (n) {
				var t = this._get(n, "numberOfMonths");
				return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
			},
			_getMinMaxDate: function (n, t) {
				return this._determineDate(n, this._get(n, t + "Date"), null)
			},
			_getDaysInMonth: function (n, t) {
				return 32 - this._daylightSavingAdjust(new Date(n, t, 32)).getDate()
			},
			_getFirstDayOfMonth: function (n, t) {
				return new Date(n, t, 1).getDay()
			},
			_canAdjustMonth: function (n, t, i, r) {
				var f = this._getNumberOfMonths(n),
					u = this._daylightSavingAdjust(new Date(i, r + (0 > t ? t : f[0] * f[1]), 1));
				return 0 > t && u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())), this._isInRange(n, u)
			},
			_isInRange: function (n, t) {
				var i, f, e = this._getMinMaxDate(n, "min"),
					o = this._getMinMaxDate(n, "max"),
					r = null,
					u = null,
					s = this._get(n, "yearRange");
				return s && (i = s.split(":"), f = (new Date).getFullYear(), r = parseInt(i[0], 10), u = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += f), i[1].match(/[+\-].*/) && (u += f)), (!e || t.getTime() >= e.getTime()) && (!o || t.getTime() <= o.getTime()) && (!r || t.getFullYear() >= r) && (!u || u >= t.getFullYear())
			},
			_getFormatConfig: function (n) {
				var t = this._get(n, "shortYearCutoff");
				return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
					shortYearCutoff: t,
					dayNamesShort: this._get(n, "dayNamesShort"),
					dayNames: this._get(n, "dayNames"),
					monthNamesShort: this._get(n, "monthNamesShort"),
					monthNames: this._get(n, "monthNames")
				}
			},
			_formatDate: function (n, t, i, r) {
				t || (n.currentDay = n.selectedDay, n.currentMonth = n.selectedMonth, n.currentYear = n.selectedYear);
				var u = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(r, i, t)) : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay));
				return this.formatDate(this._get(n, "dateFormat"), u, this._getFormatConfig(n))
			}
		});
		n.fn.datepicker = function (t) {
			if (!this.length) return this;
			n.datepicker.initialized || (n(document).mousedown(n.datepicker._checkExternalClick), n.datepicker.initialized = !0);
			0 === n("#" + n.datepicker._mainDivId).length && n("body").append(n.datepicker.dpDiv);
			var i = Array.prototype.slice.call(arguments, 1);
			return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : this.each(function () {
				"string" == typeof t ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this].concat(i)) : n.datepicker._attachDatepicker(this, t)
			}) : n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i))
		};
		n.datepicker = new l;
		n.datepicker.initialized = !1;
		n.datepicker.uuid = (new Date).getTime();
		n.datepicker.version = "1.11.1";
		n.datepicker;
		n.widget("ui.dialog", {
			version: "1.11.1",
			options: {
				appendTo: "body",
				autoOpen: !0,
				buttons: [],
				closeOnEscape: !0,
				closeText: "Close",
				dialogClass: "",
				draggable: !0,
				hide: null,
				height: "auto",
				maxHeight: null,
				maxWidth: null,
				minHeight: 150,
				minWidth: 150,
				modal: !1,
				position: {
					my: "center",
					at: "center",
					of: window,
					collision: "fit",
					using: function (t) {
						var i = n(this).css(t).offset().top;
						0 > i && n(this).css("top", t.top - i)
					}
				},
				resizable: !0,
				show: null,
				title: null,
				width: 300,
				beforeClose: null,
				close: null,
				drag: null,
				dragStart: null,
				dragStop: null,
				focus: null,
				open: null,
				resize: null,
				resizeStart: null,
				resizeStop: null
			},
			sizeRelatedOptions: {
				buttons: !0,
				height: !0,
				maxHeight: !0,
				maxWidth: !0,
				minHeight: !0,
				minWidth: !0,
				width: !0
			},
			resizableRelatedOptions: {
				maxHeight: !0,
				maxWidth: !0,
				minHeight: !0,
				minWidth: !0
			},
			_create: function () {
				this.originalCss = {
					display: this.element[0].style.display,
					width: this.element[0].style.width,
					minHeight: this.element[0].style.minHeight,
					maxHeight: this.element[0].style.maxHeight,
					height: this.element[0].style.height
				};
				this.originalPosition = {
					parent: this.element.parent(),
					index: this.element.parent().children().index(this.element)
				};
				this.originalTitle = this.element.attr("title");
				this.options.title = this.options.title || this.originalTitle;
				this._createWrapper();
				this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
				this._createTitlebar();
				this._createButtonPane();
				this.options.draggable && n.fn.draggable && this._makeDraggable();
				this.options.resizable && n.fn.resizable && this._makeResizable();
				this._isOpen = !1;
				this._trackFocus()
			},
			_init: function () {
				this.options.autoOpen && this.open()
			},
			_appendTo: function () {
				var t = this.options.appendTo;
				return t && (t.jquery || t.nodeType) ? n(t) : this.document.find(t || "body").eq(0)
			},
			_destroy: function () {
				var n, t = this.originalPosition;
				this._destroyOverlay();
				this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
				this.uiDialog.stop(!0, !0).remove();
				this.originalTitle && this.element.attr("title", this.originalTitle);
				n = t.parent.children().eq(t.index);
				n.length && n[0] !== this.element[0] ? n.before(this.element) : t.parent.append(this.element)
			},
			widget: function () {
				return this.uiDialog
			},
			disable: n.noop,
			enable: n.noop,
			close: function (t) {
				var i, r = this;
				if (this._isOpen && this._trigger("beforeClose", t) !== !1) {
					if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length) try {
						i = this.document[0].activeElement;
						i && "body" !== i.nodeName.toLowerCase() && n(i).blur()
					} catch (u) {}
					this._hide(this.uiDialog, this.options.hide, function () {
						r._trigger("close", t)
					})
				}
			},
			isOpen: function () {
				return this._isOpen
			},
			moveToTop: function () {
				this._moveToTop()
			},
			_moveToTop: function (t, i) {
				var r = !1,
					f = this.uiDialog.siblings(".ui-front:visible").map(function () {
						return +n(this).css("z-index")
					}).get(),
					u = Math.max.apply(null, f);
				return u >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", u + 1), r = !0), r && !i && this._trigger("focus", t), r
			},
			open: function () {
				var t = this;
				return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = n(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function () {
					t._focusTabbable();
					t._trigger("focus")
				}), this._makeFocusTarget(), this._trigger("open"), void 0)
			},
			_focusTabbable: function () {
				var n = this._focusedElement;
				n || (n = this.element.find("[autofocus]"));
				n.length || (n = this.element.find(":tabbable"));
				n.length || (n = this.uiDialogButtonPane.find(":tabbable"));
				n.length || (n = this.uiDialogTitlebarClose.filter(":tabbable"));
				n.length || (n = this.uiDialog);
				n.eq(0).focus()
			},
			_keepFocus: function (t) {
				function i() {
					var t = this.document[0].activeElement,
						i = this.uiDialog[0] === t || n.contains(this.uiDialog[0], t);
					i || this._focusTabbable()
				}
				t.preventDefault();
				i.call(this);
				this._delay(i)
			},
			_createWrapper: function () {
				this.uiDialog = n("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
					tabIndex: -1,
					role: "dialog"
				}).appendTo(this._appendTo());
				this._on(this.uiDialog, {
					keydown: function (t) {
						if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === n.ui.keyCode.ESCAPE) return t.preventDefault(), this.close(t), void 0;
						if (t.keyCode === n.ui.keyCode.TAB && !t.isDefaultPrevented()) {
							var i = this.uiDialog.find(":tabbable"),
								r = i.filter(":first"),
								u = i.filter(":last");
							t.target !== u[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== r[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (this._delay(function () {
								u.focus()
							}), t.preventDefault()) : (this._delay(function () {
								r.focus()
							}), t.preventDefault())
						}
					},
					mousedown: function (n) {
						this._moveToTop(n) && this._focusTabbable()
					}
				});
				this.element.find("[aria-describedby]").length || this.uiDialog.attr({
					"aria-describedby": this.element.uniqueId().attr("id")
				})
			},
			_createTitlebar: function () {
				var t;
				this.uiDialogTitlebar = n("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
				this._on(this.uiDialogTitlebar, {
					mousedown: function (t) {
						n(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
					}
				});
				this.uiDialogTitlebarClose = n("<button type='button'><\/button>").button({
					label: this.options.closeText,
					icons: {
						primary: "ui-icon-closethick"
					},
					text: !1
				}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
				this._on(this.uiDialogTitlebarClose, {
					click: function (n) {
						n.preventDefault();
						this.close(n)
					}
				});
				t = n("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
				this._title(t);
				this.uiDialog.attr({
					"aria-labelledby": t.attr("id")
				})
			},
			_title: function (n) {
				this.options.title || n.html("&#160;");
				n.text(this.options.title)
			},
			_createButtonPane: function () {
				this.uiDialogButtonPane = n("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
				this.uiButtonSet = n("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
				this._createButtons()
			},
			_createButtons: function () {
				var i = this,
					t = this.options.buttons;
				return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), n.isEmptyObject(t) || n.isArray(t) && !t.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), void 0) : (n.each(t, function (t, r) {
					var u, f;
					r = n.isFunction(r) ? {
						click: r,
						text: t
					} : r;
					r = n.extend({
						type: "button"
					}, r);
					u = r.click;
					r.click = function () {
						u.apply(i.element[0], arguments)
					};
					f = {
						icons: r.icons,
						text: r.showText
					};
					delete r.icons;
					delete r.showText;
					n("<button><\/button>", r).button(f).appendTo(i.uiButtonSet)
				}), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0)
			},
			_makeDraggable: function () {
				function i(n) {
					return {
						position: n.position,
						offset: n.offset
					}
				}
				var t = this,
					r = this.options;
				this.uiDialog.draggable({
					cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
					handle: ".ui-dialog-titlebar",
					containment: "document",
					start: function (r, u) {
						n(this).addClass("ui-dialog-dragging");
						t._blockFrames();
						t._trigger("dragStart", r, i(u))
					},
					drag: function (n, r) {
						t._trigger("drag", n, i(r))
					},
					stop: function (u, f) {
						var e = f.offset.left - t.document.scrollLeft(),
							o = f.offset.top - t.document.scrollTop();
						r.position = {
							my: "left top",
							at: "left" + (e >= 0 ? "+" : "") + e + " top" + (o >= 0 ? "+" : "") + o,
							of: t.window
						};
						n(this).removeClass("ui-dialog-dragging");
						t._unblockFrames();
						t._trigger("dragStop", u, i(f))
					}
				})
			},
			_makeResizable: function () {
				function r(n) {
					return {
						originalPosition: n.originalPosition,
						originalSize: n.originalSize,
						position: n.position,
						size: n.size
					}
				}
				var t = this,
					i = this.options,
					u = i.resizable,
					f = this.uiDialog.css("position"),
					e = "string" == typeof u ? u : "n,e,s,w,se,sw,ne,nw";
				this.uiDialog.resizable({
					cancel: ".ui-dialog-content",
					containment: "document",
					alsoResize: this.element,
					maxWidth: i.maxWidth,
					maxHeight: i.maxHeight,
					minWidth: i.minWidth,
					minHeight: this._minHeight(),
					handles: e,
					start: function (i, u) {
						n(this).addClass("ui-dialog-resizing");
						t._blockFrames();
						t._trigger("resizeStart", i, r(u))
					},
					resize: function (n, i) {
						t._trigger("resize", n, r(i))
					},
					stop: function (u, f) {
						var e = t.uiDialog.offset(),
							o = e.left - t.document.scrollLeft(),
							s = e.top - t.document.scrollTop();
						i.height = t.uiDialog.height();
						i.width = t.uiDialog.width();
						i.position = {
							my: "left top",
							at: "left" + (o >= 0 ? "+" : "") + o + " top" + (s >= 0 ? "+" : "") + s,
							of: t.window
						};
						n(this).removeClass("ui-dialog-resizing");
						t._unblockFrames();
						t._trigger("resizeStop", u, r(f))
					}
				}).css("position", f)
			},
			_trackFocus: function () {
				this._on(this.widget(), {
					focusin: function (t) {
						this._makeFocusTarget();
						this._focusedElement = n(t.target)
					}
				})
			},
			_makeFocusTarget: function () {
				this._untrackInstance();
				this._trackingInstances().unshift(this)
			},
			_untrackInstance: function () {
				var t = this._trackingInstances(),
					i = n.inArray(this, t); - 1 !== i && t.splice(i, 1)
			},
			_trackingInstances: function () {
				var n = this.document.data("ui-dialog-instances");
				return n || (n = [], this.document.data("ui-dialog-instances", n)), n
			},
			_minHeight: function () {
				var n = this.options;
				return "auto" === n.height ? n.minHeight : Math.min(n.minHeight, n.height)
			},
			_position: function () {
				var n = this.uiDialog.is(":visible");
				n || this.uiDialog.show();
				this.uiDialog.position(this.options.position);
				n || this.uiDialog.hide()
			},
			_setOptions: function (t) {
				var i = this,
					r = !1,
					u = {};
				n.each(t, function (n, t) {
					i._setOption(n, t);
					n in i.sizeRelatedOptions && (r = !0);
					n in i.resizableRelatedOptions && (u[n] = t)
				});
				r && (this._size(), this._position());
				this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", u)
			},
			_setOption: function (n, t) {
				var u, r, i = this.uiDialog;
				"dialogClass" === n && i.removeClass(this.options.dialogClass).addClass(t);
				"disabled" !== n && (this._super(n, t), "appendTo" === n && this.uiDialog.appendTo(this._appendTo()), "buttons" === n && this._createButtons(), "closeText" === n && this.uiDialogTitlebarClose.button({
					label: "" + t
				}), "draggable" === n && (u = i.is(":data(ui-draggable)"), u && !t && i.draggable("destroy"), !u && t && this._makeDraggable()), "position" === n && this._position(), "resizable" === n && (r = i.is(":data(ui-resizable)"), r && !t && i.resizable("destroy"), r && "string" == typeof t && i.resizable("option", "handles", t), r || t === !1 || this._makeResizable()), "title" === n && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
			},
			_size: function () {
				var t, i, r, n = this.options;
				this.element.show().css({
					width: "auto",
					minHeight: 0,
					maxHeight: "none",
					height: 0
				});
				n.minWidth > n.width && (n.width = n.minWidth);
				t = this.uiDialog.css({
					height: "auto",
					width: n.width
				}).outerHeight();
				i = Math.max(0, n.minHeight - t);
				r = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none";
				"auto" === n.height ? this.element.css({
					minHeight: i,
					maxHeight: r,
					height: "auto"
				}) : this.element.height(Math.max(0, n.height - t));
				this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
			},
			_blockFrames: function () {
				this.iframeBlocks = this.document.find("iframe").map(function () {
					var t = n(this);
					return n("<div>").css({
						position: "absolute",
						width: t.outerWidth(),
						height: t.outerHeight()
					}).appendTo(t.parent()).offset(t.offset())[0]
				})
			},
			_unblockFrames: function () {
				this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
			},
			_allowInteraction: function (t) {
				return n(t.target).closest(".ui-dialog").length ? !0 : !!n(t.target).closest(".ui-datepicker").length
			},
			_createOverlay: function () {
				if (this.options.modal) {
					var t = !0;
					this._delay(function () {
						t = !1
					});
					this.document.data("ui-dialog-overlays") || this._on(this.document, {
						focusin: function (n) {
							t || this._allowInteraction(n) || (n.preventDefault(), this._trackingInstances()[0]._focusTabbable())
						}
					});
					this.overlay = n("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());
					this._on(this.overlay, {
						mousedown: "_keepFocus"
					});
					this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
				}
			},
			_destroyOverlay: function () {
				if (this.options.modal && this.overlay) {
					var n = this.document.data("ui-dialog-overlays") - 1;
					n ? this.document.data("ui-dialog-overlays", n) : this.document.unbind("focusin").removeData("ui-dialog-overlays");
					this.overlay.remove();
					this.overlay = null
				}
			}
		});
		n.widget("ui.progressbar", {
			version: "1.11.1",
			options: {
				max: 100,
				value: 0,
				change: null,
				complete: null
			},
			min: 0,
			_create: function () {
				this.oldValue = this.options.value = this._constrainedValue();
				this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
					role: "progressbar",
					"aria-valuemin": this.min
				});
				this.valueDiv = n("<div class='ui-progressbar-value ui-widget-header ui-corner-left'><\/div>").appendTo(this.element);
				this._refreshValue()
			},
			_destroy: function () {
				this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
				this.valueDiv.remove()
			},
			value: function (n) {
				return void 0 === n ? this.options.value : (this.options.value = this._constrainedValue(n), this._refreshValue(), void 0)
			},
			_constrainedValue: function (n) {
				return void 0 === n && (n = this.options.value), this.indeterminate = n === !1, "number" != typeof n && (n = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, n))
			},
			_setOptions: function (n) {
				var t = n.value;
				delete n.value;
				this._super(n);
				this.options.value = this._constrainedValue(t);
				this._refreshValue()
			},
			_setOption: function (n, t) {
				"max" === n && (t = Math.max(this.min, t));
				"disabled" === n && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t);
				this._super(n, t)
			},
			_percentage: function () {
				return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
			},
			_refreshValue: function () {
				var t = this.options.value,
					i = this._percentage();
				this.valueDiv.toggle(this.indeterminate || t > this.min).toggleClass("ui-corner-right", t === this.options.max).width(i.toFixed(0) + "%");
				this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
				this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = n("<div class='ui-progressbar-overlay'><\/div>").appendTo(this.valueDiv))) : (this.element.attr({
					"aria-valuemax": this.options.max,
					"aria-valuenow": t
				}), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null));
				this.oldValue !== t && (this.oldValue = t, this._trigger("change"));
				t === this.options.max && this._trigger("complete")
			}
		});
		n.widget("ui.selectmenu", {
			version: "1.11.1",
			defaultElement: "<select>",
			options: {
				appendTo: null,
				disabled: null,
				icons: {
					button: "ui-icon-triangle-1-s"
				},
				position: {
					my: "left top",
					at: "left bottom",
					collision: "none"
				},
				width: null,
				change: null,
				close: null,
				focus: null,
				open: null,
				select: null
			},
			_create: function () {
				var n = this.element.uniqueId().attr("id");
				this.ids = {
					element: n,
					button: n + "-button",
					menu: n + "-menu"
				};
				this._drawButton();
				this._drawMenu();
				this.options.disabled && this.disable()
			},
			_drawButton: function () {
				var t = this,
					i = this.element.attr("tabindex");
				this.label = n("label[for='" + this.ids.element + "']").attr("for", this.ids.button);
				this._on(this.label, {
					click: function (n) {
						this.button.focus();
						n.preventDefault()
					}
				});
				this.element.hide();
				this.button = n("<span>", {
					"class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
					tabindex: i || this.options.disabled ? -1 : 0,
					id: this.ids.button,
					role: "combobox",
					"aria-expanded": "false",
					"aria-autocomplete": "list",
					"aria-owns": this.ids.menu,
					"aria-haspopup": "true"
				}).insertAfter(this.element);
				n("<span>", {
					"class": "ui-icon " + this.options.icons.button
				}).prependTo(this.button);
				this.buttonText = n("<span>", {
					"class": "ui-selectmenu-text"
				}).appendTo(this.button);
				this._setText(this.buttonText, this.element.find("option:selected").text());
				this._resizeButton();
				this._on(this.button, this._buttonEvents);
				this.button.one("focusin", function () {
					t.menuItems || t._refreshMenu()
				});
				this._hoverable(this.button);
				this._focusable(this.button)
			},
			_drawMenu: function () {
				var t = this;
				this.menu = n("<ul>", {
					"aria-hidden": "true",
					"aria-labelledby": this.ids.button,
					id: this.ids.menu
				});
				this.menuWrap = n("<div>", {
					"class": "ui-selectmenu-menu ui-front"
				}).append(this.menu).appendTo(this._appendTo());
				this.menuInstance = this.menu.menu({
					role: "listbox",
					select: function (n, i) {
						n.preventDefault();
						t._select(i.item.data("ui-selectmenu-item"), n)
					},
					focus: function (n, i) {
						var r = i.item.data("ui-selectmenu-item");
						null != t.focusIndex && r.index !== t.focusIndex && (t._trigger("focus", n, {
							item: r
						}), t.isOpen || t._select(r, n));
						t.focusIndex = r.index;
						t.button.attr("aria-activedescendant", t.menuItems.eq(r.index).attr("id"))
					}
				}).menu("instance");
				this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all");
				this.menuInstance._off(this.menu, "mouseleave");
				this.menuInstance._closeOnDocumentClick = function () {
					return !1
				};
				this.menuInstance._isDivider = function () {
					return !1
				}
			},
			refresh: function () {
				this._refreshMenu();
				this._setText(this.buttonText, this._getSelectedItem().text());
				this.options.width || this._resizeButton()
			},
			_refreshMenu: function () {
				this.menu.empty();
				var n, t = this.element.find("option");
				t.length && (this._parseOptions(t), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), n = this._getSelectedItem(), this.menuInstance.focus(null, n), this._setAria(n.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
			},
			open: function (n) {
				this.options.disabled || (this.menuItems ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", n))
			},
			_position: function () {
				this.menuWrap.position(n.extend({
					of: this.button
				}, this.options.position))
			},
			close: function (n) {
				this.isOpen && (this.isOpen = !1, this._toggleAttr(), this._off(this.document), this._trigger("close", n))
			},
			widget: function () {
				return this.button
			},
			menuWidget: function () {
				return this.menu
			},
			_renderMenu: function (t, i) {
				var u = this,
					r = "";
				n.each(i, function (i, f) {
					f.optgroup !== r && (n("<li>", {
						"class": "ui-selectmenu-optgroup ui-menu-divider" + (f.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""),
						text: f.optgroup
					}).appendTo(t), r = f.optgroup);
					u._renderItemData(t, f)
				})
			},
			_renderItemData: function (n, t) {
				return this._renderItem(n, t).data("ui-selectmenu-item", t)
			},
			_renderItem: function (t, i) {
				var r = n("<li>");
				return i.disabled && r.addClass("ui-state-disabled"), this._setText(r, i.label), r.appendTo(t)
			},
			_setText: function (n, t) {
				t ? n.text(t) : n.html("&#160;")
			},
			_move: function (n, t) {
				var i, r, u = ".ui-menu-item";
				this.isOpen ? i = this.menuItems.eq(this.focusIndex) : (i = this.menuItems.eq(this.element[0].selectedIndex), u += ":not(.ui-state-disabled)");
				r = "first" === n || "last" === n ? i["first" === n ? "prevAll" : "nextAll"](u).eq(-1) : i[n + "All"](u).eq(0);
				r.length && this.menuInstance.focus(t, r)
			},
			_getSelectedItem: function () {
				return this.menuItems.eq(this.element[0].selectedIndex)
			},
			_toggle: function (n) {
				this[this.isOpen ? "close" : "open"](n)
			},
			_documentClick: {
				mousedown: function (t) {
					this.isOpen && (n(t.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(t))
				}
			},
			_buttonEvents: {
				mousedown: function (n) {
					n.preventDefault()
				},
				click: "_toggle",
				keydown: function (t) {
					var i = !0;
					switch (t.keyCode) {
						case n.ui.keyCode.TAB:
						case n.ui.keyCode.ESCAPE:
							this.close(t);
							i = !1;
							break;
						case n.ui.keyCode.ENTER:
							this.isOpen && this._selectFocusedItem(t);
							break;
						case n.ui.keyCode.UP:
							t.altKey ? this._toggle(t) : this._move("prev", t);
							break;
						case n.ui.keyCode.DOWN:
							t.altKey ? this._toggle(t) : this._move("next", t);
							break;
						case n.ui.keyCode.SPACE:
							this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
							break;
						case n.ui.keyCode.LEFT:
							this._move("prev", t);
							break;
						case n.ui.keyCode.RIGHT:
							this._move("next", t);
							break;
						case n.ui.keyCode.HOME:
						case n.ui.keyCode.PAGE_UP:
							this._move("first", t);
							break;
						case n.ui.keyCode.END:
						case n.ui.keyCode.PAGE_DOWN:
							this._move("last", t);
							break;
						default:
							this.menu.trigger(t);
							i = !1
					}
					i && t.preventDefault()
				}
			},
			_selectFocusedItem: function (n) {
				var t = this.menuItems.eq(this.focusIndex);
				t.hasClass("ui-state-disabled") || this._select(t.data("ui-selectmenu-item"), n)
			},
			_select: function (n, t) {
				var i = this.element[0].selectedIndex;
				this.element[0].selectedIndex = n.index;
				this._setText(this.buttonText, n.label);
				this._setAria(n);
				this._trigger("select", t, {
					item: n
				});
				n.index !== i && this._trigger("change", t, {
					item: n
				});
				this.close(t)
			},
			_setAria: function (n) {
				var t = this.menuItems.eq(n.index).attr("id");
				this.button.attr({
					"aria-labelledby": t,
					"aria-activedescendant": t
				});
				this.menu.attr("aria-activedescendant", t)
			},
			_setOption: function (n, t) {
				"icons" === n && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(t.button);
				this._super(n, t);
				"appendTo" === n && this.menuWrap.appendTo(this._appendTo());
				"disabled" === n && (this.menuInstance.option("disabled", t), this.button.toggleClass("ui-state-disabled", t).attr("aria-disabled", t), this.element.prop("disabled", t), t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0));
				"width" === n && this._resizeButton()
			},
			_appendTo: function () {
				var t = this.options.appendTo;
				return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
			},
			_toggleAttr: function () {
				this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen);
				this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen);
				this.menu.attr("aria-hidden", !this.isOpen)
			},
			_resizeButton: function () {
				var n = this.options.width;
				n || (n = this.element.show().outerWidth(), this.element.hide());
				this.button.outerWidth(n)
			},
			_resizeMenu: function () {
				this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
			},
			_getCreateOptions: function () {
				return {
					disabled: this.element.prop("disabled")
				}
			},
			_parseOptions: function (t) {
				var i = [];
				t.each(function (t, r) {
					var u = n(r),
						f = u.parent("optgroup");
					i.push({
						element: u,
						index: t,
						value: u.attr("value"),
						label: u.text(),
						optgroup: f.attr("label") || "",
						disabled: f.prop("disabled") || u.prop("disabled")
					})
				});
				this.items = i
			},
			_destroy: function () {
				this.menuWrap.remove();
				this.button.remove();
				this.element.show();
				this.element.removeUniqueId();
				this.label.attr("for", this.ids.element)
			}
		});
		n.widget("ui.slider", n.ui.mouse, {
			version: "1.11.1",
			widgetEventPrefix: "slide",
			options: {
				animate: !1,
				distance: 0,
				max: 100,
				min: 0,
				orientation: "horizontal",
				range: !1,
				step: 1,
				value: 0,
				values: null,
				change: null,
				slide: null,
				start: null,
				stop: null
			},
			numPages: 5,
			_create: function () {
				this._keySliding = !1;
				this._mouseSliding = !1;
				this._animateOff = !0;
				this._handleIndex = null;
				this._detectOrientation();
				this._mouseInit();
				this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
				this._refresh();
				this._setOption("disabled", this.options.disabled);
				this._animateOff = !1
			},
			_refresh: function () {
				this._createRange();
				this._createHandles();
				this._setupEvents();
				this._refreshValue()
			},
			_createHandles: function () {
				var r, i, u = this.options,
					t = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
					f = [];
				for (i = u.values && u.values.length || 1, t.length > i && (t.slice(i).remove(), t = t.slice(0, i)), r = t.length; i > r; r++) f.push("<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'><\/span>");
				this.handles = t.add(n(f.join("")).appendTo(this.element));
				this.handle = this.handles.eq(0);
				this.handles.each(function (t) {
					n(this).data("ui-slider-handle-index", t)
				})
			},
			_createRange: function () {
				var t = this.options,
					i = "";
				t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : n.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
					left: "",
					bottom: ""
				}) : (this.range = n("<div><\/div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : (this.range && this.range.remove(), this.range = null)
			},
			_setupEvents: function () {
				this._off(this.handles);
				this._on(this.handles, this._handleEvents);
				this._hoverable(this.handles);
				this._focusable(this.handles)
			},
			_destroy: function () {
				this.handles.remove();
				this.range && this.range.remove();
				this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all");
				this._mouseDestroy()
			},
			_mouseCapture: function (t) {
				var s, f, r, i, u, h, e, c, o = this,
					l = this.options;
				return l.disabled ? !1 : (this.elementSize = {
					width: this.element.outerWidth(),
					height: this.element.outerHeight()
				}, this.elementOffset = this.element.offset(), s = {
					x: t.pageX,
					y: t.pageY
				}, f = this._normValueFromMouse(s), r = this._valueMax() - this._valueMin() + 1, this.handles.each(function (t) {
					var e = Math.abs(f - o.values(t));
					(r > e || r === e && (t === o._lastChangedValue || o.values(t) === l.min)) && (r = e, i = n(this), u = t)
				}), h = this._start(t, u), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = u, i.addClass("ui-state-active").focus(), e = i.offset(), c = !n(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = c ? {
					left: 0,
					top: 0
				} : {
					left: t.pageX - e.left - i.width() / 2,
					top: t.pageY - e.top - i.height() / 2 - (parseInt(i.css("borderTopWidth"), 10) || 0) - (parseInt(i.css("borderBottomWidth"), 10) || 0) + (parseInt(i.css("marginTop"), 10) || 0)
				}, this.handles.hasClass("ui-state-hover") || this._slide(t, u, f), this._animateOff = !0, !0))
			},
			_mouseStart: function () {
				return !0
			},
			_mouseDrag: function (n) {
				var t = {
						x: n.pageX,
						y: n.pageY
					},
					i = this._normValueFromMouse(t);
				return this._slide(n, this._handleIndex, i), !1
			},
			_mouseStop: function (n) {
				return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(n, this._handleIndex), this._change(n, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
			},
			_detectOrientation: function () {
				this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
			},
			_normValueFromMouse: function (n) {
				var i, r, t, u, f;
				return "horizontal" === this.orientation ? (i = this.elementSize.width, r = n.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (i = this.elementSize.height, r = n.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), t = r / i, t > 1 && (t = 1), 0 > t && (t = 0), "vertical" === this.orientation && (t = 1 - t), u = this._valueMax() - this._valueMin(), f = this._valueMin() + t * u, this._trimAlignValue(f)
			},
			_start: function (n, t) {
				var i = {
					handle: this.handles[t],
					value: this.value()
				};
				return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", n, i)
			},
			_slide: function (n, t, i) {
				var r, f, u;
				this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > r || 1 === t && r > i) && (i = r), i !== this.values(t) && (f = this.values(), f[t] = i, u = this._trigger("slide", n, {
					handle: this.handles[t],
					value: i,
					values: f
				}), r = this.values(t ? 0 : 1), u !== !1 && this.values(t, i))) : i !== this.value() && (u = this._trigger("slide", n, {
					handle: this.handles[t],
					value: i
				}), u !== !1 && this.value(i))
			},
			_stop: function (n, t) {
				var i = {
					handle: this.handles[t],
					value: this.value()
				};
				this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values());
				this._trigger("stop", n, i)
			},
			_change: function (n, t) {
				if (!this._keySliding && !this._mouseSliding) {
					var i = {
						handle: this.handles[t],
						value: this.value()
					};
					this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values());
					this._lastChangedValue = t;
					this._trigger("change", n, i)
				}
			},
			value: function (n) {
				return arguments.length ? (this.options.value = this._trimAlignValue(n), this._refreshValue(), this._change(null, 0), void 0) : this._value()
			},
			values: function (t, i) {
				var u, f, r;
				if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0;
				if (!arguments.length) return this._values();
				if (!n.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
				for (u = this.options.values, f = arguments[0], r = 0; u.length > r; r += 1) u[r] = this._trimAlignValue(f[r]), this._change(null, r);
				this._refreshValue()
			},
			_setOption: function (t, i) {
				var r, u = 0;
				switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), n.isArray(this.options.values) && (u = this.options.values.length), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!i), this._super(t, i), t) {
					case "orientation":
						this._detectOrientation();
						this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
						this._refreshValue();
						this.handles.css("horizontal" === i ? "bottom" : "left", "");
						break;
					case "value":
						this._animateOff = !0;
						this._refreshValue();
						this._change(null, 0);
						this._animateOff = !1;
						break;
					case "values":
						for (this._animateOff = !0, this._refreshValue(), r = 0; u > r; r += 1) this._change(null, r);
						this._animateOff = !1;
						break;
					case "min":
					case "max":
						this._animateOff = !0;
						this._refreshValue();
						this._animateOff = !1;
						break;
					case "range":
						this._animateOff = !0;
						this._refresh();
						this._animateOff = !1
				}
			},
			_value: function () {
				var n = this.options.value;
				return this._trimAlignValue(n)
			},
			_values: function (n) {
				var r, t, i;
				if (arguments.length) return r = this.options.values[n], r = this._trimAlignValue(r);
				if (this.options.values && this.options.values.length) {
					for (t = this.options.values.slice(), i = 0; t.length > i; i += 1) t[i] = this._trimAlignValue(t[i]);
					return t
				}
				return []
			},
			_trimAlignValue: function (n) {
				if (this._valueMin() >= n) return this._valueMin();
				if (n >= this._valueMax()) return this._valueMax();
				var t = this.options.step > 0 ? this.options.step : 1,
					i = (n - this._valueMin()) % t,
					r = n - i;
				return 2 * Math.abs(i) >= t && (r += i > 0 ? t : -t), parseFloat(r.toFixed(5))
			},
			_valueMin: function () {
				return this.options.min
			},
			_valueMax: function () {
				return this.options.max
			},
			_refreshValue: function () {
				var s, t, c, f, h, e = this.options.range,
					i = this.options,
					r = this,
					u = this._animateOff ? !1 : i.animate,
					o = {};
				this.options.values && this.options.values.length ? this.handles.each(function (f) {
					t = 100 * ((r.values(f) - r._valueMin()) / (r._valueMax() - r._valueMin()));
					o["horizontal" === r.orientation ? "left" : "bottom"] = t + "%";
					n(this).stop(1, 1)[u ? "animate" : "css"](o, i.animate);
					r.options.range === !0 && ("horizontal" === r.orientation ? (0 === f && r.range.stop(1, 1)[u ? "animate" : "css"]({
						left: t + "%"
					}, i.animate), 1 === f && r.range[u ? "animate" : "css"]({
						width: t - s + "%"
					}, {
						queue: !1,
						duration: i.animate
					})) : (0 === f && r.range.stop(1, 1)[u ? "animate" : "css"]({
						bottom: t + "%"
					}, i.animate), 1 === f && r.range[u ? "animate" : "css"]({
						height: t - s + "%"
					}, {
						queue: !1,
						duration: i.animate
					})));
					s = t
				}) : (c = this.value(), f = this._valueMin(), h = this._valueMax(), t = h !== f ? 100 * ((c - f) / (h - f)) : 0, o["horizontal" === this.orientation ? "left" : "bottom"] = t + "%", this.handle.stop(1, 1)[u ? "animate" : "css"](o, i.animate), "min" === e && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
					width: t + "%"
				}, i.animate), "max" === e && "horizontal" === this.orientation && this.range[u ? "animate" : "css"]({
					width: 100 - t + "%"
				}, {
					queue: !1,
					duration: i.animate
				}), "min" === e && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
					height: t + "%"
				}, i.animate), "max" === e && "vertical" === this.orientation && this.range[u ? "animate" : "css"]({
					height: 100 - t + "%"
				}, {
					queue: !1,
					duration: i.animate
				}))
			},
			_handleEvents: {
				keydown: function (t) {
					var e, r, i, u, f = n(t.target).data("ui-slider-handle-index");
					switch (t.keyCode) {
						case n.ui.keyCode.HOME:
						case n.ui.keyCode.END:
						case n.ui.keyCode.PAGE_UP:
						case n.ui.keyCode.PAGE_DOWN:
						case n.ui.keyCode.UP:
						case n.ui.keyCode.RIGHT:
						case n.ui.keyCode.DOWN:
						case n.ui.keyCode.LEFT:
							if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, n(t.target).addClass("ui-state-active"), e = this._start(t, f), e === !1)) return
					}
					switch (u = this.options.step, r = i = this.options.values && this.options.values.length ? this.values(f) : this.value(), t.keyCode) {
						case n.ui.keyCode.HOME:
							i = this._valueMin();
							break;
						case n.ui.keyCode.END:
							i = this._valueMax();
							break;
						case n.ui.keyCode.PAGE_UP:
							i = this._trimAlignValue(r + (this._valueMax() - this._valueMin()) / this.numPages);
							break;
						case n.ui.keyCode.PAGE_DOWN:
							i = this._trimAlignValue(r - (this._valueMax() - this._valueMin()) / this.numPages);
							break;
						case n.ui.keyCode.UP:
						case n.ui.keyCode.RIGHT:
							if (r === this._valueMax()) return;
							i = this._trimAlignValue(r + u);
							break;
						case n.ui.keyCode.DOWN:
						case n.ui.keyCode.LEFT:
							if (r === this._valueMin()) return;
							i = this._trimAlignValue(r - u)
					}
					this._slide(t, f, i)
				},
				keyup: function (t) {
					var i = n(t.target).data("ui-slider-handle-index");
					this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), n(t.target).removeClass("ui-state-active"))
				}
			}
		});
		n.widget("ui.spinner", {
			version: "1.11.1",
			defaultElement: "<input>",
			widgetEventPrefix: "spin",
			options: {
				culture: null,
				icons: {
					down: "ui-icon-triangle-1-s",
					up: "ui-icon-triangle-1-n"
				},
				incremental: !0,
				max: null,
				min: null,
				numberFormat: null,
				page: 10,
				step: 1,
				change: null,
				spin: null,
				start: null,
				stop: null
			},
			_create: function () {
				this._setOption("max", this.options.max);
				this._setOption("min", this.options.min);
				this._setOption("step", this.options.step);
				"" !== this.value() && this._value(this.element.val(), !0);
				this._draw();
				this._on(this._events);
				this._refresh();
				this._on(this.window, {
					beforeunload: function () {
						this.element.removeAttr("autocomplete")
					}
				})
			},
			_getCreateOptions: function () {
				var t = {},
					i = this.element;
				return n.each(["min", "max", "step"], function (n, r) {
					var u = i.attr(r);
					void 0 !== u && u.length && (t[r] = u)
				}), t
			},
			_events: {
				keydown: function (n) {
					this._start(n) && this._keydown(n) && n.preventDefault()
				},
				keyup: "_stop",
				focus: function () {
					this.previous = this.element.val()
				},
				blur: function (n) {
					return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", n), void 0)
				},
				mousewheel: function (n, t) {
					if (t) {
						if (!this.spinning && !this._start(n)) return !1;
						this._spin((t > 0 ? 1 : -1) * this.options.step, n);
						clearTimeout(this.mousewheelTimer);
						this.mousewheelTimer = this._delay(function () {
							this.spinning && this._stop(n)
						}, 100);
						n.preventDefault()
					}
				},
				"mousedown .ui-spinner-button": function (t) {
					function r() {
						var n = this.element[0] === this.document[0].activeElement;
						n || (this.element.focus(), this.previous = i, this._delay(function () {
							this.previous = i
						}))
					}
					var i;
					i = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val();
					t.preventDefault();
					r.call(this);
					this.cancelBlur = !0;
					this._delay(function () {
						delete this.cancelBlur;
						r.call(this)
					});
					this._start(t) !== !1 && this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
				},
				"mouseup .ui-spinner-button": "_stop",
				"mouseenter .ui-spinner-button": function (t) {
					if (n(t.currentTarget).hasClass("ui-state-active")) return this._start(t) === !1 ? !1 : (this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t), void 0)
				},
				"mouseleave .ui-spinner-button": "_stop"
			},
			_draw: function () {
				var n = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
				this.element.attr("role", "spinbutton");
				this.buttons = n.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all");
				this.buttons.height() > Math.ceil(.5 * n.height()) && n.height() > 0 && n.height(n.height());
				this.options.disabled && this.disable()
			},
			_keydown: function (t) {
				var r = this.options,
					i = n.ui.keyCode;
				switch (t.keyCode) {
					case i.UP:
						return this._repeat(null, 1, t), !0;
					case i.DOWN:
						return this._repeat(null, -1, t), !0;
					case i.PAGE_UP:
						return this._repeat(null, r.page, t), !0;
					case i.PAGE_DOWN:
						return this._repeat(null, -r.page, t), !0
				}
				return !1
			},
			_uiSpinnerHtml: function () {
				return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'><\/span>"
			},
			_buttonHtml: function () {
				return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;<\/span><\/a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;<\/span><\/a>"
			},
			_start: function (n) {
				return this.spinning || this._trigger("start", n) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
			},
			_repeat: function (n, t, i) {
				n = n || 500;
				clearTimeout(this.timer);
				this.timer = this._delay(function () {
					this._repeat(40, t, i)
				}, n);
				this._spin(t * this.options.step, i)
			},
			_spin: function (n, t) {
				var i = this.value() || 0;
				this.counter || (this.counter = 1);
				i = this._adjustValue(i + n * this._increment(this.counter));
				this.spinning && this._trigger("spin", t, {
					value: i
				}) === !1 || (this._value(i), this.counter++)
			},
			_increment: function (t) {
				var i = this.options.incremental;
				return i ? n.isFunction(i) ? i(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1
			},
			_precision: function () {
				var n = this._precisionOf(this.options.step);
				return null !== this.options.min && (n = Math.max(n, this._precisionOf(this.options.min))), n
			},
			_precisionOf: function (n) {
				var t = "" + n,
					i = t.indexOf(".");
				return -1 === i ? 0 : t.length - i - 1
			},
			_adjustValue: function (n) {
				var r, i, t = this.options;
				return r = null !== t.min ? t.min : 0, i = n - r, i = Math.round(i / t.step) * t.step, n = r + i, n = parseFloat(n.toFixed(this._precision())), null !== t.max && n > t.max ? t.max : null !== t.min && t.min > n ? t.min : n
			},
			_stop: function (n) {
				this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", n))
			},
			_setOption: function (n, t) {
				if ("culture" === n || "numberFormat" === n) {
					var i = this._parse(this.element.val());
					return this.options[n] = t, this.element.val(this._format(i)), void 0
				}("max" === n || "min" === n || "step" === n) && "string" == typeof t && (t = this._parse(t));
				"icons" === n && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down));
				this._super(n, t);
				"disabled" === n && (this.widget().toggleClass("ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t ? "disable" : "enable"))
			},
			_setOptions: t(function (n) {
				this._super(n)
			}),
			_parse: function (n) {
				return "string" == typeof n && "" !== n && (n = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(n, 10, this.options.culture) : +n), "" === n || isNaN(n) ? null : n
			},
			_format: function (n) {
				return "" === n ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(n, this.options.numberFormat, this.options.culture) : n
			},
			_refresh: function () {
				this.element.attr({
					"aria-valuemin": this.options.min,
					"aria-valuemax": this.options.max,
					"aria-valuenow": this._parse(this.element.val())
				})
			},
			isValid: function () {
				var n = this.value();
				return null === n ? !1 : n === this._adjustValue(n)
			},
			_value: function (n, t) {
				var i;
				"" !== n && (i = this._parse(n), null !== i && (t || (i = this._adjustValue(i)), n = this._format(i)));
				this.element.val(n);
				this._refresh()
			},
			_destroy: function () {
				this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
				this.uiSpinner.replaceWith(this.element)
			},
			stepUp: t(function (n) {
				this._stepUp(n)
			}),
			_stepUp: function (n) {
				this._start() && (this._spin((n || 1) * this.options.step), this._stop())
			},
			stepDown: t(function (n) {
				this._stepDown(n)
			}),
			_stepDown: function (n) {
				this._start() && (this._spin((n || 1) * -this.options.step), this._stop())
			},
			pageUp: t(function (n) {
				this._stepUp((n || 1) * this.options.page)
			}),
			pageDown: t(function (n) {
				this._stepDown((n || 1) * this.options.page)
			}),
			value: function (n) {
				return arguments.length ? (t(this._value).call(this, n), void 0) : this._parse(this.element.val())
			},
			widget: function () {
				return this.uiSpinner
			}
		});
		n.widget("ui.tabs", {
			version: "1.11.1",
			delay: 300,
			options: {
				active: null,
				collapsible: !1,
				event: "click",
				heightStyle: "content",
				hide: null,
				show: null,
				activate: null,
				beforeActivate: null,
				beforeLoad: null,
				load: null
			},
			_isLocal: function () {
				var n = /#.*$/;
				return function (t) {
					var i, r;
					t = t.cloneNode(!1);
					i = t.href.replace(n, "");
					r = location.href.replace(n, "");
					try {
						i = decodeURIComponent(i)
					} catch (u) {}
					try {
						r = decodeURIComponent(r)
					} catch (u) {}
					return t.hash.length > 1 && i === r
				}
			}(),
			_create: function () {
				var i = this,
					t = this.options;
				this.running = !1;
				this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", t.collapsible);
				this._processTabs();
				t.active = this._initialActive();
				n.isArray(t.disabled) && (t.disabled = n.unique(t.disabled.concat(n.map(this.tabs.filter(".ui-state-disabled"), function (n) {
					return i.tabs.index(n)
				}))).sort());
				this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(t.active) : n();
				this._refresh();
				this.active.length && this.load(t.active)
			},
			_initialActive: function () {
				var t = this.options.active,
					i = this.options.collapsible,
					r = location.hash.substring(1);
				return null === t && (r && this.tabs.each(function (i, u) {
					if (n(u).attr("aria-controls") === r) return (t = i, !1)
				}), null === t && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === t || -1 === t) && (t = this.tabs.length ? 0 : !1)), t !== !1 && (t = this.tabs.index(this.tabs.eq(t)), -1 === t && (t = i ? !1 : 0)), !i && t === !1 && this.anchors.length && (t = 0), t
			},
			_getCreateEventData: function () {
				return {
					tab: this.active,
					panel: this.active.length ? this._getPanelForTab(this.active) : n()
				}
			},
			_tabKeydown: function (t) {
				var r = n(this.document[0].activeElement).closest("li"),
					i = this.tabs.index(r),
					u = !0;
				if (!this._handlePageNav(t)) {
					switch (t.keyCode) {
						case n.ui.keyCode.RIGHT:
						case n.ui.keyCode.DOWN:
							i++;
							break;
						case n.ui.keyCode.UP:
						case n.ui.keyCode.LEFT:
							u = !1;
							i--;
							break;
						case n.ui.keyCode.END:
							i = this.anchors.length - 1;
							break;
						case n.ui.keyCode.HOME:
							i = 0;
							break;
						case n.ui.keyCode.SPACE:
							return t.preventDefault(), clearTimeout(this.activating), this._activate(i), void 0;
						case n.ui.keyCode.ENTER:
							return t.preventDefault(), clearTimeout(this.activating), this._activate(i === this.options.active ? !1 : i), void 0;
						default:
							return
					}
					t.preventDefault();
					clearTimeout(this.activating);
					i = this._focusNextTab(i, u);
					t.ctrlKey || (r.attr("aria-selected", "false"), this.tabs.eq(i).attr("aria-selected", "true"), this.activating = this._delay(function () {
						this.option("active", i)
					}, this.delay))
				}
			},
			_panelKeydown: function (t) {
				this._handlePageNav(t) || t.ctrlKey && t.keyCode === n.ui.keyCode.UP && (t.preventDefault(), this.active.focus())
			},
			_handlePageNav: function (t) {
				return t.altKey && t.keyCode === n.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === n.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
			},
			_findNextTab: function (t, i) {
				function u() {
					return t > r && (t = 0), 0 > t && (t = r), t
				}
				for (var r = this.tabs.length - 1; - 1 !== n.inArray(u(), this.options.disabled);) t = i ? t + 1 : t - 1;
				return t
			},
			_focusNextTab: function (n, t) {
				return n = this._findNextTab(n, t), this.tabs.eq(n).focus(), n
			},
			_setOption: function (n, t) {
				return "active" === n ? (this._activate(t), void 0) : "disabled" === n ? (this._setupDisabled(t), void 0) : (this._super(n, t), "collapsible" === n && (this.element.toggleClass("ui-tabs-collapsible", t), t || this.options.active !== !1 || this._activate(0)), "event" === n && this._setupEvents(t), "heightStyle" === n && this._setupHeightStyle(t), void 0)
			},
			_sanitizeSelector: function (n) {
				return n ? n.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
			},
			refresh: function () {
				var t = this.options,
					i = this.tablist.children(":has(a[href])");
				t.disabled = n.map(i.filter(".ui-state-disabled"), function (n) {
					return i.index(n)
				});
				this._processTabs();
				t.active !== !1 && this.anchors.length ? this.active.length && !n.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = n()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = n());
				this._refresh()
			},
			_refresh: function () {
				this._setupDisabled(this.options.disabled);
				this._setupEvents(this.options.event);
				this._setupHeightStyle(this.options.heightStyle);
				this.tabs.not(this.active).attr({
					"aria-selected": "false",
					"aria-expanded": "false",
					tabIndex: -1
				});
				this.panels.not(this._getPanelForTab(this.active)).hide().attr({
					"aria-hidden": "true"
				});
				this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				}), this._getPanelForTab(this.active).show().attr({
					"aria-hidden": "false"
				})) : this.tabs.eq(0).attr("tabIndex", 0)
			},
			_processTabs: function () {
				var t = this;
				this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function (t) {
					n(this).is(".ui-state-disabled") && t.preventDefault()
				}).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
					n(this).closest("li").is(".ui-state-disabled") && this.blur()
				});
				this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
					role: "tab",
					tabIndex: -1
				});
				this.anchors = this.tabs.map(function () {
					return n("a", this)[0]
				}).addClass("ui-tabs-anchor").attr({
					role: "presentation",
					tabIndex: -1
				});
				this.panels = n();
				this.anchors.each(function (i, r) {
					var f, u, e, s = n(r).uniqueId().attr("id"),
						o = n(r).closest("li"),
						h = o.attr("aria-controls");
					t._isLocal(r) ? (f = r.hash, e = f.substring(1), u = t.element.find(t._sanitizeSelector(f))) : (e = o.attr("aria-controls") || n({}).uniqueId()[0].id, f = "#" + e, u = t.element.find(f), u.length || (u = t._createPanel(e), u.insertAfter(t.panels[i - 1] || t.tablist)), u.attr("aria-live", "polite"));
					u.length && (t.panels = t.panels.add(u));
					h && o.data("ui-tabs-aria-controls", h);
					o.attr({
						"aria-controls": e,
						"aria-labelledby": s
					});
					u.attr("aria-labelledby", s)
				});
				this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
			},
			_getList: function () {
				return this.tablist || this.element.find("ol,ul").eq(0)
			},
			_createPanel: function (t) {
				return n("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
			},
			_setupDisabled: function (t) {
				n.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
				for (var i, r = 0; i = this.tabs[r]; r++) t === !0 || -1 !== n.inArray(r, t) ? n(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : n(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
				this.options.disabled = t
			},
			_setupEvents: function (t) {
				var i = {};
				t && n.each(t.split(" "), function (n, t) {
					i[t] = "_eventHandler"
				});
				this._off(this.anchors.add(this.tabs).add(this.panels));
				this._on(!0, this.anchors, {
					click: function (n) {
						n.preventDefault()
					}
				});
				this._on(this.anchors, i);
				this._on(this.tabs, {
					keydown: "_tabKeydown"
				});
				this._on(this.panels, {
					keydown: "_panelKeydown"
				});
				this._focusable(this.tabs);
				this._hoverable(this.tabs)
			},
			_setupHeightStyle: function (t) {
				var i, r = this.element.parent();
				"fill" === t ? (i = r.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () {
					var t = n(this),
						r = t.css("position");
					"absolute" !== r && "fixed" !== r && (i -= t.outerHeight(!0))
				}), this.element.children().not(this.panels).each(function () {
					i -= n(this).outerHeight(!0)
				}), this.panels.each(function () {
					n(this).height(Math.max(0, i - n(this).innerHeight() + n(this).height()))
				}).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function () {
					i = Math.max(i, n(this).height("").height())
				}).height(i))
			},
			_eventHandler: function (t) {
				var u = this.options,
					r = this.active,
					c = n(t.currentTarget),
					i = c.closest("li"),
					f = i[0] === r[0],
					e = f && u.collapsible,
					o = e ? n() : this._getPanelForTab(i),
					s = r.length ? this._getPanelForTab(r) : n(),
					h = {
						oldTab: r,
						oldPanel: s,
						newTab: e ? n() : i,
						newPanel: o
					};
				t.preventDefault();
				i.hasClass("ui-state-disabled") || i.hasClass("ui-tabs-loading") || this.running || f && !u.collapsible || this._trigger("beforeActivate", t, h) === !1 || (u.active = e ? !1 : this.tabs.index(i), this.active = f ? n() : i, this.xhr && this.xhr.abort(), s.length || o.length || n.error("jQuery UI Tabs: Mismatching fragment identifier."), o.length && this.load(this.tabs.index(i), t), this._toggle(t, h))
			},
			_toggle: function (t, i) {
				function e() {
					u.running = !1;
					u._trigger("activate", t, i)
				}

				function o() {
					i.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
					r.length && u.options.show ? u._show(r, u.options.show, e) : (r.show(), e())
				}
				var u = this,
					r = i.newPanel,
					f = i.oldPanel;
				this.running = !0;
				f.length && this.options.hide ? this._hide(f, this.options.hide, function () {
					i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
					o()
				}) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), f.hide(), o());
				f.attr("aria-hidden", "true");
				i.oldTab.attr({
					"aria-selected": "false",
					"aria-expanded": "false"
				});
				r.length && f.length ? i.oldTab.attr("tabIndex", -1) : r.length && this.tabs.filter(function () {
					return 0 === n(this).attr("tabIndex")
				}).attr("tabIndex", -1);
				r.attr("aria-hidden", "false");
				i.newTab.attr({
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				})
			},
			_activate: function (t) {
				var r, i = this._findActive(t);
				i[0] !== this.active[0] && (i.length || (i = this.active), r = i.find(".ui-tabs-anchor")[0], this._eventHandler({
					target: r,
					currentTarget: r,
					preventDefault: n.noop
				}))
			},
			_findActive: function (t) {
				return t === !1 ? n() : this.tabs.eq(t)
			},
			_getIndex: function (n) {
				return "string" == typeof n && (n = this.anchors.index(this.anchors.filter("[href$='" + n + "']"))), n
			},
			_destroy: function () {
				this.xhr && this.xhr.abort();
				this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
				this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
				this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();
				this.tablist.unbind(this.eventNamespace);
				this.tabs.add(this.panels).each(function () {
					n.data(this, "ui-tabs-destroy") ? n(this).remove() : n(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
				});
				this.tabs.each(function () {
					var t = n(this),
						i = t.data("ui-tabs-aria-controls");
					i ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
				});
				this.panels.show();
				"content" !== this.options.heightStyle && this.panels.css("height", "")
			},
			enable: function (t) {
				var i = this.options.disabled;
				i !== !1 && (void 0 === t ? i = !1 : (t = this._getIndex(t), i = n.isArray(i) ? n.map(i, function (n) {
					return n !== t ? n : null
				}) : n.map(this.tabs, function (n, i) {
					return i !== t ? i : null
				})), this._setupDisabled(i))
			},
			disable: function (t) {
				var i = this.options.disabled;
				if (i !== !0) {
					if (void 0 === t) i = !0;
					else {
						if (t = this._getIndex(t), -1 !== n.inArray(t, i)) return;
						i = n.isArray(i) ? n.merge([t], i).sort() : [t]
					}
					this._setupDisabled(i)
				}
			},
			load: function (t, i) {
				t = this._getIndex(t);
				var u = this,
					r = this.tabs.eq(t),
					e = r.find(".ui-tabs-anchor"),
					f = this._getPanelForTab(r),
					o = {
						tab: r,
						panel: f
					};
				this._isLocal(e[0]) || (this.xhr = n.ajax(this._ajaxSettings(e, i, o)), this.xhr && "canceled" !== this.xhr.statusText && (r.addClass("ui-tabs-loading"), f.attr("aria-busy", "true"), this.xhr.success(function (n) {
					setTimeout(function () {
						f.html(n);
						u._trigger("load", i, o)
					}, 1)
				}).complete(function (n, t) {
					setTimeout(function () {
						"abort" === t && u.panels.stop(!1, !0);
						r.removeClass("ui-tabs-loading");
						f.removeAttr("aria-busy");
						n === u.xhr && delete u.xhr
					}, 1)
				})))
			},
			_ajaxSettings: function (t, i, r) {
				var u = this;
				return {
					url: t.attr("href"),
					beforeSend: function (t, f) {
						return u._trigger("beforeLoad", i, n.extend({
							jqXHR: t,
							ajaxSettings: f
						}, r))
					}
				}
			},
			_getPanelForTab: function (t) {
				var i = n(t).attr("aria-controls");
				return this.element.find(this._sanitizeSelector("#" + i))
			}
		});
		n.widget("ui.tooltip", {
			version: "1.11.1",
			options: {
				content: function () {
					var t = n(this).attr("title") || "";
					return n("<a>").text(t).html()
				},
				hide: !0,
				items: "[title]:not([disabled])",
				position: {
					my: "left top+15",
					at: "left bottom",
					collision: "flipfit flip"
				},
				show: !0,
				tooltipClass: null,
				track: !1,
				close: null,
				open: null
			},
			_addDescribedBy: function (t, i) {
				var r = (t.attr("aria-describedby") || "").split(/\s+/);
				r.push(i);
				t.data("ui-tooltip-id", i).attr("aria-describedby", n.trim(r.join(" ")))
			},
			_removeDescribedBy: function (t) {
				var u = t.data("ui-tooltip-id"),
					i = (t.attr("aria-describedby") || "").split(/\s+/),
					r = n.inArray(u, i); - 1 !== r && i.splice(r, 1);
				t.removeData("ui-tooltip-id");
				i = n.trim(i.join(" "));
				i ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby")
			},
			_create: function () {
				this._on({
					mouseover: "open",
					focusin: "open"
				});
				this.tooltips = {};
				this.parents = {};
				this.options.disabled && this._disable();
				this.liveRegion = n("<div>").attr({
					role: "log",
					"aria-live": "assertive",
					"aria-relevant": "additions"
				}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
			},
			_setOption: function (t, i) {
				var r = this;
				return "disabled" === t ? (this[i ? "_disable" : "_enable"](), this.options[t] = i, void 0) : (this._super(t, i), "content" === t && n.each(this.tooltips, function (n, t) {
					r._updateContent(t)
				}), void 0)
			},
			_disable: function () {
				var t = this;
				n.each(this.tooltips, function (i, r) {
					var u = n.Event("blur");
					u.target = u.currentTarget = r[0];
					t.close(u, !0)
				});
				this.element.find(this.options.items).addBack().each(function () {
					var t = n(this);
					t.is("[title]") && t.data("ui-tooltip-title", t.attr("title")).removeAttr("title")
				})
			},
			_enable: function () {
				this.element.find(this.options.items).addBack().each(function () {
					var t = n(this);
					t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
				})
			},
			open: function (t) {
				var r = this,
					i = n(t ? t.target : this.element).closest(this.options.items);
				i.length && !i.data("ui-tooltip-id") && (i.attr("title") && i.data("ui-tooltip-title", i.attr("title")), i.data("ui-tooltip-open", !0), t && "mouseover" === t.type && i.parents().each(function () {
					var i, t = n(this);
					t.data("ui-tooltip-open") && (i = n.Event("blur"), i.target = i.currentTarget = this, r.close(i, !0));
					t.attr("title") && (t.uniqueId(), r.parents[this.id] = {
						element: this,
						title: t.attr("title")
					}, t.attr("title", ""))
				}), this._updateContent(i, t))
			},
			_updateContent: function (n, t) {
				var i, r = this.options.content,
					u = this,
					f = t ? t.type : null;
				return "string" == typeof r ? this._open(t, n, r) : (i = r.call(n[0], function (i) {
					n.data("ui-tooltip-open") && u._delay(function () {
						t && (t.type = f);
						this._open(t, n, i)
					})
				}), i && this._open(t, n, i), void 0)
			},
			_open: function (t, i, r) {
				function o(n) {
					s.of = n;
					u.is(":hidden") || u.position(s)
				}
				var u, f, h, e, s = n.extend({}, this.options.position);
				if (r) {
					if (u = this._find(i), u.length) return u.find(".ui-tooltip-content").html(r), void 0;
					i.is("[title]") && (t && "mouseover" === t.type ? i.attr("title", "") : i.removeAttr("title"));
					u = this._tooltip(i);
					this._addDescribedBy(i, u.attr("id"));
					u.find(".ui-tooltip-content").html(r);
					this.liveRegion.children().hide();
					r.clone ? (e = r.clone(), e.removeAttr("id").find("[id]").removeAttr("id")) : e = r;
					n("<div>").html(e).appendTo(this.liveRegion);
					this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, {
						mousemove: o
					}), o(t)) : u.position(n.extend({
						of: i
					}, this.options.position));
					this.hiding = !1;
					this.closing = !1;
					u.hide();
					this._show(u, this.options.show);
					this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function () {
						u.is(":visible") && (o(s.of), clearInterval(h))
					}, n.fx.interval));
					this._trigger("open", t, {
						tooltip: u
					});
					f = {
						keyup: function (t) {
							if (t.keyCode === n.ui.keyCode.ESCAPE) {
								var r = n.Event(t);
								r.currentTarget = i[0];
								this.close(r, !0)
							}
						}
					};
					i[0] !== this.element[0] && (f.remove = function () {
						this._removeTooltip(u)
					});
					t && "mouseover" !== t.type || (f.mouseleave = "close");
					t && "focusin" !== t.type || (f.focusout = "close");
					this._on(!0, i, f)
				}
			},
			close: function (t) {
				var u = this,
					i = n(t ? t.currentTarget : this.element),
					r = this._find(i);
				this.closing || (clearInterval(this.delayedShow), i.data("ui-tooltip-title") && !i.attr("title") && i.attr("title", i.data("ui-tooltip-title")), this._removeDescribedBy(i), this.hiding = !0, r.stop(!0), this._hide(r, this.options.hide, function () {
					u._removeTooltip(n(this));
					this.hiding = !1;
					this.closing = !1
				}), i.removeData("ui-tooltip-open"), this._off(i, "mouseleave focusout keyup"), i[0] !== this.element[0] && this._off(i, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && n.each(this.parents, function (t, i) {
					n(i.element).attr("title", i.title);
					delete u.parents[t]
				}), this.closing = !0, this._trigger("close", t, {
					tooltip: r
				}), this.hiding || (this.closing = !1))
			},
			_tooltip: function (t) {
				var i = n("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
					r = i.uniqueId().attr("id");
				return n("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[r] = t, i
			},
			_find: function (t) {
				var i = t.data("ui-tooltip-id");
				return i ? n("#" + i) : n()
			},
			_removeTooltip: function (n) {
				n.remove();
				delete this.tooltips[n.attr("id")]
			},
			_destroy: function () {
				var t = this;
				n.each(this.tooltips, function (i, r) {
					var u = n.Event("blur");
					u.target = u.currentTarget = r[0];
					t.close(u, !0);
					n("#" + i).remove();
					r.data("ui-tooltip-title") && (r.attr("title") || r.attr("title", r.data("ui-tooltip-title")), r.removeData("ui-tooltip-title"))
				});
				this.liveRegion.remove()
			}
		});
		o = "ui-effects-";
		s = n;
		n.effects = {
				effect: {}
			},
			function (n, t) {
				function f(n, t, i) {
					var r = h[t.type] || {};
					return null == n ? i || !t.def ? null : t.def : (n = r.floor ? ~~n : parseFloat(n), isNaN(n) ? t.def : r.mod ? (n + r.mod) % r.mod : 0 > n ? 0 : n > r.max ? r.max : n)
				}

				function s(f) {
					var o = i(),
						s = o._rgba = [];
					return f = f.toLowerCase(), r(v, function (n, i) {
						var r, h = i.re.exec(f),
							c = h && i.parse(h),
							e = i.space || "rgba";
						return c ? (r = o[e](c), o[u[e].cache] = r[u[e].cache], s = o._rgba = r._rgba, !1) : t
					}), s.length ? ("0,0,0,0" === s.join() && n.extend(s, e.transparent), o) : e[f]
				}

				function o(n, t, i) {
					return i = (i + 1) % 1, 1 > 6 * i ? n + 6 * (t - n) * i : 1 > 2 * i ? t : 2 > 3 * i ? n + 6 * (t - n) * (2 / 3 - i) : n
				}
				var e, a = /^([\-+])=\s*(\d+\.?\d*)/,
					v = [{
						re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
						parse: function (n) {
							return [n[1], n[2], n[3], n[4]]
						}
					}, {
						re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
						parse: function (n) {
							return [2.55 * n[1], 2.55 * n[2], 2.55 * n[3], n[4]]
						}
					}, {
						re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
						parse: function (n) {
							return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
						}
					}, {
						re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
						parse: function (n) {
							return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)]
						}
					}, {
						re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
						space: "hsla",
						parse: function (n) {
							return [n[1], n[2] / 100, n[3] / 100, n[4]]
						}
					}],
					i = n.Color = function (t, i, r, u) {
						return new n.Color.fn.parse(t, i, r, u)
					},
					u = {
						rgba: {
							props: {
								red: {
									idx: 0,
									type: "byte"
								},
								green: {
									idx: 1,
									type: "byte"
								},
								blue: {
									idx: 2,
									type: "byte"
								}
							}
						},
						hsla: {
							props: {
								hue: {
									idx: 0,
									type: "degrees"
								},
								saturation: {
									idx: 1,
									type: "percent"
								},
								lightness: {
									idx: 2,
									type: "percent"
								}
							}
						}
					},
					h = {
						byte: {
							floor: !0,
							max: 255
						},
						percent: {
							max: 1
						},
						degrees: {
							mod: 360,
							floor: !0
						}
					},
					c = i.support = {},
					l = n("<p>")[0],
					r = n.each;
				l.style.cssText = "background-color:rgba(1,1,1,.5)";
				c.rgba = l.style.backgroundColor.indexOf("rgba") > -1;
				r(u, function (n, t) {
					t.cache = "_" + n;
					t.props.alpha = {
						idx: 3,
						type: "percent",
						def: 1
					}
				});
				i.fn = n.extend(i.prototype, {
					parse: function (o, h, c, l) {
						if (o === t) return this._rgba = [null, null, null, null], this;
						(o.jquery || o.nodeType) && (o = n(o).css(h), h = t);
						var a = this,
							v = n.type(o),
							y = this._rgba = [];
						return h !== t && (o = [o, h, c, l], v = "array"), "string" === v ? this.parse(s(o) || e._default) : "array" === v ? (r(u.rgba.props, function (n, t) {
							y[t.idx] = f(o[t.idx], t)
						}), this) : "object" === v ? (o instanceof i ? r(u, function (n, t) {
							o[t.cache] && (a[t.cache] = o[t.cache].slice())
						}) : r(u, function (t, i) {
							var u = i.cache;
							r(i.props, function (n, t) {
								if (!a[u] && i.to) {
									if ("alpha" === n || null == o[n]) return;
									a[u] = i.to(a._rgba)
								}
								a[u][t.idx] = f(o[n], t, !0)
							});
							a[u] && 0 > n.inArray(null, a[u].slice(0, 3)) && (a[u][3] = 1, i.from && (a._rgba = i.from(a[u])))
						}), this) : t
					},
					is: function (n) {
						var o = i(n),
							f = !0,
							e = this;
						return r(u, function (n, i) {
							var s, u = o[i.cache];
							return u && (s = e[i.cache] || i.to && i.to(e._rgba) || [], r(i.props, function (n, i) {
								return null != u[i.idx] ? f = u[i.idx] === s[i.idx] : t
							})), f
						}), f
					},
					_space: function () {
						var n = [],
							t = this;
						return r(u, function (i, r) {
							t[r.cache] && n.push(i)
						}), n.pop()
					},
					transition: function (n, t) {
						var e = i(n),
							c = e._space(),
							o = u[c],
							l = 0 === this.alpha() ? i("transparent") : this,
							a = l[o.cache] || o.to(l._rgba),
							s = a.slice();
						return e = e[o.cache], r(o.props, function (n, i) {
							var c = i.idx,
								r = a[c],
								u = e[c],
								o = h[i.type] || {};
							null !== u && (null === r ? s[c] = u : (o.mod && (u - r > o.mod / 2 ? r += o.mod : r - u > o.mod / 2 && (r -= o.mod)), s[c] = f((u - r) * t + r, i)))
						}), this[c](s)
					},
					blend: function (t) {
						if (1 === this._rgba[3]) return this;
						var r = this._rgba.slice(),
							u = r.pop(),
							f = i(t)._rgba;
						return i(n.map(r, function (n, t) {
							return (1 - u) * f[t] + u * n
						}))
					},
					toRgbaString: function () {
						var i = "rgba(",
							t = n.map(this._rgba, function (n, t) {
								return null == n ? t > 2 ? 1 : 0 : n
							});
						return 1 === t[3] && (t.pop(), i = "rgb("), i + t.join() + ")"
					},
					toHslaString: function () {
						var i = "hsla(",
							t = n.map(this.hsla(), function (n, t) {
								return null == n && (n = t > 2 ? 1 : 0), t && 3 > t && (n = Math.round(100 * n) + "%"), n
							});
						return 1 === t[3] && (t.pop(), i = "hsl("), i + t.join() + ")"
					},
					toHexString: function (t) {
						var i = this._rgba.slice(),
							r = i.pop();
						return t && i.push(~~(255 * r)), "#" + n.map(i, function (n) {
							return n = (n || 0).toString(16), 1 === n.length ? "0" + n : n
						}).join("")
					},
					toString: function () {
						return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
					}
				});
				i.fn.parse.prototype = i.fn;
				u.hsla.to = function (n) {
					if (null == n[0] || null == n[1] || null == n[2]) return [null, null, null, n[3]];
					var s, h, i = n[0] / 255,
						r = n[1] / 255,
						f = n[2] / 255,
						c = n[3],
						u = Math.max(i, r, f),
						e = Math.min(i, r, f),
						t = u - e,
						o = u + e,
						l = .5 * o;
					return s = e === u ? 0 : i === u ? 60 * (r - f) / t + 360 : r === u ? 60 * (f - i) / t + 120 : 60 * (i - r) / t + 240, h = 0 === t ? 0 : .5 >= l ? t / o : t / (2 - o), [Math.round(s) % 360, h, l, null == c ? 1 : c]
				};
				u.hsla.from = function (n) {
					if (null == n[0] || null == n[1] || null == n[2]) return [null, null, null, n[3]];
					var r = n[0] / 360,
						u = n[1],
						t = n[2],
						e = n[3],
						i = .5 >= t ? t * (1 + u) : t + u - t * u,
						f = 2 * t - i;
					return [Math.round(255 * o(f, i, r + 1 / 3)), Math.round(255 * o(f, i, r)), Math.round(255 * o(f, i, r - 1 / 3)), e]
				};
				r(u, function (u, e) {
					var s = e.props,
						o = e.cache,
						h = e.to,
						c = e.from;
					i.fn[u] = function (u) {
						if (h && !this[o] && (this[o] = h(this._rgba)), u === t) return this[o].slice();
						var l, a = n.type(u),
							v = "array" === a || "object" === a ? u : arguments,
							e = this[o].slice();
						return r(s, function (n, t) {
							var i = v["object" === a ? n : t.idx];
							null == i && (i = e[t.idx]);
							e[t.idx] = f(i, t)
						}), c ? (l = i(c(e)), l[o] = e, l) : i(e)
					};
					r(s, function (t, r) {
						i.fn[t] || (i.fn[t] = function (i) {
							var f, e = n.type(i),
								h = "alpha" === t ? this._hsla ? "hsla" : "rgba" : u,
								o = this[h](),
								s = o[r.idx];
							return "undefined" === e ? s : ("function" === e && (i = i.call(this, s), e = n.type(i)), null == i && r.empty ? this : ("string" === e && (f = a.exec(i), f && (i = s + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), o[r.idx] = i, this[h](o)))
						})
					})
				});
				i.hook = function (t) {
					var u = t.split(" ");
					r(u, function (t, r) {
						n.cssHooks[r] = {
							set: function (t, u) {
								var o, f, e = "";
								if ("transparent" !== u && ("string" !== n.type(u) || (o = s(u)))) {
									if (u = i(o || u), !c.rgba && 1 !== u._rgba[3]) {
										for (f = "backgroundColor" === r ? t.parentNode : t;
											("" === e || "transparent" === e) && f && f.style;) try {
											e = n.css(f, "backgroundColor");
											f = f.parentNode
										} catch (h) {}
										u = u.blend(e && "transparent" !== e ? e : "_default")
									}
									u = u.toRgbaString()
								}
								try {
									t.style[r] = u
								} catch (h) {}
							}
						};
						n.fx.step[r] = function (t) {
							t.colorInit || (t.start = i(t.elem, r), t.end = i(t.end), t.colorInit = !0);
							n.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos))
						}
					})
				};
				i.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor");
				n.cssHooks.borderColor = {
					expand: function (n) {
						var t = {};
						return r(["Top", "Right", "Bottom", "Left"], function (i, r) {
							t["border" + r + "Color"] = n
						}), t
					}
				};
				e = n.Color.names = {
					aqua: "#00ffff",
					black: "#000000",
					blue: "#0000ff",
					fuchsia: "#ff00ff",
					gray: "#808080",
					green: "#008000",
					lime: "#00ff00",
					maroon: "#800000",
					navy: "#000080",
					olive: "#808000",
					purple: "#800080",
					red: "#ff0000",
					silver: "#c0c0c0",
					teal: "#008080",
					white: "#ffffff",
					yellow: "#ffff00",
					transparent: [null, null, null, 0],
					_default: "#ffffff"
				}
			}(s),
			function () {
				function t(t) {
					var r, u, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
						f = {};
					if (i && i.length && i[0] && i[i[0]])
						for (u = i.length; u--;) r = i[u], "string" == typeof i[r] && (f[n.camelCase(r)] = i[r]);
					else
						for (r in i) "string" == typeof i[r] && (f[r] = i[r]);
					return f
				}

				function i(t, i) {
					var r, f, e = {};
					for (r in i) f = i[r], t[r] !== f && (u[r] || (n.fx.step[r] || !isNaN(parseFloat(f))) && (e[r] = f));
					return e
				}
				var r = ["add", "remove", "toggle"],
					u = {
						border: 1,
						borderBottom: 1,
						borderColor: 1,
						borderLeft: 1,
						borderRight: 1,
						borderTop: 1,
						borderWidth: 1,
						margin: 1,
						padding: 1
					};
				n.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (t, i) {
					n.fx.step[i] = function (n) {
						("none" === n.end || n.setAttr) && (1 !== n.pos || n.setAttr) || (s.style(n.elem, i, n.end), n.setAttr = !0)
					}
				});
				n.fn.addBack || (n.fn.addBack = function (n) {
					return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
				});
				n.effects.animateClass = function (u, f, e, o) {
					var s = n.speed(f, e, o);
					return this.queue(function () {
						var o, e = n(this),
							h = e.attr("class") || "",
							f = s.children ? e.find("*").addBack() : e;
						f = f.map(function () {
							var i = n(this);
							return {
								el: i,
								start: t(this)
							}
						});
						o = function () {
							n.each(r, function (n, t) {
								u[t] && e[t + "Class"](u[t])
							})
						};
						o();
						f = f.map(function () {
							return this.end = t(this.el[0]), this.diff = i(this.start, this.end), this
						});
						e.attr("class", h);
						f = f.map(function () {
							var i = this,
								t = n.Deferred(),
								r = n.extend({}, s, {
									queue: !1,
									complete: function () {
										t.resolve(i)
									}
								});
							return this.el.animate(this.diff, r), t.promise()
						});
						n.when.apply(n, f.get()).done(function () {
							o();
							n.each(arguments, function () {
								var t = this.el;
								n.each(this.diff, function (n) {
									t.css(n, "")
								})
							});
							s.complete.call(e[0])
						})
					})
				};
				n.fn.extend({
					addClass: function (t) {
						return function (i, r, u, f) {
							return r ? n.effects.animateClass.call(this, {
								add: i
							}, r, u, f) : t.apply(this, arguments)
						}
					}(n.fn.addClass),
					removeClass: function (t) {
						return function (i, r, u, f) {
							return arguments.length > 1 ? n.effects.animateClass.call(this, {
								remove: i
							}, r, u, f) : t.apply(this, arguments)
						}
					}(n.fn.removeClass),
					toggleClass: function (t) {
						return function (i, r, u, f, e) {
							return "boolean" == typeof r || void 0 === r ? u ? n.effects.animateClass.call(this, r ? {
								add: i
							} : {
								remove: i
							}, u, f, e) : t.apply(this, arguments) : n.effects.animateClass.call(this, {
								toggle: i
							}, r, u, f)
						}
					}(n.fn.toggleClass),
					switchClass: function (t, i, r, u, f) {
						return n.effects.animateClass.call(this, {
							add: i,
							remove: t
						}, r, u, f)
					}
				})
			}(),
			function () {
				function t(t, i, r, u) {
					return n.isPlainObject(t) && (i = t, t = t.effect), t = {
						effect: t
					}, null == i && (i = {}), n.isFunction(i) && (u = i, r = null, i = {}), ("number" == typeof i || n.fx.speeds[i]) && (u = r, r = i, i = {}), n.isFunction(r) && (u = r, r = null), i && n.extend(t, i), r = r || i.duration, t.duration = n.fx.off ? 0 : "number" == typeof r ? r : r in n.fx.speeds ? n.fx.speeds[r] : n.fx.speeds._default, t.complete = u || i.complete, t
				}

				function i(t) {
					return !t || "number" == typeof t || n.fx.speeds[t] ? !0 : "string" != typeof t || n.effects.effect[t] ? n.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0
				}
				n.extend(n.effects, {
					version: "1.11.1",
					save: function (n, t) {
						for (var i = 0; t.length > i; i++) null !== t[i] && n.data(o + t[i], n[0].style[t[i]])
					},
					restore: function (n, t) {
						for (var r, i = 0; t.length > i; i++) null !== t[i] && (r = n.data(o + t[i]), void 0 === r && (r = ""), n.css(t[i], r))
					},
					setMode: function (n, t) {
						return "toggle" === t && (t = n.is(":hidden") ? "show" : "hide"), t
					},
					getBaseline: function (n, t) {
						var i, r;
						switch (n[0]) {
							case "top":
								i = 0;
								break;
							case "middle":
								i = .5;
								break;
							case "bottom":
								i = 1;
								break;
							default:
								i = n[0] / t.height
						}
						switch (n[1]) {
							case "left":
								r = 0;
								break;
							case "center":
								r = .5;
								break;
							case "right":
								r = 1;
								break;
							default:
								r = n[1] / t.width
						}
						return {
							x: r,
							y: i
						}
					},
					createWrapper: function (t) {
						if (t.parent().is(".ui-effects-wrapper")) return t.parent();
						var i = {
								width: t.outerWidth(!0),
								height: t.outerHeight(!0),
								float: t.css("float")
							},
							u = n("<div><\/div>").addClass("ui-effects-wrapper").css({
								fontSize: "100%",
								background: "transparent",
								border: "none",
								margin: 0,
								padding: 0
							}),
							f = {
								width: t.width(),
								height: t.height()
							},
							r = document.activeElement;
						try {
							r.id
						} catch (e) {
							r = document.body
						}
						return t.wrap(u), (t[0] === r || n.contains(t[0], r)) && n(r).focus(), u = t.parent(), "static" === t.css("position") ? (u.css({
							position: "relative"
						}), t.css({
							position: "relative"
						})) : (n.extend(i, {
							position: t.css("position"),
							zIndex: t.css("z-index")
						}), n.each(["top", "left", "bottom", "right"], function (n, r) {
							i[r] = t.css(r);
							isNaN(parseInt(i[r], 10)) && (i[r] = "auto")
						}), t.css({
							position: "relative",
							top: 0,
							left: 0,
							right: "auto",
							bottom: "auto"
						})), t.css(f), u.css(i).show()
					},
					removeWrapper: function (t) {
						var i = document.activeElement;
						return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || n.contains(t[0], i)) && n(i).focus()), t
					},
					setTransition: function (t, i, r, u) {
						return u = u || {}, n.each(i, function (n, i) {
							var f = t.cssUnit(i);
							f[0] > 0 && (u[i] = f[0] * r + f[1])
						}), u
					}
				});
				n.fn.extend({
					effect: function () {
						function r(t) {
							function f() {
								n.isFunction(o) && o.call(r[0]);
								n.isFunction(t) && t()
							}
							var r = n(this),
								o = i.complete,
								u = i.mode;
							(r.is(":hidden") ? "hide" === u : "show" === u) ? (r[u](), f()) : e.call(r[0], i, f)
						}
						var i = t.apply(this, arguments),
							u = i.mode,
							f = i.queue,
							e = n.effects.effect[i.effect];
						return n.fx.off || !e ? u ? this[u](i.duration, i.complete) : this.each(function () {
							i.complete && i.complete.call(this)
						}) : f === !1 ? this.each(r) : this.queue(f || "fx", r)
					},
					show: function (n) {
						return function (r) {
							if (i(r)) return n.apply(this, arguments);
							var u = t.apply(this, arguments);
							return u.mode = "show", this.effect.call(this, u)
						}
					}(n.fn.show),
					hide: function (n) {
						return function (r) {
							if (i(r)) return n.apply(this, arguments);
							var u = t.apply(this, arguments);
							return u.mode = "hide", this.effect.call(this, u)
						}
					}(n.fn.hide),
					toggle: function (n) {
						return function (r) {
							if (i(r) || "boolean" == typeof r) return n.apply(this, arguments);
							var u = t.apply(this, arguments);
							return u.mode = "toggle", this.effect.call(this, u)
						}
					}(n.fn.toggle),
					cssUnit: function (t) {
						var i = this.css(t),
							r = [];
						return n.each(["em", "px", "%", "pt"], function (n, t) {
							i.indexOf(t) > 0 && (r = [parseFloat(i), t])
						}), r
					}
				})
			}(),
			function () {
				var t = {};
				n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (n, i) {
					t[i] = function (t) {
						return Math.pow(t, n + 2)
					}
				});
				n.extend(t, {
					Sine: function (n) {
						return 1 - Math.cos(n * Math.PI / 2)
					},
					Circ: function (n) {
						return 1 - Math.sqrt(1 - n * n)
					},
					Elastic: function (n) {
						return 0 === n || 1 === n ? n : -Math.pow(2, 8 * (n - 1)) * Math.sin((80 * (n - 1) - 7.5) * Math.PI / 15)
					},
					Back: function (n) {
						return n * n * (3 * n - 2)
					},
					Bounce: function (n) {
						for (var t, i = 4;
							((t = Math.pow(2, --i)) - 1) / 11 > n;);
						return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - n, 2)
					}
				});
				n.each(t, function (t, i) {
					n.easing["easeIn" + t] = i;
					n.easing["easeOut" + t] = function (n) {
						return 1 - i(1 - n)
					};
					n.easing["easeInOut" + t] = function (n) {
						return .5 > n ? i(2 * n) / 2 : 1 - i(-2 * n + 2) / 2
					}
				})
			}();
		n.effects;
		n.effects.effect.blind = function (t, i) {
			var u, f, e, r = n(this),
				s = ["position", "top", "bottom", "left", "right", "height", "width"],
				v = n.effects.setMode(r, t.mode || "hide"),
				y = t.direction || "up",
				o = /up|down|vertical/.test(y),
				h = o ? "height" : "width",
				c = o ? "top" : "left",
				p = /up|left|vertical|horizontal/.test(y),
				l = {},
				a = "show" === v;
			r.parent().is(".ui-effects-wrapper") ? n.effects.save(r.parent(), s) : n.effects.save(r, s);
			r.show();
			u = n.effects.createWrapper(r).css({
				overflow: "hidden"
			});
			f = u[h]();
			e = parseFloat(u.css(c)) || 0;
			l[h] = a ? f : 0;
			p || (r.css(o ? "bottom" : "right", 0).css(o ? "top" : "left", "auto").css({
				position: "absolute"
			}), l[c] = a ? e : f + e);
			a && (u.css(h, 0), p || u.css(c, e + f));
			u.animate(l, {
				duration: t.duration,
				easing: t.easing,
				queue: !1,
				complete: function () {
					"hide" === v && r.hide();
					n.effects.restore(r, s);
					n.effects.removeWrapper(r);
					i()
				}
			})
		};
		n.effects.effect.bounce = function (t, i) {
			var v, f, e, r = n(this),
				y = ["position", "top", "bottom", "left", "right", "height", "width"],
				k = n.effects.setMode(r, t.mode || "effect"),
				o = "hide" === k,
				p = "show" === k,
				h = t.direction || "up",
				u = t.distance,
				w = t.times || 5,
				d = 2 * w + (p || o ? 1 : 0),
				c = t.duration / d,
				l = t.easing,
				s = "up" === h || "down" === h ? "top" : "left",
				b = "up" === h || "left" === h,
				a = r.queue(),
				g = a.length;
			for ((p || o) && y.push("opacity"), n.effects.save(r, y), r.show(), n.effects.createWrapper(r), u || (u = r["top" === s ? "outerHeight" : "outerWidth"]() / 3), p && (e = {
					opacity: 1
				}, e[s] = 0, r.css("opacity", 0).css(s, b ? 2 * -u : 2 * u).animate(e, c, l)), o && (u /= Math.pow(2, w - 1)), e = {}, e[s] = 0, v = 0; w > v; v++) f = {}, f[s] = (b ? "-=" : "+=") + u, r.animate(f, c, l).animate(e, c, l), u = o ? 2 * u : u / 2;
			o && (f = {
				opacity: 0
			}, f[s] = (b ? "-=" : "+=") + u, r.animate(f, c, l));
			r.queue(function () {
				o && r.hide();
				n.effects.restore(r, y);
				n.effects.removeWrapper(r);
				i()
			});
			g > 1 && a.splice.apply(a, [1, 0].concat(a.splice(g, d + 1)));
			r.dequeue()
		};
		n.effects.effect.clip = function (t, i) {
			var h, u, f, r = n(this),
				c = ["position", "top", "bottom", "left", "right", "height", "width"],
				v = n.effects.setMode(r, t.mode || "hide"),
				e = "show" === v,
				y = t.direction || "vertical",
				l = "vertical" === y,
				o = l ? "height" : "width",
				a = l ? "top" : "left",
				s = {};
			n.effects.save(r, c);
			r.show();
			h = n.effects.createWrapper(r).css({
				overflow: "hidden"
			});
			u = "IMG" === r[0].tagName ? h : r;
			f = u[o]();
			e && (u.css(o, 0), u.css(a, f / 2));
			s[o] = e ? f : 0;
			s[a] = e ? 0 : f / 2;
			u.animate(s, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: function () {
					e || r.hide();
					n.effects.restore(r, c);
					n.effects.removeWrapper(r);
					i()
				}
			})
		};
		n.effects.effect.drop = function (t, i) {
			var u, r = n(this),
				h = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
				c = n.effects.setMode(r, t.mode || "hide"),
				e = "show" === c,
				f = t.direction || "left",
				o = "up" === f || "down" === f ? "top" : "left",
				s = "up" === f || "left" === f ? "pos" : "neg",
				l = {
					opacity: e ? 1 : 0
				};
			n.effects.save(r, h);
			r.show();
			n.effects.createWrapper(r);
			u = t.distance || r["top" === o ? "outerHeight" : "outerWidth"](!0) / 2;
			e && r.css("opacity", 0).css(o, "pos" === s ? -u : u);
			l[o] = (e ? "pos" === s ? "+=" : "-=" : "pos" === s ? "-=" : "+=") + u;
			r.animate(l, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: function () {
					"hide" === c && r.hide();
					n.effects.restore(r, h);
					n.effects.removeWrapper(r);
					i()
				}
			})
		};
		n.effects.effect.explode = function (t, i) {
			function b() {
				p.push(this);
				p.length === o * c && k()
			}

			function k() {
				r.css({
					visibility: "visible"
				});
				n(p).remove();
				u || r.hide();
				i()
			}
			for (var e, l, a, v, y, o = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3, c = o, r = n(this), d = n.effects.setMode(r, t.mode || "hide"), u = "show" === d, w = r.show().css("visibility", "hidden").offset(), s = Math.ceil(r.outerWidth() / c), h = Math.ceil(r.outerHeight() / o), p = [], f = 0; o > f; f++)
				for (a = w.top + f * h, y = f - (o - 1) / 2, e = 0; c > e; e++) l = w.left + e * s, v = e - (c - 1) / 2, r.clone().appendTo("body").wrap("<div><\/div>").css({
					position: "absolute",
					visibility: "visible",
					left: -e * s,
					top: -f * h
				}).parent().addClass("ui-effects-explode").css({
					position: "absolute",
					overflow: "hidden",
					width: s,
					height: h,
					left: l + (u ? v * s : 0),
					top: a + (u ? y * h : 0),
					opacity: u ? 0 : 1
				}).animate({
					left: l + (u ? 0 : v * s),
					top: a + (u ? 0 : y * h),
					opacity: u ? 1 : 0
				}, t.duration || 500, t.easing, b)
		};
		n.effects.effect.fade = function (t, i) {
			var r = n(this),
				u = n.effects.setMode(r, t.mode || "toggle");
			r.animate({
				opacity: u
			}, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: i
			})
		};
		n.effects.effect.fold = function (t, i) {
			var r, e, u = n(this),
				s = ["position", "top", "bottom", "left", "right", "height", "width"],
				h = n.effects.setMode(u, t.mode || "hide"),
				o = "show" === h,
				c = "hide" === h,
				f = t.size || 15,
				l = /([0-9]+)%/.exec(f),
				a = !!t.horizFirst,
				v = o !== a,
				y = v ? ["width", "height"] : ["height", "width"],
				p = t.duration / 2,
				w = {},
				b = {};
			n.effects.save(u, s);
			u.show();
			r = n.effects.createWrapper(u).css({
				overflow: "hidden"
			});
			e = v ? [r.width(), r.height()] : [r.height(), r.width()];
			l && (f = parseInt(l[1], 10) / 100 * e[c ? 0 : 1]);
			o && r.css(a ? {
				height: 0,
				width: f
			} : {
				height: f,
				width: 0
			});
			w[y[0]] = o ? e[0] : f;
			b[y[1]] = o ? e[1] : 0;
			r.animate(w, p, t.easing).animate(b, p, t.easing, function () {
				c && u.hide();
				n.effects.restore(u, s);
				n.effects.removeWrapper(u);
				i()
			})
		};
		n.effects.effect.highlight = function (t, i) {
			var r = n(this),
				u = ["backgroundImage", "backgroundColor", "opacity"],
				f = n.effects.setMode(r, t.mode || "show"),
				e = {
					backgroundColor: r.css("backgroundColor")
				};
			"hide" === f && (e.opacity = 0);
			n.effects.save(r, u);
			r.show().css({
				backgroundImage: "none",
				backgroundColor: t.color || "#ffff99"
			}).animate(e, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: function () {
					"hide" === f && r.hide();
					n.effects.restore(r, u);
					i()
				}
			})
		};
		n.effects.effect.size = function (t, i) {
			var f, l, u, r = n(this),
				w = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
				a = ["width", "height", "overflow"],
				v = ["fontSize"],
				e = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
				o = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
				h = n.effects.setMode(r, t.mode || "effect"),
				y = t.restore || "effect" !== h,
				c = t.scale || "both",
				b = t.origin || ["middle", "center"],
				k = r.css("position"),
				s = y ? w : ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
				p = {
					height: 0,
					width: 0,
					outerHeight: 0,
					outerWidth: 0
				};
			"show" === h && r.show();
			f = {
				height: r.height(),
				width: r.width(),
				outerHeight: r.outerHeight(),
				outerWidth: r.outerWidth()
			};
			"toggle" === t.mode && "show" === h ? (r.from = t.to || p, r.to = t.from || f) : (r.from = t.from || ("show" === h ? p : f), r.to = t.to || ("hide" === h ? p : f));
			u = {
				from: {
					y: r.from.height / f.height,
					x: r.from.width / f.width
				},
				to: {
					y: r.to.height / f.height,
					x: r.to.width / f.width
				}
			};
			("box" === c || "both" === c) && (u.from.y !== u.to.y && (s = s.concat(e), r.from = n.effects.setTransition(r, e, u.from.y, r.from), r.to = n.effects.setTransition(r, e, u.to.y, r.to)), u.from.x !== u.to.x && (s = s.concat(o), r.from = n.effects.setTransition(r, o, u.from.x, r.from), r.to = n.effects.setTransition(r, o, u.to.x, r.to)));
			("content" === c || "both" === c) && u.from.y !== u.to.y && (s = s.concat(v).concat(a), r.from = n.effects.setTransition(r, v, u.from.y, r.from), r.to = n.effects.setTransition(r, v, u.to.y, r.to));
			n.effects.save(r, s);
			r.show();
			n.effects.createWrapper(r);
			r.css("overflow", "hidden").css(r.from);
			b && (l = n.effects.getBaseline(b, f), r.from.top = (f.outerHeight - r.outerHeight()) * l.y, r.from.left = (f.outerWidth - r.outerWidth()) * l.x, r.to.top = (f.outerHeight - r.to.outerHeight) * l.y, r.to.left = (f.outerWidth - r.to.outerWidth) * l.x);
			r.css(r.from);
			("content" === c || "both" === c) && (e = e.concat(["marginTop", "marginBottom"]).concat(v), o = o.concat(["marginLeft", "marginRight"]), a = w.concat(e).concat(o), r.find("*[width]").each(function () {
				var i = n(this),
					r = {
						height: i.height(),
						width: i.width(),
						outerHeight: i.outerHeight(),
						outerWidth: i.outerWidth()
					};
				y && n.effects.save(i, a);
				i.from = {
					height: r.height * u.from.y,
					width: r.width * u.from.x,
					outerHeight: r.outerHeight * u.from.y,
					outerWidth: r.outerWidth * u.from.x
				};
				i.to = {
					height: r.height * u.to.y,
					width: r.width * u.to.x,
					outerHeight: r.height * u.to.y,
					outerWidth: r.width * u.to.x
				};
				u.from.y !== u.to.y && (i.from = n.effects.setTransition(i, e, u.from.y, i.from), i.to = n.effects.setTransition(i, e, u.to.y, i.to));
				u.from.x !== u.to.x && (i.from = n.effects.setTransition(i, o, u.from.x, i.from), i.to = n.effects.setTransition(i, o, u.to.x, i.to));
				i.css(i.from);
				i.animate(i.to, t.duration, t.easing, function () {
					y && n.effects.restore(i, a)
				})
			}));
			r.animate(r.to, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: function () {
					0 === r.to.opacity && r.css("opacity", r.from.opacity);
					"hide" === h && r.hide();
					n.effects.restore(r, s);
					y || ("static" === k ? r.css({
						position: "relative",
						top: r.to.top,
						left: r.to.left
					}) : n.each(["top", "left"], function (n, t) {
						r.css(t, function (t, i) {
							var f = parseInt(i, 10),
								u = n ? r.to.left : r.to.top;
							return "auto" === i ? u + "px" : f + u + "px"
						})
					}));
					n.effects.removeWrapper(r);
					i()
				}
			})
		};
		n.effects.effect.scale = function (t, i) {
			var u = n(this),
				r = n.extend(!0, {}, t),
				f = n.effects.setMode(u, t.mode || "effect"),
				s = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) ? 0 : "hide" === f ? 0 : 100),
				h = t.direction || "both",
				c = t.origin,
				e = {
					height: u.height(),
					width: u.width(),
					outerHeight: u.outerHeight(),
					outerWidth: u.outerWidth()
				},
				o = {
					y: "horizontal" !== h ? s / 100 : 1,
					x: "vertical" !== h ? s / 100 : 1
				};
			r.effect = "size";
			r.queue = !1;
			r.complete = i;
			"effect" !== f && (r.origin = c || ["middle", "center"], r.restore = !0);
			r.from = t.from || ("show" === f ? {
				height: 0,
				width: 0,
				outerHeight: 0,
				outerWidth: 0
			} : e);
			r.to = {
				height: e.height * o.y,
				width: e.width * o.x,
				outerHeight: e.outerHeight * o.y,
				outerWidth: e.outerWidth * o.x
			};
			r.fade && ("show" === f && (r.from.opacity = 0, r.to.opacity = 1), "hide" === f && (r.from.opacity = 1, r.to.opacity = 0));
			u.effect(r)
		};
		n.effects.effect.puff = function (t, i) {
			var r = n(this),
				e = n.effects.setMode(r, t.mode || "hide"),
				o = "hide" === e,
				s = parseInt(t.percent, 10) || 150,
				f = s / 100,
				u = {
					height: r.height(),
					width: r.width(),
					outerHeight: r.outerHeight(),
					outerWidth: r.outerWidth()
				};
			n.extend(t, {
				effect: "scale",
				queue: !1,
				fade: !0,
				mode: e,
				complete: i,
				percent: o ? s : 100,
				from: o ? u : {
					height: u.height * f,
					width: u.width * f,
					outerHeight: u.outerHeight * f,
					outerWidth: u.outerWidth * f
				}
			});
			r.effect(t)
		};
		n.effects.effect.pulsate = function (t, i) {
			var e, r = n(this),
				o = n.effects.setMode(r, t.mode || "show"),
				h = "show" === o,
				a = "hide" === o,
				v = h || "hide" === o,
				s = 2 * (t.times || 5) + (v ? 1 : 0),
				c = t.duration / s,
				u = 0,
				f = r.queue(),
				l = f.length;
			for ((h || !r.is(":visible")) && (r.css("opacity", 0).show(), u = 1), e = 1; s > e; e++) r.animate({
				opacity: u
			}, c, t.easing), u = 1 - u;
			r.animate({
				opacity: u
			}, c, t.easing);
			r.queue(function () {
				a && r.hide();
				i()
			});
			l > 1 && f.splice.apply(f, [1, 0].concat(f.splice(l, s + 1)));
			r.dequeue()
		};
		n.effects.effect.shake = function (t, i) {
			var o, r = n(this),
				v = ["position", "top", "bottom", "left", "right", "height", "width"],
				k = n.effects.setMode(r, t.mode || "effect"),
				f = t.direction || "left",
				s = t.distance || 20,
				y = t.times || 3,
				p = 2 * y + 1,
				u = Math.round(t.duration / p),
				h = "up" === f || "down" === f ? "top" : "left",
				c = "up" === f || "left" === f,
				l = {},
				a = {},
				w = {},
				e = r.queue(),
				b = e.length;
			for (n.effects.save(r, v), r.show(), n.effects.createWrapper(r), l[h] = (c ? "-=" : "+=") + s, a[h] = (c ? "+=" : "-=") + 2 * s, w[h] = (c ? "-=" : "+=") + 2 * s, r.animate(l, u, t.easing), o = 1; y > o; o++) r.animate(a, u, t.easing).animate(w, u, t.easing);
			r.animate(a, u, t.easing).animate(l, u / 2, t.easing).queue(function () {
				"hide" === k && r.hide();
				n.effects.restore(r, v);
				n.effects.removeWrapper(r);
				i()
			});
			b > 1 && e.splice.apply(e, [1, 0].concat(e.splice(b, p + 1)));
			r.dequeue()
		};
		n.effects.effect.slide = function (t, i) {
			var u, r = n(this),
				s = ["position", "top", "bottom", "left", "right", "width", "height"],
				h = n.effects.setMode(r, t.mode || "show"),
				c = "show" === h,
				f = t.direction || "left",
				e = "up" === f || "down" === f ? "top" : "left",
				o = "up" === f || "left" === f,
				l = {};
			n.effects.save(r, s);
			r.show();
			u = t.distance || r["top" === e ? "outerHeight" : "outerWidth"](!0);
			n.effects.createWrapper(r).css({
				overflow: "hidden"
			});
			c && r.css(e, o ? isNaN(u) ? "-" + u : -u : u);
			l[e] = (c ? o ? "+=" : "-=" : o ? "-=" : "+=") + u;
			r.animate(l, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: function () {
					"hide" === h && r.hide();
					n.effects.restore(r, s);
					n.effects.removeWrapper(r);
					i()
				}
			})
		};
		n.effects.effect.transfer = function (t, i) {
			var u = n(this),
				r = n(t.to),
				f = "fixed" === r.css("position"),
				e = n("body"),
				o = f ? e.scrollTop() : 0,
				s = f ? e.scrollLeft() : 0,
				h = r.offset(),
				l = {
					top: h.top - o,
					left: h.left - s,
					height: r.innerHeight(),
					width: r.innerWidth()
				},
				c = u.offset(),
				a = n("<div class='ui-effects-transfer'><\/div>").appendTo(document.body).addClass(t.className).css({
					top: c.top - o,
					left: c.left - s,
					height: u.innerHeight(),
					width: u.innerWidth(),
					position: f ? "fixed" : "absolute"
				}).animate(l, t.duration, t.easing, function () {
					a.remove();
					i()
				})
		}
	}), window.Modernizr = function (n, t, i) {
		function a(n) {
			c.cssText = n
		}

		function vt(n, t) {
			return a(y.join(n + ";") + (t || ""))
		}

		function h(n, t) {
			return typeof n === t
		}

		function v(n, t) {
			return !!~("" + n).indexOf(t)
		}

		function lt(n, t) {
			var u, r;
			for (u in n)
				if (r = n[u], !v(r, "-") && c[r] !== i) return t == "pfx" ? r : !0;
			return !1
		}

		function yt(n, t, r) {
			var f, u;
			for (f in n)
				if (u = t[n[f]], u !== i) return r === !1 ? n[f] : h(u, "function") ? u.bind(r || t) : u;
			return !1
		}

		function f(n, t, i) {
			var r = n.charAt(0).toUpperCase() + n.slice(1),
				u = (n + " " + ot.join(r + " ") + r).split(" ");
			return h(t, "string") || h(t, "undefined") ? lt(u, t) : (u = (n + " " + st.join(r + " ") + r).split(" "), yt(u, t, i))
		}

		function pt() {
			u.input = function (i) {
				for (var r = 0, u = i.length; r < u; r++) w[i[r]] = !!(i[r] in o);
				return w.list && (w.list = !!(t.createElement("datalist") && n.HTMLDataListElement)), w
			}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));
			u.inputtypes = function (n) {
				for (var u = 0, r, f, e, h = n.length; u < h; u++) o.setAttribute("type", f = n[u]), r = o.type !== "text", r && (o.value = g, o.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && o.style.WebkitAppearance !== i ? (s.appendChild(o), e = t.defaultView, r = e.getComputedStyle && e.getComputedStyle(o, null).WebkitAppearance !== "textfield" && o.offsetHeight !== 0, s.removeChild(o)) : /^(search|tel)$/.test(f) || (r = /^(url|email)$/.test(f) ? o.checkValidity && o.checkValidity() === !1 : o.value != g)), ht[n[u]] = !!r;
				return ht
			}("search tel url email datetime date month week time datetime-local number range color".split(" "))
		}
		var u = {},
			d = !0,
			s = t.documentElement,
			e = "modernizr",
			ut = t.createElement(e),
			c = ut.style,
			o = t.createElement("input"),
			g = ":)",
			ft = {}.toString,
			y = " -webkit- -moz- -o- -ms- ".split(" "),
			et = "Webkit Moz O ms",
			ot = et.split(" "),
			st = et.toLowerCase().split(" "),
			p = {
				svg: "http://www.w3.org/2000/svg"
			},
			r = {},
			ht = {},
			w = {},
			nt = [],
			tt = nt.slice,
			b, l = function (n, i, r, u) {
				var l, a, c, v, f = t.createElement("div"),
					h = t.body,
					o = h || t.createElement("body");
				if (parseInt(r, 10))
					while (r--) c = t.createElement("div"), c.id = u ? u[r] : e + (r + 1), f.appendChild(c);
				return l = ["&#173;", '<style id="s', e, '">', n, "<\/style>"].join(""), f.id = e, (h ? f : o).innerHTML += l, o.appendChild(f), h || (o.style.background = "", o.style.overflow = "hidden", v = s.style.overflow, s.style.overflow = "hidden", s.appendChild(o)), a = i(f, n), h ? f.parentNode.removeChild(f) : (o.parentNode.removeChild(o), s.style.overflow = v), !!a
			},
			at = function (t) {
				var i = n.matchMedia || n.msMatchMedia,
					r;
				return i ? i(t) && i(t).matches || !1 : (l("@media " + t + " { #" + e + " { position: absolute; } }", function (t) {
					r = (n.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position == "absolute"
				}), r)
			},
			ct = function () {
				function r(r, u) {
					u = u || t.createElement(n[r] || "div");
					r = "on" + r;
					var f = r in u;
					return f || (u.setAttribute || (u = t.createElement("div")), u.setAttribute && u.removeAttribute && (u.setAttribute(r, ""), f = h(u[r], "function"), h(u[r], "undefined") || (u[r] = i), u.removeAttribute(r))), u = null, f
				}
				var n = {
					select: "input",
					change: "input",
					submit: "form",
					reset: "form",
					error: "img",
					load: "img",
					abort: "img"
				};
				return r
			}(),
			it = {}.hasOwnProperty,
			rt, k;
		rt = h(it, "undefined") || h(it.call, "undefined") ? function (n, t) {
			return t in n && h(n.constructor.prototype[t], "undefined")
		} : function (n, t) {
			return it.call(n, t)
		};
		Function.prototype.bind || (Function.prototype.bind = function (n) {
			var t = this,
				i, r;
			if (typeof t != "function") throw new TypeError;
			return i = tt.call(arguments, 1), r = function () {
				var f, e, u;
				return this instanceof r ? (f = function () {}, f.prototype = t.prototype, e = new f, u = t.apply(e, i.concat(tt.call(arguments))), Object(u) === u) ? u : e : t.apply(n, i.concat(tt.call(arguments)))
			}, r
		});
		r.flexbox = function () {
			return f("flexWrap")
		};
		r.flexboxlegacy = function () {
			return f("boxDirection")
		};
		r.canvas = function () {
			var n = t.createElement("canvas");
			return !!(n.getContext && n.getContext("2d"))
		};
		r.canvastext = function () {
			return !!(u.canvas && h(t.createElement("canvas").getContext("2d").fillText, "function"))
		};
		r.webgl = function () {
			return !!n.WebGLRenderingContext
		};
		r.touch = function () {
			var i;
			return "ontouchstart" in n || n.DocumentTouch && t instanceof DocumentTouch ? i = !0 : l(["@media (", y.join("touch-enabled),("), e, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (n) {
				i = n.offsetTop === 9
			}), i
		};
		r.geolocation = function () {
			return "geolocation" in navigator
		};
		r.postmessage = function () {
			return !!n.postMessage
		};
		r.websqldatabase = function () {
			return !!n.openDatabase
		};
		r.indexedDB = function () {
			return !!f("indexedDB", n)
		};
		r.hashchange = function () {
			return ct("hashchange", n) && (t.documentMode === i || t.documentMode > 7)
		};
		r.history = function () {
			return !!(n.history && history.pushState)
		};
		r.draganddrop = function () {
			var n = t.createElement("div");
			return "draggable" in n || "ondragstart" in n && "ondrop" in n
		};
		r.websockets = function () {
			return "WebSocket" in n || "MozWebSocket" in n
		};
		r.rgba = function () {
			return a("background-color:rgba(150,255,150,.5)"), v(c.backgroundColor, "rgba")
		};
		r.hsla = function () {
			return a("background-color:hsla(120,40%,100%,.5)"), v(c.backgroundColor, "rgba") || v(c.backgroundColor, "hsla")
		};
		r.multiplebgs = function () {
			return a("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(c.background)
		};
		r.backgroundsize = function () {
			return f("backgroundSize")
		};
		r.borderimage = function () {
			return f("borderImage")
		};
		r.borderradius = function () {
			return f("borderRadius")
		};
		r.boxshadow = function () {
			return f("boxShadow")
		};
		r.textshadow = function () {
			return t.createElement("div").style.textShadow === ""
		};
		r.opacity = function () {
			return vt("opacity:.55"), /^0.55$/.test(c.opacity)
		};
		r.cssanimations = function () {
			return f("animationName")
		};
		r.csscolumns = function () {
			return f("columnCount")
		};
		r.cssgradients = function () {
			var n = "background-image:";
			return a((n + "-webkit- ".split(" ").join("gradient(linear,left top,right bottom,from(#9f9),to(white));" + n) + y.join("linear-gradient(left top,#9f9, white);" + n)).slice(0, -n.length)), v(c.backgroundImage, "gradient")
		};
		r.cssreflections = function () {
			return f("boxReflect")
		};
		r.csstransforms = function () {
			return !!f("transform")
		};
		r.csstransforms3d = function () {
			var n = !!f("perspective");
			return n && "webkitPerspective" in s.style && l("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (t) {
				n = t.offsetLeft === 9 && t.offsetHeight === 3
			}), n
		};
		r.csstransitions = function () {
			return f("transition")
		};
		r.fontface = function () {
			var n;
			return l('@font-face {font-family:"font";src:url("https://")}', function (i, r) {
				var f = t.getElementById("smodernizr"),
					u = f.sheet || f.styleSheet,
					e = u ? u.cssRules && u.cssRules[0] ? u.cssRules[0].cssText : u.cssText || "" : "";
				n = /src/i.test(e) && e.indexOf(r.split(" ")[0]) === 0
			}), n
		};
		r.generatedcontent = function () {
			var n;
			return l(["#", e, "{font:0/0 a}#", e, ':after{content:"', g, '";visibility:hidden;font:3px/1 a}'].join(""), function (t) {
				n = t.offsetHeight >= 3
			}), n
		};
		r.video = function () {
			var i = t.createElement("video"),
				n = !1;
			try {
				(n = !!i.canPlayType) && (n = new Boolean(n), n.ogg = i.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = i.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = i.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
			} catch (r) {}
			return n
		};
		r.audio = function () {
			var i = t.createElement("audio"),
				n = !1;
			try {
				(n = !!i.canPlayType) && (n = new Boolean(n), n.ogg = i.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = i.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = i.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (i.canPlayType("audio/x-m4a;") || i.canPlayType("audio/aac;")).replace(/^no$/, ""))
			} catch (r) {}
			return n
		};
		r.localstorage = function () {
			try {
				return localStorage.setItem(e, e), localStorage.removeItem(e), !0
			} catch (n) {
				return !1
			}
		};
		r.sessionstorage = function () {
			try {
				return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0
			} catch (n) {
				return !1
			}
		};
		r.webworkers = function () {
			return !!n.Worker
		};
		r.applicationcache = function () {
			return !!n.applicationCache
		};
		r.svg = function () {
			return !!t.createElementNS && !!t.createElementNS(p.svg, "svg").createSVGRect
		};
		r.inlinesvg = function () {
			var n = t.createElement("div");
			return n.innerHTML = "<svg/>", (n.firstChild && n.firstChild.namespaceURI) == p.svg
		};
		r.smil = function () {
			return !!t.createElementNS && /SVGAnimate/.test(ft.call(t.createElementNS(p.svg, "animate")))
		};
		r.svgclippaths = function () {
			return !!t.createElementNS && /SVGClipPath/.test(ft.call(t.createElementNS(p.svg, "clipPath")))
		};
		for (k in r) rt(r, k) && (b = k.toLowerCase(), u[b] = r[k](), nt.push((u[b] ? "" : "no-") + b));
		return u.input || pt(), u.addTest = function (n, t) {
				if (typeof n == "object")
					for (var r in n) rt(n, r) && u.addTest(r, n[r]);
				else {
					if (n = n.toLowerCase(), u[n] !== i) return u;
					t = typeof t == "function" ? t() : t;
					typeof d != "undefined" && d && (s.className += " " + (t ? "" : "no-") + n);
					u[n] = t
				}
				return u
			}, a(""), ut = o = null,
			function (n, t) {
				function p(n, t) {
					var i = n.createElement("p"),
						r = n.getElementsByTagName("head")[0] || n.documentElement;
					return i.innerHTML = "x<style>" + t + "<\/style>", r.insertBefore(i.lastChild, r.firstChild)
				}

				function c() {
					var n = r.elements;
					return typeof n == "string" ? n.split(" ") : n
				}

				function o(n) {
					var t = h[n[s]];
					return t || (t = {}, e++, n[s] = e, h[e] = t), t
				}

				function l(n, r, u) {
					if (r || (r = t), i) return r.createElement(n);
					u || (u = o(r));
					var f;
					return f = u.cache[n] ? u.cache[n].cloneNode() : y.test(n) ? (u.cache[n] = u.createElem(n)).cloneNode() : u.createElem(n), f.canHaveChildren && !v.test(n) && !f.tagUrn ? u.frag.appendChild(f) : f
				}

				function w(n, r) {
					if (n || (n = t), i) return n.createDocumentFragment();
					r = r || o(n);
					for (var f = r.frag.cloneNode(), u = 0, e = c(), s = e.length; u < s; u++) f.createElement(e[u]);
					return f
				}

				function b(n, t) {
					t.cache || (t.cache = {}, t.createElem = n.createElement, t.createFrag = n.createDocumentFragment, t.frag = t.createFrag());
					n.createElement = function (i) {
						return r.shivMethods ? l(i, n, t) : t.createElem(i)
					};
					n.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + c().join().replace(/[\w\-]+/g, function (n) {
						return t.createElem(n), t.frag.createElement(n), 'c("' + n + '")'
					}) + ");return n}")(r, t.frag)
				}

				function a(n) {
					n || (n = t);
					var u = o(n);
					return !r.shivCSS || f || u.hasCSS || (u.hasCSS = !!p(n, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), i || b(n, u), n
				}
				var u = n.html5 || {},
					v = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
					y = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
					f, s = "_html5shiv",
					e = 0,
					h = {},
					i, r;
				(function () {
					try {
						var n = t.createElement("a");
						n.innerHTML = "<xyz><\/xyz>";
						f = "hidden" in n;
						i = n.childNodes.length == 1 || function () {
							t.createElement("a");
							var n = t.createDocumentFragment();
							return typeof n.cloneNode == "undefined" || typeof n.createDocumentFragment == "undefined" || typeof n.createElement == "undefined"
						}()
					} catch (r) {
						f = !0;
						i = !0
					}
				})();
				r = {
					elements: u.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
					version: "3.7.0",
					shivCSS: u.shivCSS !== !1,
					supportsUnknownElements: i,
					shivMethods: u.shivMethods !== !1,
					type: "default",
					shivDocument: a,
					createElement: l,
					createDocumentFragment: w
				};
				n.html5 = r;
				a(t)
			}(this, t), u._version = "2.8.3", u._prefixes = y, u._domPrefixes = st, u._cssomPrefixes = ot, u.mq = at, u.hasEvent = ct, u.testProp = function (n) {
				return lt([n])
			}, u.testAllProps = f, u.testStyles = l, u.prefixed = function (n, t, i) {
				return t ? f(n, t, i) : f(n, "pfx")
			}, s.className = s.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (d ? " js " + nt.join(" ") : ""), u
	}(this, this.document), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (n) {
	"use strict";
	var t = n.fn.jquery.split(" ")[0].split(".");
	if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1 || t[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(jQuery); + function (n) {
	"use strict";

	function t() {
		var i = document.createElement("bootstrap"),
			n = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd otransitionend",
				transition: "transitionend"
			};
		for (var t in n)
			if (void 0 !== i.style[t]) return {
				end: n[t]
			};
		return !1
	}
	n.fn.emulateTransitionEnd = function (t) {
		var i = !1,
			u = this,
			r;
		n(this).one("bsTransitionEnd", function () {
			i = !0
		});
		return r = function () {
			i || n(u).trigger(n.support.transition.end)
		}, setTimeout(r, t), this
	};
	n(function () {
		n.support.transition = t();
		n.support.transition && (n.event.special.bsTransitionEnd = {
			bindType: n.support.transition.end,
			delegateType: n.support.transition.end,
			handle: function (t) {
				if (n(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
			}
		})
	})
}(jQuery); + function (n) {
	"use strict";

	function u(i) {
		return this.each(function () {
			var r = n(this),
				u = r.data("bs.alert");
			u || r.data("bs.alert", u = new t(this));
			"string" == typeof i && u[i].call(r)
		})
	}
	var i = '[data-dismiss="alert"]',
		t = function (t) {
			n(t).on("click", i, this.close)
		},
		r;
	t.VERSION = "3.3.7";
	t.TRANSITION_DURATION = 150;
	t.prototype.close = function (i) {
		function e() {
			r.detach().trigger("closed.bs.alert").remove()
		}
		var f = n(this),
			u = f.attr("data-target"),
			r;
		u || (u = f.attr("href"), u = u && u.replace(/.*(?=#[^\s]*$)/, ""));
		r = n("#" === u ? [] : u);
		i && i.preventDefault();
		r.length || (r = f.closest(".alert"));
		r.trigger(i = n.Event("close.bs.alert"));
		i.isDefaultPrevented() || (r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e())
	};
	r = n.fn.alert;
	n.fn.alert = u;
	n.fn.alert.Constructor = t;
	n.fn.alert.noConflict = function () {
		return n.fn.alert = r, this
	};
	n(document).on("click.bs.alert.data-api", i, t.prototype.close)
}(jQuery); + function (n) {
	"use strict";

	function i(i) {
		return this.each(function () {
			var u = n(this),
				r = u.data("bs.button"),
				f = "object" == typeof i && i;
			r || u.data("bs.button", r = new t(this, f));
			"toggle" == i ? r.toggle() : i && r.setState(i)
		})
	}
	var t = function (i, r) {
			this.$element = n(i);
			this.options = n.extend({}, t.DEFAULTS, r);
			this.isLoading = !1
		},
		r;
	t.VERSION = "3.3.7";
	t.DEFAULTS = {
		loadingText: "loading..."
	};
	t.prototype.setState = function (t) {
		var i = "disabled",
			r = this.$element,
			f = r.is("input") ? "val" : "html",
			u = r.data();
		t += "Text";
		null == u.resetText && r.data("resetText", r[f]());
		setTimeout(n.proxy(function () {
			r[f](null == u[t] ? this.options[t] : u[t]);
			"loadingText" == t ? (this.isLoading = !0, r.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1, r.removeClass(i).removeAttr(i).prop(i, !1))
		}, this), 0)
	};
	t.prototype.toggle = function () {
		var t = !0,
			i = this.$element.closest('[data-toggle="buttons"]'),
			n;
		i.length ? (n = this.$element.find("input"), "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), i.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")) : (this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active"))
	};
	r = n.fn.button;
	n.fn.button = i;
	n.fn.button.Constructor = t;
	n.fn.button.noConflict = function () {
		return n.fn.button = r, this
	};
	n(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (t) {
		var r = n(t.target).closest(".btn");
		i.call(r, "toggle");
		n(t.target).is('input[type="radio"], input[type="checkbox"]') || (t.preventDefault(), r.is("input,button") ? r.trigger("focus") : r.find("input:visible,button:visible").first().trigger("focus"))
	}).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (t) {
		n(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
	})
}(jQuery); + function (n) {
	"use strict";

	function i(i) {
		return this.each(function () {
			var u = n(this),
				r = u.data("bs.carousel"),
				f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i),
				e = "string" == typeof i ? i : f.slide;
			r || u.data("bs.carousel", r = new t(this, f));
			"number" == typeof i ? r.to(i) : e ? r[e]() : f.interval && r.pause().cycle()
		})
	}
	var t = function (t, i) {
			this.$element = n(t);
			this.$indicators = this.$element.find(".carousel-indicators");
			this.options = i;
			this.paused = null;
			this.sliding = null;
			this.interval = null;
			this.$active = null;
			this.$items = null;
			this.options.keyboard && this.$element.on("keydown.bs.carousel", n.proxy(this.keydown, this));
			"hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", n.proxy(this.pause, this)).on("mouseleave.bs.carousel", n.proxy(this.cycle, this))
		},
		u, r;
	t.VERSION = "3.3.7";
	t.TRANSITION_DURATION = 600;
	t.DEFAULTS = {
		interval: 5e3,
		pause: "hover",
		wrap: !0,
		keyboard: !0
	};
	t.prototype.keydown = function (n) {
		if (!/input|textarea/i.test(n.target.tagName)) {
			switch (n.which) {
				case 37:
					this.prev();
					break;
				case 39:
					this.next();
					break;
				default:
					return
			}
			n.preventDefault()
		}
	};
	t.prototype.cycle = function (t) {
		return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(n.proxy(this.next, this), this.options.interval)), this
	};
	t.prototype.getItemIndex = function (n) {
		return this.$items = n.parent().children(".item"), this.$items.index(n || this.$active)
	};
	t.prototype.getItemForDirection = function (n, t) {
		var i = this.getItemIndex(t),
			f = "prev" == n && 0 === i || "next" == n && i == this.$items.length - 1,
			r, u;
		return f && !this.options.wrap ? t : (r = "prev" == n ? -1 : 1, u = (i + r) % this.$items.length, this.$items.eq(u))
	};
	t.prototype.to = function (n) {
		var i = this,
			t = this.getItemIndex(this.$active = this.$element.find(".item.active"));
		if (!(n > this.$items.length - 1 || n < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
			i.to(n)
		}) : t == n ? this.pause().cycle() : this.slide(n > t ? "next" : "prev", this.$items.eq(n))
	};
	t.prototype.pause = function (t) {
		return t || (this.paused = !0), this.$element.find(".next, .prev").length && n.support.transition && (this.$element.trigger(n.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
	};
	t.prototype.next = function () {
		if (!this.sliding) return this.slide("next")
	};
	t.prototype.prev = function () {
		if (!this.sliding) return this.slide("prev")
	};
	t.prototype.slide = function (i, r) {
		var e = this.$element.find(".item.active"),
			u = r || this.getItemForDirection(i, e),
			l = this.interval,
			f = "next" == i ? "left" : "right",
			a = this,
			o, s, h, c;
		return u.hasClass("active") ? this.sliding = !1 : (o = u[0], s = n.Event("slide.bs.carousel", {
			relatedTarget: o,
			direction: f
		}), (this.$element.trigger(s), !s.isDefaultPrevented()) ? ((this.sliding = !0, l && this.pause(), this.$indicators.length) && (this.$indicators.find(".active").removeClass("active"), h = n(this.$indicators.children()[this.getItemIndex(u)]), h && h.addClass("active")), c = n.Event("slid.bs.carousel", {
			relatedTarget: o,
			direction: f
		}), n.support.transition && this.$element.hasClass("slide") ? (u.addClass(i), u[0].offsetWidth, e.addClass(f), u.addClass(f), e.one("bsTransitionEnd", function () {
			u.removeClass([i, f].join(" ")).addClass("active");
			e.removeClass(["active", f].join(" "));
			a.sliding = !1;
			setTimeout(function () {
				a.$element.trigger(c)
			}, 0)
		}).emulateTransitionEnd(t.TRANSITION_DURATION)) : (e.removeClass("active"), u.addClass("active"), this.sliding = !1, this.$element.trigger(c)), l && this.cycle(), this) : void 0)
	};
	u = n.fn.carousel;
	n.fn.carousel = i;
	n.fn.carousel.Constructor = t;
	n.fn.carousel.noConflict = function () {
		return n.fn.carousel = u, this
	};
	r = function (t) {
		var o, r = n(this),
			u = n(r.attr("data-target") || (o = r.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "")),
			e, f;
		u.hasClass("carousel") && (e = n.extend({}, u.data(), r.data()), f = r.attr("data-slide-to"), f && (e.interval = !1), i.call(u, e), f && u.data("bs.carousel").to(f), t.preventDefault())
	};
	n(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r);
	n(window).on("load", function () {
		n('[data-ride="carousel"]').each(function () {
			var t = n(this);
			i.call(t, t.data())
		})
	})
}(jQuery); + function (n) {
	"use strict";

	function r(t) {
		var i, r = t.attr("data-target") || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
		return n(r)
	}

	function i(i) {
		return this.each(function () {
			var u = n(this),
				r = u.data("bs.collapse"),
				f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i);
			!r && f.toggle && /show|hide/.test(i) && (f.toggle = !1);
			r || u.data("bs.collapse", r = new t(this, f));
			"string" == typeof i && r[i]()
		})
	}
	var t = function (i, r) {
			this.$element = n(i);
			this.options = n.extend({}, t.DEFAULTS, r);
			this.$trigger = n('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]');
			this.transitioning = null;
			this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
			this.options.toggle && this.toggle()
		},
		u;
	t.VERSION = "3.3.7";
	t.TRANSITION_DURATION = 350;
	t.DEFAULTS = {
		toggle: !0
	};
	t.prototype.dimension = function () {
		var n = this.$element.hasClass("width");
		return n ? "width" : "height"
	};
	t.prototype.show = function () {
		var f, r, e, u, o, s;
		if (!this.transitioning && !this.$element.hasClass("in") && (r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing"), !(r && r.length && (f = r.data("bs.collapse"), f && f.transitioning)) && (e = n.Event("show.bs.collapse"), this.$element.trigger(e), !e.isDefaultPrevented()))) {
			if (r && r.length && (i.call(r, "hide"), f || r.data("bs.collapse", null)), u = this.dimension(), this.$element.removeClass("collapse").addClass("collapsing")[u](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1, o = function () {
					this.$element.removeClass("collapsing").addClass("collapse in")[u]("");
					this.transitioning = 0;
					this.$element.trigger("shown.bs.collapse")
				}, !n.support.transition) return o.call(this);
			s = n.camelCase(["scroll", u].join("-"));
			this.$element.one("bsTransitionEnd", n.proxy(o, this)).emulateTransitionEnd(t.TRANSITION_DURATION)[u](this.$element[0][s])
		}
	};
	t.prototype.hide = function () {
		var r, i, u;
		if (!this.transitioning && this.$element.hasClass("in") && (r = n.Event("hide.bs.collapse"), this.$element.trigger(r), !r.isDefaultPrevented())) return i = this.dimension(), this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1, u = function () {
			this.transitioning = 0;
			this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
		}, n.support.transition ? void this.$element[i](0).one("bsTransitionEnd", n.proxy(u, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : u.call(this)
	};
	t.prototype.toggle = function () {
		this[this.$element.hasClass("in") ? "hide" : "show"]()
	};
	t.prototype.getParent = function () {
		return n(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(n.proxy(function (t, i) {
			var u = n(i);
			this.addAriaAndCollapsedClass(r(u), u)
		}, this)).end()
	};
	t.prototype.addAriaAndCollapsedClass = function (n, t) {
		var i = n.hasClass("in");
		n.attr("aria-expanded", i);
		t.toggleClass("collapsed", !i).attr("aria-expanded", i)
	};
	u = n.fn.collapse;
	n.fn.collapse = i;
	n.fn.collapse.Constructor = t;
	n.fn.collapse.noConflict = function () {
		return n.fn.collapse = u, this
	};
	n(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (t) {
		var u = n(this);
		u.attr("data-target") || t.preventDefault();
		var f = r(u),
			e = f.data("bs.collapse"),
			o = e ? "toggle" : u.data();
		i.call(f, o)
	})
}(jQuery); + function (n) {
	"use strict";

	function r(t) {
		var i = t.attr("data-target"),
			r;
		return i || (i = t.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")), r = i && n(i), r && r.length ? r : t.parent()
	}

	function u(t) {
		t && 3 === t.which || (n(o).remove(), n(i).each(function () {
			var u = n(this),
				i = r(u),
				f = {
					relatedTarget: this
				};
			i.hasClass("open") && (t && "click" == t.type && /input|textarea/i.test(t.target.tagName) && n.contains(i[0], t.target) || (i.trigger(t = n.Event("hide.bs.dropdown", f)), t.isDefaultPrevented() || (u.attr("aria-expanded", "false"), i.removeClass("open").trigger(n.Event("hidden.bs.dropdown", f)))))
		}))
	}

	function e(i) {
		return this.each(function () {
			var r = n(this),
				u = r.data("bs.dropdown");
			u || r.data("bs.dropdown", u = new t(this));
			"string" == typeof i && u[i].call(r)
		})
	}
	var o = ".dropdown-backdrop",
		i = '[data-toggle="dropdown"]',
		t = function (t) {
			n(t).on("click.bs.dropdown", this.toggle)
		},
		f;
	t.VERSION = "3.3.7";
	t.prototype.toggle = function (t) {
		var f = n(this),
			i, o, e;
		if (!f.is(".disabled, :disabled")) {
			if (i = r(f), o = i.hasClass("open"), u(), !o) {
				if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && n(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(n(this)).on("click", u), e = {
						relatedTarget: this
					}, i.trigger(t = n.Event("show.bs.dropdown", e)), t.isDefaultPrevented()) return;
				f.trigger("focus").attr("aria-expanded", "true");
				i.toggleClass("open").trigger(n.Event("shown.bs.dropdown", e))
			}
			return !1
		}
	};
	t.prototype.keydown = function (t) {
		var e, o, s, h, f, u;
		if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName) && (e = n(this), t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
			if (o = r(e), s = o.hasClass("open"), !s && 27 != t.which || s && 27 == t.which) return 27 == t.which && o.find(i).trigger("focus"), e.trigger("click");
			h = " li:not(.disabled):visible a";
			f = o.find(".dropdown-menu" + h);
			f.length && (u = f.index(t.target), 38 == t.which && u > 0 && u--, 40 == t.which && u < f.length - 1 && u++, ~u || (u = 0), f.eq(u).trigger("focus"))
		}
	};
	f = n.fn.dropdown;
	n.fn.dropdown = e;
	n.fn.dropdown.Constructor = t;
	n.fn.dropdown.noConflict = function () {
		return n.fn.dropdown = f, this
	};
	n(document).on("click.bs.dropdown.data-api", u).on("click.bs.dropdown.data-api", ".dropdown form", function (n) {
		n.stopPropagation()
	}).on("click.bs.dropdown.data-api", i, t.prototype.toggle).on("keydown.bs.dropdown.data-api", i, t.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", t.prototype.keydown)
}(jQuery); + function (n) {
	"use strict";

	function i(i, r) {
		return this.each(function () {
			var f = n(this),
				u = f.data("bs.modal"),
				e = n.extend({}, t.DEFAULTS, f.data(), "object" == typeof i && i);
			u || f.data("bs.modal", u = new t(this, e));
			"string" == typeof i ? u[i](r) : e.show && u.show(r)
		})
	}
	var t = function (t, i) {
			this.options = i;
			this.$body = n(document.body);
			this.$element = n(t);
			this.$dialog = this.$element.find(".modal-dialog");
			this.$backdrop = null;
			this.isShown = null;
			this.originalBodyPad = null;
			this.scrollbarWidth = 0;
			this.ignoreBackdropClick = !1;
			this.options.remote && this.$element.find(".modal-content").load(this.options.remote, n.proxy(function () {
				this.$element.trigger("loaded.bs.modal")
			}, this))
		},
		r;
	t.VERSION = "3.3.7";
	t.TRANSITION_DURATION = 300;
	t.BACKDROP_TRANSITION_DURATION = 150;
	t.DEFAULTS = {
		backdrop: !0,
		keyboard: !0,
		show: !0
	};
	t.prototype.toggle = function (n) {
		return this.isShown ? this.hide() : this.show(n)
	};
	t.prototype.show = function (i) {
		var r = this,
			u = n.Event("show.bs.modal", {
				relatedTarget: i
			});
		this.$element.trigger(u);
		this.isShown || u.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', n.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
			r.$element.one("mouseup.dismiss.bs.modal", function (t) {
				n(t.target).is(r.$element) && (r.ignoreBackdropClick = !0)
			})
		}), this.backdrop(function () {
			var f = n.support.transition && r.$element.hasClass("fade"),
				u;
			r.$element.parent().length || r.$element.appendTo(r.$body);
			r.$element.show().scrollTop(0);
			r.adjustDialog();
			f && r.$element[0].offsetWidth;
			r.$element.addClass("in");
			r.enforceFocus();
			u = n.Event("shown.bs.modal", {
				relatedTarget: i
			});
			f ? r.$dialog.one("bsTransitionEnd", function () {
				r.$element.trigger("focus").trigger(u)
			}).emulateTransitionEnd(t.TRANSITION_DURATION) : r.$element.trigger("focus").trigger(u)
		}))
	};
	t.prototype.hide = function (i) {
		i && i.preventDefault();
		i = n.Event("hide.bs.modal");
		this.$element.trigger(i);
		this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), n(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), n.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", n.proxy(this.hideModal, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : this.hideModal())
	};
	t.prototype.enforceFocus = function () {
		n(document).off("focusin.bs.modal").on("focusin.bs.modal", n.proxy(function (n) {
			document === n.target || this.$element[0] === n.target || this.$element.has(n.target).length || this.$element.trigger("focus")
		}, this))
	};
	t.prototype.escape = function () {
		this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", n.proxy(function (n) {
			27 == n.which && this.hide()
		}, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
	};
	t.prototype.resize = function () {
		this.isShown ? n(window).on("resize.bs.modal", n.proxy(this.handleUpdate, this)) : n(window).off("resize.bs.modal")
	};
	t.prototype.hideModal = function () {
		var n = this;
		this.$element.hide();
		this.backdrop(function () {
			n.$body.removeClass("modal-open");
			n.resetAdjustments();
			n.resetScrollbar();
			n.$element.trigger("hidden.bs.modal")
		})
	};
	t.prototype.removeBackdrop = function () {
		this.$backdrop && this.$backdrop.remove();
		this.$backdrop = null
	};
	t.prototype.backdrop = function (i) {
		var e = this,
			f = this.$element.hasClass("fade") ? "fade" : "",
			r, u;
		if (this.isShown && this.options.backdrop) {
			if (r = n.support.transition && f, this.$backdrop = n(document.createElement("div")).addClass("modal-backdrop " + f).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", n.proxy(function (n) {
					return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(n.target === n.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
				}, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
			r ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : i()
		} else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), u = function () {
			e.removeBackdrop();
			i && i()
		}, n.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", u).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : u()) : i && i()
	};
	t.prototype.handleUpdate = function () {
		this.adjustDialog()
	};
	t.prototype.adjustDialog = function () {
		var n = this.$element[0].scrollHeight > document.documentElement.clientHeight;
		this.$element.css({
			paddingLeft: !this.bodyIsOverflowing && n ? this.scrollbarWidth : "",
			paddingRight: this.bodyIsOverflowing && !n ? this.scrollbarWidth : ""
		})
	};
	t.prototype.resetAdjustments = function () {
		this.$element.css({
			paddingLeft: "",
			paddingRight: ""
		})
	};
	t.prototype.checkScrollbar = function () {
		var n = window.innerWidth,
			t;
		n || (t = document.documentElement.getBoundingClientRect(), n = t.right - Math.abs(t.left));
		this.bodyIsOverflowing = document.body.clientWidth < n;
		this.scrollbarWidth = this.measureScrollbar()
	};
	t.prototype.setScrollbar = function () {
		var n = parseInt(this.$body.css("padding-right") || 0, 10);
		this.originalBodyPad = document.body.style.paddingRight || "";
		this.bodyIsOverflowing && this.$body.css("padding-right", n + this.scrollbarWidth)
	};
	t.prototype.resetScrollbar = function () {
		this.$body.css("padding-right", this.originalBodyPad)
	};
	t.prototype.measureScrollbar = function () {
		var n = document.createElement("div"),
			t;
		return n.className = "modal-scrollbar-measure", this.$body.append(n), t = n.offsetWidth - n.clientWidth, this.$body[0].removeChild(n), t
	};
	r = n.fn.modal;
	n.fn.modal = i;
	n.fn.modal.Constructor = t;
	n.fn.modal.noConflict = function () {
		return n.fn.modal = r, this
	};
	n(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
		var r = n(this),
			f = r.attr("href"),
			u = n(r.attr("data-target") || f && f.replace(/.*(?=#[^\s]+$)/, "")),
			e = u.data("bs.modal") ? "toggle" : n.extend({
				remote: !/#/.test(f) && f
			}, u.data(), r.data());
		r.is("a") && t.preventDefault();
		u.one("show.bs.modal", function (n) {
			n.isDefaultPrevented() || u.one("hidden.bs.modal", function () {
				r.is(":visible") && r.trigger("focus")
			})
		});
		i.call(u, e, this)
	})
}(jQuery); + function (n) {
	"use strict";

	function r(i) {
		return this.each(function () {
			var u = n(this),
				r = u.data("bs.tooltip"),
				f = "object" == typeof i && i;
			!r && /destroy|hide/.test(i) || (r || u.data("bs.tooltip", r = new t(this, f)), "string" == typeof i && r[i]())
		})
	}
	var t = function (n, t) {
			this.type = null;
			this.options = null;
			this.enabled = null;
			this.timeout = null;
			this.hoverState = null;
			this.$element = null;
			this.inState = null;
			this.init("tooltip", n, t)
		},
		i;
	t.VERSION = "3.3.7";
	t.TRANSITION_DURATION = 150;
	t.DEFAULTS = {
		animation: !0,
		placement: "top",
		selector: !1,
		template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"><\/div><div class="tooltip-inner"><\/div><\/div>',
		trigger: "hover focus",
		title: "",
		delay: 0,
		html: !1,
		container: !1,
		viewport: {
			selector: "body",
			padding: 0
		}
	};
	t.prototype.init = function (t, i, r) {
		var f, e, u, o, s;
		if (this.enabled = !0, this.type = t, this.$element = n(i), this.options = this.getOptions(r), this.$viewport = this.options.viewport && n(n.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
				click: !1,
				hover: !1,
				focus: !1
			}, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
		for (f = this.options.trigger.split(" "), e = f.length; e--;)
			if (u = f[e], "click" == u) this.$element.on("click." + this.type, this.options.selector, n.proxy(this.toggle, this));
			else "manual" != u && (o = "hover" == u ? "mouseenter" : "focusin", s = "hover" == u ? "mouseleave" : "focusout", this.$element.on(o + "." + this.type, this.options.selector, n.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, n.proxy(this.leave, this)));
		this.options.selector ? this._options = n.extend({}, this.options, {
			trigger: "manual",
			selector: ""
		}) : this.fixTitle()
	};
	t.prototype.getDefaults = function () {
		return t.DEFAULTS
	};
	t.prototype.getOptions = function (t) {
		return t = n.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
			show: t.delay,
			hide: t.delay
		}), t
	};
	t.prototype.getDelegateOptions = function () {
		var t = {},
			i = this.getDefaults();
		return this._options && n.each(this._options, function (n, r) {
			i[n] != r && (t[n] = r)
		}), t
	};
	t.prototype.enter = function (t) {
		var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
		return i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), t instanceof n.Event && (i.inState["focusin" == t.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
			"in" == i.hoverState && i.show()
		}, i.options.delay.show)) : i.show())
	};
	t.prototype.isInStateTrue = function () {
		for (var n in this.inState)
			if (this.inState[n]) return !0;
		return !1
	};
	t.prototype.leave = function (t) {
		var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
		if (i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), t instanceof n.Event && (i.inState["focusout" == t.type ? "focus" : "hover"] = !1), !i.isInStateTrue()) return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
			"out" == i.hoverState && i.hide()
		}, i.options.delay.hide)) : i.hide()
	};
	t.prototype.show = function () {
		var c = n.Event("show.bs." + this.type),
			l, p, e, w, h;
		if (this.hasContent() && this.enabled) {
			if (this.$element.trigger(c), l = n.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]), c.isDefaultPrevented() || !l) return;
			var u = this,
				r = this.tip(),
				a = this.getUID(this.type);
			this.setContent();
			r.attr("id", a);
			this.$element.attr("aria-describedby", a);
			this.options.animation && r.addClass("fade");
			var i = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
				v = /\s?auto?\s?/i,
				y = v.test(i);
			y && (i = i.replace(v, "") || "top");
			r.detach().css({
				top: 0,
				left: 0,
				display: "block"
			}).addClass(i).data("bs." + this.type, this);
			this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element);
			this.$element.trigger("inserted.bs." + this.type);
			var f = this.getPosition(),
				o = r[0].offsetWidth,
				s = r[0].offsetHeight;
			y && (p = i, e = this.getPosition(this.$viewport), i = "bottom" == i && f.bottom + s > e.bottom ? "top" : "top" == i && f.top - s < e.top ? "bottom" : "right" == i && f.right + o > e.width ? "left" : "left" == i && f.left - o < e.left ? "right" : i, r.removeClass(p).addClass(i));
			w = this.getCalculatedOffset(i, f, o, s);
			this.applyPlacement(w, i);
			h = function () {
				var n = u.hoverState;
				u.$element.trigger("shown.bs." + u.type);
				u.hoverState = null;
				"out" == n && u.leave(u)
			};
			n.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", h).emulateTransitionEnd(t.TRANSITION_DURATION) : h()
		}
	};
	t.prototype.applyPlacement = function (t, i) {
		var r = this.tip(),
			l = r[0].offsetWidth,
			e = r[0].offsetHeight,
			o = parseInt(r.css("margin-top"), 10),
			s = parseInt(r.css("margin-left"), 10),
			h, f, u;
		isNaN(o) && (o = 0);
		isNaN(s) && (s = 0);
		t.top += o;
		t.left += s;
		n.offset.setOffset(r[0], n.extend({
			using: function (n) {
				r.css({
					top: Math.round(n.top),
					left: Math.round(n.left)
				})
			}
		}, t), 0);
		r.addClass("in");
		h = r[0].offsetWidth;
		f = r[0].offsetHeight;
		"top" == i && f != e && (t.top = t.top + e - f);
		u = this.getViewportAdjustedDelta(i, t, h, f);
		u.left ? t.left += u.left : t.top += u.top;
		var c = /top|bottom/.test(i),
			a = c ? 2 * u.left - l + h : 2 * u.top - e + f,
			v = c ? "offsetWidth" : "offsetHeight";
		r.offset(t);
		this.replaceArrow(a, r[0][v], c)
	};
	t.prototype.replaceArrow = function (n, t, i) {
		this.arrow().css(i ? "left" : "top", 50 * (1 - n / t) + "%").css(i ? "top" : "left", "")
	};
	t.prototype.setContent = function () {
		var n = this.tip(),
			t = this.getTitle();
		n.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
		n.removeClass("fade in top bottom left right")
	};
	t.prototype.hide = function (i) {
		function f() {
			"in" != r.hoverState && u.detach();
			r.$element && r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type);
			i && i()
		}
		var r = this,
			u = n(this.$tip),
			e = n.Event("hide.bs." + this.type);
		if (this.$element.trigger(e), !e.isDefaultPrevented()) return u.removeClass("in"), n.support.transition && u.hasClass("fade") ? u.one("bsTransitionEnd", f).emulateTransitionEnd(t.TRANSITION_DURATION) : f(), this.hoverState = null, this
	};
	t.prototype.fixTitle = function () {
		var n = this.$element;
		(n.attr("title") || "string" != typeof n.attr("data-original-title")) && n.attr("data-original-title", n.attr("title") || "").attr("title", "")
	};
	t.prototype.hasContent = function () {
		return this.getTitle()
	};
	t.prototype.getPosition = function (t) {
		t = t || this.$element;
		var r = t[0],
			u = "BODY" == r.tagName,
			i = r.getBoundingClientRect();
		null == i.width && (i = n.extend({}, i, {
			width: i.right - i.left,
			height: i.bottom - i.top
		}));
		var f = window.SVGElement && r instanceof window.SVGElement,
			e = u ? {
				top: 0,
				left: 0
			} : f ? null : t.offset(),
			o = {
				scroll: u ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
			},
			s = u ? {
				width: n(window).width(),
				height: n(window).height()
			} : null;
		return n.extend({}, i, o, s, e)
	};
	t.prototype.getCalculatedOffset = function (n, t, i, r) {
		return "bottom" == n ? {
			top: t.top + t.height,
			left: t.left + t.width / 2 - i / 2
		} : "top" == n ? {
			top: t.top - r,
			left: t.left + t.width / 2 - i / 2
		} : "left" == n ? {
			top: t.top + t.height / 2 - r / 2,
			left: t.left - i
		} : {
			top: t.top + t.height / 2 - r / 2,
			left: t.left + t.width
		}
	};
	t.prototype.getViewportAdjustedDelta = function (n, t, i, r) {
		var f = {
				top: 0,
				left: 0
			},
			e, u, o, s, h, c;
		return this.$viewport ? (e = this.options.viewport && this.options.viewport.padding || 0, u = this.getPosition(this.$viewport), /right|left/.test(n) ? (o = t.top - e - u.scroll, s = t.top + e - u.scroll + r, o < u.top ? f.top = u.top - o : s > u.top + u.height && (f.top = u.top + u.height - s)) : (h = t.left - e, c = t.left + e + i, h < u.left ? f.left = u.left - h : c > u.right && (f.left = u.left + u.width - c)), f) : f
	};
	t.prototype.getTitle = function () {
		var t = this.$element,
			n = this.options;
		return t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
	};
	t.prototype.getUID = function (n) {
		do n += ~~(1e6 * Math.random()); while (document.getElementById(n));
		return n
	};
	t.prototype.tip = function () {
		if (!this.$tip && (this.$tip = n(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
		return this.$tip
	};
	t.prototype.arrow = function () {
		return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
	};
	t.prototype.enable = function () {
		this.enabled = !0
	};
	t.prototype.disable = function () {
		this.enabled = !1
	};
	t.prototype.toggleEnabled = function () {
		this.enabled = !this.enabled
	};
	t.prototype.toggle = function (t) {
		var i = this;
		t && (i = n(t.currentTarget).data("bs." + this.type), i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)));
		t ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
	};
	t.prototype.destroy = function () {
		var n = this;
		clearTimeout(this.timeout);
		this.hide(function () {
			n.$element.off("." + n.type).removeData("bs." + n.type);
			n.$tip && n.$tip.detach();
			n.$tip = null;
			n.$arrow = null;
			n.$viewport = null;
			n.$element = null
		})
	};
	i = n.fn.tooltip;
	n.fn.tooltip = r;
	n.fn.tooltip.Constructor = t;
	n.fn.tooltip.noConflict = function () {
		return n.fn.tooltip = i, this
	}
}(jQuery); + function (n) {
	"use strict";

	function r(i) {
		return this.each(function () {
			var u = n(this),
				r = u.data("bs.popover"),
				f = "object" == typeof i && i;
			!r && /destroy|hide/.test(i) || (r || u.data("bs.popover", r = new t(this, f)), "string" == typeof i && r[i]())
		})
	}
	var t = function (n, t) {
			this.init("popover", n, t)
		},
		i;
	if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
	t.VERSION = "3.3.7";
	t.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
		placement: "right",
		trigger: "click",
		content: "",
		template: '<div class="popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
	});
	t.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype);
	t.prototype.constructor = t;
	t.prototype.getDefaults = function () {
		return t.DEFAULTS
	};
	t.prototype.setContent = function () {
		var n = this.tip(),
			i = this.getTitle(),
			t = this.getContent();
		n.find(".popover-title")[this.options.html ? "html" : "text"](i);
		n.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof t ? "html" : "append" : "text"](t);
		n.removeClass("fade top bottom left right in");
		n.find(".popover-title").html() || n.find(".popover-title").hide()
	};
	t.prototype.hasContent = function () {
		return this.getTitle() || this.getContent()
	};
	t.prototype.getContent = function () {
		var t = this.$element,
			n = this.options;
		return t.attr("data-content") || ("function" == typeof n.content ? n.content.call(t[0]) : n.content)
	};
	t.prototype.arrow = function () {
		return this.$arrow = this.$arrow || this.tip().find(".arrow")
	};
	i = n.fn.popover;
	n.fn.popover = r;
	n.fn.popover.Constructor = t;
	n.fn.popover.noConflict = function () {
		return n.fn.popover = i, this
	}
}(jQuery); + function (n) {
	"use strict";

	function t(i, r) {
		this.$body = n(document.body);
		this.$scrollElement = n(n(i).is(document.body) ? window : i);
		this.options = n.extend({}, t.DEFAULTS, r);
		this.selector = (this.options.target || "") + " .nav li > a";
		this.offsets = [];
		this.targets = [];
		this.activeTarget = null;
		this.scrollHeight = 0;
		this.$scrollElement.on("scroll.bs.scrollspy", n.proxy(this.process, this));
		this.refresh();
		this.process()
	}

	function i(i) {
		return this.each(function () {
			var u = n(this),
				r = u.data("bs.scrollspy"),
				f = "object" == typeof i && i;
			r || u.data("bs.scrollspy", r = new t(this, f));
			"string" == typeof i && r[i]()
		})
	}
	t.VERSION = "3.3.7";
	t.DEFAULTS = {
		offset: 10
	};
	t.prototype.getScrollHeight = function () {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	};
	t.prototype.refresh = function () {
		var t = this,
			i = "offset",
			r = 0;
		this.offsets = [];
		this.targets = [];
		this.scrollHeight = this.getScrollHeight();
		n.isWindow(this.$scrollElement[0]) || (i = "position", r = this.$scrollElement.scrollTop());
		this.$body.find(this.selector).map(function () {
			var f = n(this),
				u = f.data("target") || f.attr("href"),
				t = /^#./.test(u) && n(u);
			return t && t.length && t.is(":visible") && [
				[t[i]().top + r, u]
			] || null
		}).sort(function (n, t) {
			return n[0] - t[0]
		}).each(function () {
			t.offsets.push(this[0]);
			t.targets.push(this[1])
		})
	};
	t.prototype.process = function () {
		var n, i = this.$scrollElement.scrollTop() + this.options.offset,
			f = this.getScrollHeight(),
			e = this.options.offset + f - this.$scrollElement.height(),
			t = this.offsets,
			r = this.targets,
			u = this.activeTarget;
		if (this.scrollHeight != f && this.refresh(), i >= e) return u != (n = r[r.length - 1]) && this.activate(n);
		if (u && i < t[0]) return this.activeTarget = null, this.clear();
		for (n = t.length; n--;) u != r[n] && i >= t[n] && (void 0 === t[n + 1] || i < t[n + 1]) && this.activate(r[n])
	};
	t.prototype.activate = function (t) {
		this.activeTarget = t;
		this.clear();
		var r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
			i = n(r).parents("li").addClass("active");
		i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active"));
		i.trigger("activate.bs.scrollspy")
	};
	t.prototype.clear = function () {
		n(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
	};
	var r = n.fn.scrollspy;
	n.fn.scrollspy = i;
	n.fn.scrollspy.Constructor = t;
	n.fn.scrollspy.noConflict = function () {
		return n.fn.scrollspy = r, this
	};
	n(window).on("load.bs.scrollspy.data-api", function () {
		n('[data-spy="scroll"]').each(function () {
			var t = n(this);
			i.call(t, t.data())
		})
	})
}(jQuery); + function (n) {
	"use strict";

	function r(i) {
		return this.each(function () {
			var u = n(this),
				r = u.data("bs.tab");
			r || u.data("bs.tab", r = new t(this));
			"string" == typeof i && r[i]()
		})
	}
	var t = function (t) {
			this.element = n(t)
		},
		u, i;
	t.VERSION = "3.3.7";
	t.TRANSITION_DURATION = 150;
	t.prototype.show = function () {
		var t = this.element,
			f = t.closest("ul:not(.dropdown-menu)"),
			i = t.data("target"),
			u;
		if (i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
			var r = f.find(".active:last a"),
				e = n.Event("hide.bs.tab", {
					relatedTarget: t[0]
				}),
				o = n.Event("show.bs.tab", {
					relatedTarget: r[0]
				});
			(r.trigger(e), t.trigger(o), o.isDefaultPrevented() || e.isDefaultPrevented()) || (u = n(i), this.activate(t.closest("li"), f), this.activate(u, u.parent(), function () {
				r.trigger({
					type: "hidden.bs.tab",
					relatedTarget: t[0]
				});
				t.trigger({
					type: "shown.bs.tab",
					relatedTarget: r[0]
				})
			}))
		}
	};
	t.prototype.activate = function (i, r, u) {
		function e() {
			f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
			i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
			o ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade");
			i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
			u && u()
		}
		var f = r.find("> .active"),
			o = u && n.support.transition && (f.length && f.hasClass("fade") || !!r.find("> .fade").length);
		f.length && o ? f.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e();
		f.removeClass("in")
	};
	u = n.fn.tab;
	n.fn.tab = r;
	n.fn.tab.Constructor = t;
	n.fn.tab.noConflict = function () {
		return n.fn.tab = u, this
	};
	i = function (t) {
		t.preventDefault();
		r.call(n(this), "show")
	};
	n(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery); + function (n) {
	"use strict";

	function i(i) {
		return this.each(function () {
			var u = n(this),
				r = u.data("bs.affix"),
				f = "object" == typeof i && i;
			r || u.data("bs.affix", r = new t(this, f));
			"string" == typeof i && r[i]()
		})
	}
	var t = function (i, r) {
			this.options = n.extend({}, t.DEFAULTS, r);
			this.$target = n(this.options.target).on("scroll.bs.affix.data-api", n.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", n.proxy(this.checkPositionWithEventLoop, this));
			this.$element = n(i);
			this.affixed = null;
			this.unpin = null;
			this.pinnedOffset = null;
			this.checkPosition()
		},
		r;
	t.VERSION = "3.3.7";
	t.RESET = "affix affix-top affix-bottom";
	t.DEFAULTS = {
		offset: 0,
		target: window
	};
	t.prototype.getState = function (n, t, i, r) {
		var u = this.$target.scrollTop(),
			f = this.$element.offset(),
			e = this.$target.height();
		if (null != i && "top" == this.affixed) return u < i && "top";
		if ("bottom" == this.affixed) return null != i ? !(u + this.unpin <= f.top) && "bottom" : !(u + e <= n - r) && "bottom";
		var o = null == this.affixed,
			s = o ? u : f.top,
			h = o ? e : t;
		return null != i && u <= i ? "top" : null != r && s + h >= n - r && "bottom"
	};
	t.prototype.getPinnedOffset = function () {
		if (this.pinnedOffset) return this.pinnedOffset;
		this.$element.removeClass(t.RESET).addClass("affix");
		var n = this.$target.scrollTop(),
			i = this.$element.offset();
		return this.pinnedOffset = i.top - n
	};
	t.prototype.checkPositionWithEventLoop = function () {
		setTimeout(n.proxy(this.checkPosition, this), 1)
	};
	t.prototype.checkPosition = function () {
		var i, e, o;
		if (this.$element.is(":visible")) {
			var s = this.$element.height(),
				r = this.options.offset,
				f = r.top,
				u = r.bottom,
				h = Math.max(n(document).height(), n(document.body).height());
			if ("object" != typeof r && (u = f = r), "function" == typeof f && (f = r.top(this.$element)), "function" == typeof u && (u = r.bottom(this.$element)), i = this.getState(h, s, f, u), this.affixed != i) {
				if (null != this.unpin && this.$element.css("top", ""), e = "affix" + (i ? "-" + i : ""), o = n.Event(e + ".bs.affix"), this.$element.trigger(o), o.isDefaultPrevented()) return;
				this.affixed = i;
				this.unpin = "bottom" == i ? this.getPinnedOffset() : null;
				this.$element.removeClass(t.RESET).addClass(e).trigger(e.replace("affix", "affixed") + ".bs.affix")
			}
			"bottom" == i && this.$element.offset({
				top: h - s - u
			})
		}
	};
	r = n.fn.affix;
	n.fn.affix = i;
	n.fn.affix.Constructor = t;
	n.fn.affix.noConflict = function () {
		return n.fn.affix = r, this
	};
	n(window).on("load", function () {
		n('[data-spy="affix"]').each(function () {
			var r = n(this),
				t = r.data();
			t.offset = t.offset || {};
			null != t.offsetBottom && (t.offset.bottom = t.offsetBottom);
			null != t.offsetTop && (t.offset.top = t.offsetTop);
			i.call(r, t)
		})
	})
}(jQuery);
! function (n) {
	"use strict";
	n.matchMedia = n.matchMedia || function (n) {
		var u, i = n.documentElement,
			f = i.firstElementChild || i.firstChild,
			r = n.createElement("body"),
			t = n.createElement("div");
		return t.id = "mq-test-1", t.style.cssText = "position:absolute;top:-100em", r.style.background = "none", r.appendChild(t),
			function (n) {
				return t.innerHTML = '&shy;<style media="' + n + '"> #mq-test-1 { width: 42px; }<\/style>', i.insertBefore(r, f), u = 42 === t.offsetWidth, i.removeChild(r), {
					matches: u,
					media: n
				}
			}
	}(n.document)
}(this),
function (n) {
	"use strict";

	function p() {
		y(!0)
	}
	var t = {};
	n.respond = t;
	t.update = function () {};
	var f = [],
		tt = function () {
			var t = !1;
			try {
				t = new n.XMLHttpRequest
			} catch (i) {
				t = new n.ActiveXObject("Microsoft.XMLHTTP")
			}
			return function () {
				return t
			}
		}(),
		w = function (n, t) {
			var i = tt();
			i && (i.open("GET", n, !0), i.onreadystatechange = function () {
				4 !== i.readyState || 200 !== i.status && 304 !== i.status || t(i.responseText)
			}, 4 !== i.readyState && i.send(null))
		};
	if (t.ajax = w, t.queue = f, t.regex = {
			media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
			keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
			urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
			findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
			only: /(only\s+)?([a-zA-Z]+)\s?/,
			minw: /\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,
			maxw: /\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/
		}, t.mediaQueriesSupported = n.matchMedia && null !== n.matchMedia("only all") && n.matchMedia("only all").matches, !t.mediaQueriesSupported) {
		var c, b, l, i = n.document,
			r = i.documentElement,
			e = [],
			o = [],
			u = [],
			a = {},
			k = 30,
			s = i.getElementsByTagName("head")[0] || r,
			it = i.getElementsByTagName("base")[0],
			h = s.getElementsByTagName("link"),
			v = function () {
				var u, t = i.createElement("div"),
					n = i.body,
					o = r.style.fontSize,
					e = n && n.style.fontSize,
					f = !1;
				return t.style.cssText = "position:absolute;font-size:1em;width:1em", n || (n = f = i.createElement("body"), n.style.background = "none"), r.style.fontSize = "100%", n.style.fontSize = "100%", n.appendChild(t), f && r.insertBefore(n, r.firstChild), u = t.offsetWidth, f ? r.removeChild(n) : n.removeChild(t), r.style.fontSize = o, e && (n.style.fontSize = e), u = l = parseFloat(u)
			},
			y = function (t) {
				var rt = "clientWidth",
					ut = r[rt],
					ft = "CSS1Compat" === i.compatMode && ut || i.body[rt] || ut,
					p = {},
					ct = h[h.length - 1],
					et = (new Date).getTime(),
					tt, g, nt, f, it;
				if (t && c && k > et - c) return n.clearTimeout(b), b = n.setTimeout(y, k), void 0;
				c = et;
				for (tt in e)
					if (e.hasOwnProperty(tt)) {
						var a = e[tt],
							w = a.minw,
							d = a.maxw,
							ot = null === w,
							st = null === d,
							ht = "em";
						w && (w = parseFloat(w) * (w.indexOf(ht) > -1 ? l || v() : 1));
						d && (d = parseFloat(d) * (d.indexOf(ht) > -1 ? l || v() : 1));
						a.hasquery && (ot && st || !(ot || ft >= w) || !(st || d >= ft)) || (p[a.media] || (p[a.media] = []), p[a.media].push(o[a.rules]))
					}
				for (g in u) u.hasOwnProperty(g) && u[g] && u[g].parentNode === s && s.removeChild(u[g]);
				u.length = 0;
				for (nt in p) p.hasOwnProperty(nt) && (f = i.createElement("style"), it = p[nt].join("\n"), f.type = "text/css", f.media = nt, s.insertBefore(f, ct.nextSibling), f.styleSheet ? f.styleSheet.cssText = it : f.appendChild(i.createTextNode(it)), u.push(f))
			},
			d = function (n, i, r) {
				var h = n.replace(t.regex.keyframes, "").match(t.regex.media),
					c = h && h.length || 0,
					l, a, f, v, u, p, w, s;
				for (i = i.substring(0, i.lastIndexOf("/")), l = function (n) {
						return n.replace(t.regex.urls, "$1" + i + "$2$3")
					}, a = !c && r, i.length && (i += "/"), a && (c = 1), f = 0; c > f; f++)
					for (a ? (v = r, o.push(l(n))) : (v = h[f].match(t.regex.findStyles) && RegExp.$1, o.push(RegExp.$2 && l(RegExp.$2))), p = v.split(","), w = p.length, s = 0; w > s; s++) u = p[s], e.push({
						media: u.split("(")[0].match(t.regex.only) && RegExp.$2 || "all",
						rules: o.length - 1,
						hasquery: u.indexOf("(") > -1,
						minw: u.match(t.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
						maxw: u.match(t.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
					});
				y()
			},
			g = function () {
				if (f.length) {
					var t = f.shift();
					w(t.href, function (i) {
						d(i, t.href, t.media);
						a[t.href] = !0;
						n.setTimeout(function () {
							g()
						}, 0)
					})
				}
			},
			nt = function () {
				for (var r = 0; r < h.length; r++) {
					var i = h[r],
						t = i.href,
						u = i.media,
						e = i.rel && "stylesheet" === i.rel.toLowerCase();
					t && e && !a[t] && (i.styleSheet && i.styleSheet.rawCssText ? (d(i.styleSheet.rawCssText, t, u), a[t] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(t) && !it || t.replace(RegExp.$1, "").split("/")[0] === n.location.host) && ("//" === t.substring(0, 2) && (t = n.location.protocol + t), f.push({
						href: t,
						media: u
					})))
				}
				g()
			};
		nt();
		t.update = nt;
		t.getEmValue = v;
		n.addEventListener ? n.addEventListener("resize", p, !1) : n.attachEvent && n.attachEvent("onresize", p)
	}
}(this);
! function (n) {
	"function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof exports ? module.exports = n(require("jquery")) : n(jQuery)
}(function (n) {
	function t(t) {
		this.$element = n(t);
		this.$main = this.$element.closest(".dropdown, .dropup, .btn-group");
		this.$menu = this.$element.parent();
		this.$drop = this.$menu.parent().parent();
		this.$menus = this.$menu.siblings(".dropdown-submenu");
		var r = this.$menu.find("> .dropdown-menu > " + i);
		this.$submenus = r.filter(".dropdown-submenu");
		this.$items = r.not(".dropdown-submenu");
		this.init()
	}
	var i = ":not(.disabled, .divider, .dropdown-header)";
	return t.prototype = {
		init: function () {
			this.$element.on("click.bs.dropdown", this.click.bind(this));
			this.$element.keydown(this.keydown.bind(this));
			this.$menu.on("hide.bs.submenu", this.hide.bind(this));
			this.$items.keydown(this.item_keydown.bind(this));
			this.$menu.nextAll(i + ":first:not(.dropdown-submenu)").children("a").keydown(this.next_keydown.bind(this))
		},
		click: function (n) {
			n.stopPropagation();
			this.toggle()
		},
		toggle: function () {
			this.$menu.hasClass("open") ? this.close() : (this.$menu.addClass("open"), this.$menus.trigger("hide.bs.submenu"))
		},
		hide: function (n) {
			n.stopPropagation();
			this.close()
		},
		close: function () {
			this.$menu.removeClass("open");
			this.$submenus.trigger("hide.bs.submenu")
		},
		keydown: function (n) {
			if (/^(32|38|40)$/.test(n.keyCode) && n.preventDefault(), /^(13|32)$/.test(n.keyCode)) this.toggle();
			else if (/^(27|38|40)$/.test(n.keyCode))
				if (n.stopPropagation(), 27 == n.keyCode) this.$menu.hasClass("open") ? this.close() : (this.$menus.trigger("hide.bs.submenu"), this.$drop.removeClass("open").children("a").focus());
				else {
					var i = this.$main.find("li:not(.disabled):visible > a"),
						t = i.index(n.target);
					if (38 == n.keyCode && 0 !== t) t--;
					else {
						if (40 != n.keyCode || t === i.length - 1) return;
						t++
					}
					i.eq(t).focus()
				}
		},
		item_keydown: function (n) {
			27 == n.keyCode && (n.stopPropagation(), this.close(), this.$element.focus())
		},
		next_keydown: function (n) {
			if (38 == n.keyCode) {
				n.preventDefault();
				n.stopPropagation();
				var t = this.$drop.find("li:not(.disabled):visible > a"),
					i = t.index(n.target);
				t.eq(i - 1).focus()
			}
		}
	}, n.fn.submenupicker = function (i) {
		var r = this instanceof n ? this : n(i);
		return r.each(function () {
			var i = n.data(this, "bs.submenu");
			i || (i = new t(this), n.data(this, "bs.submenu", i))
		})
	}
});
! function (n) {
	"function" == typeof define && define.amd ? define(["jquery"], n) : n("object" == typeof exports ? require("jquery") : jQuery)
}(function (n, t) {
	function u() {
		return new Date(Date.UTC.apply(Date, arguments))
	}

	function h() {
		var n = new Date;
		return u(n.getFullYear(), n.getMonth(), n.getDate())
	}

	function y(n, t) {
		return n.getUTCFullYear() === t.getUTCFullYear() && n.getUTCMonth() === t.getUTCMonth() && n.getUTCDate() === t.getUTCDate()
	}

	function c(n) {
		return function () {
			return this[n].apply(this, arguments)
		}
	}

	function p(n) {
		return n && !isNaN(n.getTime())
	}

	function w(t, i) {
		function o(n, t) {
			return t.toLowerCase()
		}
		var u, f = n(t).data(),
			e = {},
			s = new RegExp("^" + i.toLowerCase() + "([A-Z])"),
			r;
		i = new RegExp("^" + i.toLowerCase());
		for (r in f) i.test(r) && (u = r.replace(s, o), e[u] = f[r]);
		return e
	}

	function b(t) {
		var u = {},
			i;
		if (r[t] || (t = t.split("-")[0], r[t])) return i = r[t], n.each(v, function (n, t) {
			t in i && (u[t] = i[t])
		}), u
	}
	var l = function () {
			var t = {
				get: function (n) {
					return this.slice(n)[0]
				},
				contains: function (n) {
					for (var i = n && n.valueOf(), t = 0, r = this.length; r > t; t++)
						if (this[t].valueOf() === i) return t;
					return -1
				},
				remove: function (n) {
					this.splice(n, 1)
				},
				replace: function (t) {
					t && (n.isArray(t) || (t = [t]), this.clear(), this.push.apply(this, t))
				},
				clear: function () {
					this.length = 0
				},
				copy: function () {
					var n = new l;
					return n.replace(this), n
				}
			};
			return function () {
				var i = [];
				return i.push.apply(i, arguments), n.extend(i, t), i
			}
		}(),
		f = function (t, r) {
			n(t).data("datepicker", this);
			this._process_options(r);
			this.dates = new l;
			this.viewDate = this.o.defaultViewDate;
			this.focusDate = null;
			this.element = n(t);
			this.isInput = this.element.is("input");
			this.inputField = this.isInput ? this.element : this.element.find("input");
			this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1;
			this.hasInput = this.component && this.inputField.length;
			this.component && 0 === this.component.length && (this.component = !1);
			this.isInline = !this.component && this.element.is("div");
			this.picker = n(i.template);
			this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow);
			this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow);
			this._buildEvents();
			this._attachEvents();
			this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu");
			this.o.rtl && this.picker.addClass("datepicker-rtl");
			this.viewMode = this.o.startView;
			this.o.calendarWeeks && this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function (n, t) {
				return parseInt(t) + 1
			});
			this._allow_update = !1;
			this.setStartDate(this._o.startDate);
			this.setEndDate(this._o.endDate);
			this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
			this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);
			this.setDatesDisabled(this.o.datesDisabled);
			this.fillDow();
			this.fillMonths();
			this._allow_update = !0;
			this.update();
			this.showMode();
			this.isInline && this.show()
		},
		o, a, e, s, v, r, i;
	f.prototype = {
		constructor: f,
		_resolveViewName: function (n, i) {
			return 0 === n || "days" === n || "month" === n ? 0 : 1 === n || "months" === n || "year" === n ? 1 : 2 === n || "years" === n || "decade" === n ? 2 : 3 === n || "decades" === n || "century" === n ? 3 : 4 === n || "centuries" === n || "millennium" === n ? 4 : i === t ? !1 : i
		},
		_check_template: function (i) {
			try {
				if (i === t || "" === i) return !1;
				if ((i.match(/[<>]/g) || []).length <= 0) return !0;
				var r = n(i);
				return r.length > 0
			} catch (u) {
				return !1
			}
		},
		_process_options: function (t) {
			var f, o, l, e, c;
			if (this._o = n.extend({}, this._o, t), f = this.o = n.extend({}, this._o), o = f.language, r[o] || (o = o.split("-")[0], r[o] || (o = s.language)), f.language = o, f.startView = this._resolveViewName(f.startView, 0), f.minViewMode = this._resolveViewName(f.minViewMode, 0), f.maxViewMode = this._resolveViewName(f.maxViewMode, 4), f.startView = Math.min(f.startView, f.maxViewMode), f.startView = Math.max(f.startView, f.minViewMode), f.multidate !== !0 && (f.multidate = Number(f.multidate) || !1, f.multidate !== !1 && (f.multidate = Math.max(0, f.multidate))), f.multidateSeparator = String(f.multidateSeparator), f.weekStart %= 7, f.weekEnd = (f.weekStart + 6) % 7, l = i.parseFormat(f.format), f.startDate !== -(1 / 0) && (f.startDate = f.startDate ? f.startDate instanceof Date ? this._local_to_utc(this._zero_time(f.startDate)) : i.parseDate(f.startDate, l, f.language, f.assumeNearbyYear) : -(1 / 0)), f.endDate !== 1 / 0 && (f.endDate = f.endDate ? f.endDate instanceof Date ? this._local_to_utc(this._zero_time(f.endDate)) : i.parseDate(f.endDate, l, f.language, f.assumeNearbyYear) : 1 / 0), f.daysOfWeekDisabled = f.daysOfWeekDisabled || [], n.isArray(f.daysOfWeekDisabled) || (f.daysOfWeekDisabled = f.daysOfWeekDisabled.split(/[,\s]*/)), f.daysOfWeekDisabled = n.map(f.daysOfWeekDisabled, function (n) {
					return parseInt(n, 10)
				}), f.daysOfWeekHighlighted = f.daysOfWeekHighlighted || [], n.isArray(f.daysOfWeekHighlighted) || (f.daysOfWeekHighlighted = f.daysOfWeekHighlighted.split(/[,\s]*/)), f.daysOfWeekHighlighted = n.map(f.daysOfWeekHighlighted, function (n) {
					return parseInt(n, 10)
				}), f.datesDisabled = f.datesDisabled || [], n.isArray(f.datesDisabled) || (f.datesDisabled = [f.datesDisabled]), f.datesDisabled = n.map(f.datesDisabled, function (n) {
					return i.parseDate(n, l, f.language, f.assumeNearbyYear)
				}), e = String(f.orientation).toLowerCase().split(/\s+/g), c = f.orientation.toLowerCase(), e = n.grep(e, function (n) {
					return /^auto|left|right|top|bottom$/.test(n)
				}), f.orientation = {
					x: "auto",
					y: "auto"
				}, c && "auto" !== c)
				if (1 === e.length) switch (e[0]) {
					case "top":
					case "bottom":
						f.orientation.y = e[0];
						break;
					case "left":
					case "right":
						f.orientation.x = e[0]
				} else c = n.grep(e, function (n) {
					return /^left|right$/.test(n)
				}), f.orientation.x = c[0] || "auto", c = n.grep(e, function (n) {
					return /^top|bottom$/.test(n)
				}), f.orientation.y = c[0] || "auto";
			if (f.defaultViewDate) {
				var a = f.defaultViewDate.year || (new Date).getFullYear(),
					v = f.defaultViewDate.month || 0,
					y = f.defaultViewDate.day || 1;
				f.defaultViewDate = u(a, v, y)
			} else f.defaultViewDate = h()
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function (n) {
			for (var f, r, u, i = 0; i < n.length; i++) f = n[i][0], 2 === n[i].length ? (r = t, u = n[i][1]) : 3 === n[i].length && (r = n[i][1], u = n[i][2]), f.on(u, r)
		},
		_unapplyEvents: function (n) {
			for (var f, r, u, i = 0; i < n.length; i++) f = n[i][0], 2 === n[i].length ? (u = t, r = n[i][1]) : 3 === n[i].length && (u = n[i][1], r = n[i][2]), f.off(r, u)
		},
		_buildEvents: function () {
			var t = {
				keyup: n.proxy(function (t) {
					-1 === n.inArray(t.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
				}, this),
				keydown: n.proxy(this.keydown, this),
				paste: n.proxy(this.paste, this)
			};
			this.o.showOnFocus === !0 && (t.focus = n.proxy(this.show, this));
			this._events = this.isInput ? [
				[this.element, t]
			] : this.component && this.hasInput ? [
				[this.inputField, t],
				[this.component, {
					click: n.proxy(this.show, this)
				}]
			] : [
				[this.element, {
					click: n.proxy(this.show, this),
					keydown: n.proxy(this.keydown, this)
				}]
			];
			this._events.push([this.element, "*", {
				blur: n.proxy(function (n) {
					this._focused_from = n.target
				}, this)
			}], [this.element, {
				blur: n.proxy(function (n) {
					this._focused_from = n.target
				}, this)
			}]);
			this.o.immediateUpdates && this._events.push([this.element, {
				"changeYear changeMonth": n.proxy(function (n) {
					this.update(n.date)
				}, this)
			}]);
			this._secondaryEvents = [
				[this.picker, {
					click: n.proxy(this.click, this)
				}],
				[n(window), {
					resize: n.proxy(this.place, this)
				}],
				[n(document), {
					mousedown: n.proxy(function (n) {
						this.element.is(n.target) || this.element.find(n.target).length || this.picker.is(n.target) || this.picker.find(n.target).length || this.isInline || this.hide()
					}, this)
				}]
			]
		},
		_attachEvents: function () {
			this._detachEvents();
			this._applyEvents(this._events)
		},
		_detachEvents: function () {
			this._unapplyEvents(this._events)
		},
		_attachSecondaryEvents: function () {
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents)
		},
		_detachSecondaryEvents: function () {
			this._unapplyEvents(this._secondaryEvents)
		},
		_trigger: function (t, r) {
			var u = r || this.dates.get(-1),
				f = this._utc_to_local(u);
			this.element.trigger({
				type: t,
				date: f,
				dates: n.map(this.dates, this._utc_to_local),
				format: n.proxy(function (n, t) {
					0 === arguments.length ? (n = this.dates.length - 1, t = this.o.format) : "string" == typeof n && (t = n, n = this.dates.length - 1);
					t = t || this.o.format;
					var r = this.dates.get(n);
					return i.formatDate(r, t, this.o.language)
				}, this)
			})
		},
		show: function () {
			if (!this.inputField.prop("disabled") && (!this.inputField.prop("readonly") || this.o.enableOnReadonly !== !1)) return (this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && n(this.element).blur(), this)
		},
		hide: function () {
			return this.isInline || !this.picker.is(":visible") ? this : (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && this.inputField.val() && this.setValue(), this._trigger("hide"), this)
		},
		destroy: function () {
			return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this
		},
		paste: function (t) {
			var i;
			if (t.originalEvent.clipboardData && t.originalEvent.clipboardData.types && -1 !== n.inArray("text/plain", t.originalEvent.clipboardData.types)) i = t.originalEvent.clipboardData.getData("text/plain");
			else {
				if (!window.clipboardData) return;
				i = window.clipboardData.getData("Text")
			}
			this.setDate(i);
			this.update();
			t.preventDefault()
		},
		_utc_to_local: function (n) {
			return n && new Date(n.getTime() + 6e4 * n.getTimezoneOffset())
		},
		_local_to_utc: function (n) {
			return n && new Date(n.getTime() - 6e4 * n.getTimezoneOffset())
		},
		_zero_time: function (n) {
			return n && new Date(n.getFullYear(), n.getMonth(), n.getDate())
		},
		_zero_utc_time: function (n) {
			return n && new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()))
		},
		getDates: function () {
			return n.map(this.dates, this._utc_to_local)
		},
		getUTCDates: function () {
			return n.map(this.dates, function (n) {
				return new Date(n)
			})
		},
		getDate: function () {
			return this._utc_to_local(this.getUTCDate())
		},
		getUTCDate: function () {
			var n = this.dates.get(-1);
			return "undefined" != typeof n ? new Date(n) : null
		},
		clearDates: function () {
			this.inputField && this.inputField.val("");
			this.update();
			this._trigger("changeDate");
			this.o.autoclose && this.hide()
		},
		setDates: function () {
			var t = n.isArray(arguments[0]) ? arguments[0] : arguments;
			return this.update.apply(this, t), this._trigger("changeDate"), this.setValue(), this
		},
		setUTCDates: function () {
			var t = n.isArray(arguments[0]) ? arguments[0] : arguments;
			return this.update.apply(this, n.map(t, this._utc_to_local)), this._trigger("changeDate"), this.setValue(), this
		},
		setDate: c("setDates"),
		setUTCDate: c("setUTCDates"),
		remove: c("destroy"),
		setValue: function () {
			var n = this.getFormattedDate();
			return this.inputField.val(n), this
		},
		getFormattedDate: function (r) {
			r === t && (r = this.o.format);
			var u = this.o.language;
			return n.map(this.dates, function (n) {
				return i.formatDate(n, r, u)
			}).join(this.o.multidateSeparator)
		},
		getStartDate: function () {
			return this.o.startDate
		},
		setStartDate: function (n) {
			return this._process_options({
				startDate: n
			}), this.update(), this.updateNavArrows(), this
		},
		getEndDate: function () {
			return this.o.endDate
		},
		setEndDate: function (n) {
			return this._process_options({
				endDate: n
			}), this.update(), this.updateNavArrows(), this
		},
		setDaysOfWeekDisabled: function (n) {
			return this._process_options({
				daysOfWeekDisabled: n
			}), this.update(), this.updateNavArrows(), this
		},
		setDaysOfWeekHighlighted: function (n) {
			return this._process_options({
				daysOfWeekHighlighted: n
			}), this.update(), this
		},
		setDatesDisabled: function (n) {
			this._process_options({
				datesDisabled: n
			});
			this.update();
			this.updateNavArrows()
		},
		place: function () {
			var y, r, p;
			if (this.isInline) return this;
			var f = this.picker.outerWidth(),
				s = this.picker.outerHeight(),
				e = n(this.o.container),
				h = e.width(),
				c = "body" === this.o.container ? n(document).scrollTop() : e.scrollTop(),
				l = e.offset(),
				a = [];
			this.element.parents().each(function () {
				var t = n(this).css("z-index");
				"auto" !== t && 0 !== t && a.push(parseInt(t))
			});
			var v = Math.max.apply(Math, a) + this.o.zIndexOffset,
				u = this.component ? this.component.parent().offset() : this.element.offset(),
				w = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
				o = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
				t = u.left - l.left,
				i = u.top - l.top;
			return "body" !== this.o.container && (i += c), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (t -= f - o)) : u.left < 0 ? (this.picker.addClass("datepicker-orient-left"), t -= u.left - 10) : t + f > h ? (this.picker.addClass("datepicker-orient-right"), t += o - f) : this.picker.addClass("datepicker-orient-left"), r = this.o.orientation.y, ("auto" === r && (y = -c + i - s, r = 0 > y ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + r), "top" === r ? i -= s + parseInt(this.picker.css("padding-top")) : i += w, this.o.rtl) ? (p = h - (t + o), this.picker.css({
				top: i,
				right: p,
				zIndex: v
			})) : this.picker.css({
				top: i,
				left: t,
				zIndex: v
			}), this
		},
		_allow_update: !0,
		update: function () {
			if (!this._allow_update) return this;
			var r = this.dates.copy(),
				t = [],
				u = !1;
			return arguments.length ? (n.each(arguments, n.proxy(function (n, i) {
				i instanceof Date && (i = this._local_to_utc(i));
				t.push(i)
			}, this)), u = !0) : (t = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val(), t = t && this.o.multidate ? t.split(this.o.multidateSeparator) : [t], delete this.element.data().date), t = n.map(t, n.proxy(function (n) {
				return i.parseDate(n, this.o.format, this.o.language, this.o.assumeNearbyYear)
			}, this)), t = n.grep(t, n.proxy(function (n) {
				return !this.dateWithinRange(n) || !n
			}, this), !0), this.dates.replace(t), this.viewDate = this.dates.length ? new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? new Date(this.o.startDate) : this.viewDate > this.o.endDate ? new Date(this.o.endDate) : this.o.defaultViewDate, u ? this.setValue() : t.length && String(r) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && r.length && this._trigger("clearDate"), this.fill(), this.element.change(), this
		},
		fillDow: function () {
			var i = this.o.weekStart,
				t = "<tr>";
			for (this.o.calendarWeeks && (this.picker.find(".datepicker-days .datepicker-switch").attr("colspan", function (n, t) {
					return parseInt(t) + 1
				}), t += '<th class="cw">&#160;<\/th>'); i < this.o.weekStart + 7;) t += '<th class="dow', n.inArray(i, this.o.daysOfWeekDisabled) > -1 && (t += " disabled"), t += '">' + r[this.o.language].daysMin[i++ % 7] + "<\/th>";
			t += "<\/tr>";
			this.picker.find(".datepicker-days thead").append(t)
		},
		fillMonths: function () {
			for (var u, t = this._utc_to_local(this.viewDate), i = "", n = 0; 12 > n;) u = t && t.getMonth() === n ? " focused" : "", i += '<span class="month' + u + '">' + r[this.o.language].monthsShort[n++] + "<\/span>";
			this.picker.find(".datepicker-months td").html(i)
		},
		setRange: function (t) {
			t && t.length ? this.range = n.map(t, function (n) {
				return n.valueOf()
			}) : delete this.range;
			this.fill()
		},
		getClassNames: function (t) {
			var i = [],
				r = this.viewDate.getUTCFullYear(),
				f = this.viewDate.getUTCMonth(),
				u = new Date;
			return t.getUTCFullYear() < r || t.getUTCFullYear() === r && t.getUTCMonth() < f ? i.push("old") : (t.getUTCFullYear() > r || t.getUTCFullYear() === r && t.getUTCMonth() > f) && i.push("new"), this.focusDate && t.valueOf() === this.focusDate.valueOf() && i.push("focused"), this.o.todayHighlight && t.getUTCFullYear() === u.getFullYear() && t.getUTCMonth() === u.getMonth() && t.getUTCDate() === u.getDate() && i.push("today"), -1 !== this.dates.contains(t) && i.push("active"), this.dateWithinRange(t) || i.push("disabled"), this.dateIsDisabled(t) && i.push("disabled", "disabled-date"), -1 !== n.inArray(t.getUTCDay(), this.o.daysOfWeekHighlighted) && i.push("highlighted"), this.range && (t > this.range[0] && t < this.range[this.range.length - 1] && i.push("range"), -1 !== n.inArray(t.valueOf(), this.range) && i.push("selected"), t.valueOf() === this.range[0] && i.push("range-start"), t.valueOf() === this.range[this.range.length - 1] && i.push("range-end")), i
		},
		_fill_yearsView: function (i, r, u, f, e, o, s, h) {
			var w, b, y, k, d, g, a, v, l, p, c;
			for (w = "", b = this.picker.find(i), y = parseInt(e / u, 10) * u, d = parseInt(o / f, 10) * f, g = parseInt(s / f, 10) * f, k = n.map(this.dates, function (n) {
					return parseInt(n.getUTCFullYear() / f, 10) * f
				}), b.find(".datepicker-switch").text(y + "-" + (y + 9 * f)), a = y - f, v = -1; 11 > v; v += 1) l = [r], p = null, -1 === v ? l.push("old") : 10 === v && l.push("new"), -1 !== n.inArray(a, k) && l.push("active"), (d > a || a > g) && l.push("disabled"), a === this.viewDate.getFullYear() && l.push("focused"), h !== n.noop && (c = h(new Date(a, 0, 1)), c === t ? c = {} : "boolean" == typeof c ? c = {
				enabled: c
			} : "string" == typeof c && (c = {
				classes: c
			}), c.enabled === !1 && l.push("disabled"), c.classes && (l = l.concat(c.classes.split(/\s+/))), c.tooltip && (p = c.tooltip)), w += '<span class="' + l.join(" ") + '"' + (p ? ' title="' + p + '"' : "") + ">" + a + "<\/span>", a += f;
			b.find("td").html(w)
		},
		fill: function () {
			var y, e, p = new Date(this.viewDate),
				o = p.getUTCFullYear(),
				k = p.getUTCMonth(),
				a = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0),
				it = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0),
				v = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
				rt = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
				ut = r[this.o.language].today || r.en.today || "",
				ft = r[this.o.language].clear || r.en.clear || "",
				et = r[this.o.language].titleFormat || r.en.titleFormat,
				f, w, h, s, c, nt, l, tt;
			if (!isNaN(o) && !isNaN(k)) {
				for (this.picker.find(".datepicker-days .datepicker-switch").text(i.formatDate(p, et, this.o.language)), this.picker.find("tfoot .today").text(ut).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot .clear").text(ft).toggle(this.o.clearBtn !== !1), this.picker.find("thead .datepicker-title").text(this.o.title).toggle("" !== this.o.title), this.updateNavArrows(), this.fillMonths(), f = u(o, k - 1, 28), w = i.getDaysInMonth(f.getUTCFullYear(), f.getUTCMonth()), f.setUTCDate(w), f.setUTCDate(w - (f.getUTCDay() - this.o.weekStart + 7) % 7), h = new Date(f), f.getUTCFullYear() < 100 && h.setUTCFullYear(f.getUTCFullYear()), h.setUTCDate(h.getUTCDate() + 42), h = h.valueOf(), c = []; f.valueOf() < h;) {
					if (f.getUTCDay() === this.o.weekStart && (c.push("<tr>"), this.o.calendarWeeks)) {
						var d = new Date(+f + (this.o.weekStart - f.getUTCDay() - 7) % 7 * 864e5),
							g = new Date(Number(d) + (11 - d.getUTCDay()) % 7 * 864e5),
							b = new Date(Number(b = u(g.getUTCFullYear(), 0, 1)) + (11 - b.getUTCDay()) % 7 * 864e5),
							ot = (g - b) / 6048e5 + 1;
						c.push('<td class="cw">' + ot + "<\/td>")
					}
					s = this.getClassNames(f);
					s.push("day");
					this.o.beforeShowDay !== n.noop && (e = this.o.beforeShowDay(this._utc_to_local(f)), e === t ? e = {} : "boolean" == typeof e ? e = {
						enabled: e
					} : "string" == typeof e && (e = {
						classes: e
					}), e.enabled === !1 && s.push("disabled"), e.classes && (s = s.concat(e.classes.split(/\s+/))), e.tooltip && (y = e.tooltip));
					s = n.unique(s);
					c.push('<td class="' + s.join(" ") + '"' + (y ? ' title="' + y + '"' : "") + ">" + f.getUTCDate() + "<\/td>");
					y = null;
					f.getUTCDay() === this.o.weekEnd && c.push("<\/tr>");
					f.setUTCDate(f.getUTCDate() + 1)
				}
				this.picker.find(".datepicker-days tbody").empty().append(c.join(""));
				nt = r[this.o.language].monthsTitle || r.en.monthsTitle || "Months";
				l = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? nt : o).end().find("span").removeClass("active");
				(n.each(this.dates, function (n, t) {
					t.getUTCFullYear() === o && l.eq(t.getUTCMonth()).addClass("active")
				}), (a > o || o > v) && l.addClass("disabled"), o === a && l.slice(0, it).addClass("disabled"), o === v && l.slice(rt + 1).addClass("disabled"), this.o.beforeShowMonth !== n.noop) && (tt = this, n.each(l, function (i, r) {
					var f = new Date(o, i, 1),
						u = tt.o.beforeShowMonth(f);
					u === t ? u = {} : "boolean" == typeof u ? u = {
						enabled: u
					} : "string" == typeof u && (u = {
						classes: u
					});
					u.enabled !== !1 || n(r).hasClass("disabled") || n(r).addClass("disabled");
					u.classes && n(r).addClass(u.classes);
					u.tooltip && n(r).prop("title", u.tooltip)
				}));
				this._fill_yearsView(".datepicker-years", "year", 10, 1, o, a, v, this.o.beforeShowYear);
				this._fill_yearsView(".datepicker-decades", "decade", 100, 10, o, a, v, this.o.beforeShowDecade);
				this._fill_yearsView(".datepicker-centuries", "century", 1e3, 100, o, a, v, this.o.beforeShowCentury)
			}
		},
		updateNavArrows: function () {
			if (this._allow_update) {
				var t = new Date(this.viewDate),
					n = t.getUTCFullYear(),
					i = t.getUTCMonth();
				switch (this.viewMode) {
					case 0:
						this.o.startDate !== -(1 / 0) && n <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
							visibility: "hidden"
						}) : this.picker.find(".prev").css({
							visibility: "visible"
						});
						this.o.endDate !== 1 / 0 && n >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
							visibility: "hidden"
						}) : this.picker.find(".next").css({
							visibility: "visible"
						});
						break;
					case 1:
					case 2:
					case 3:
					case 4:
						this.o.startDate !== -(1 / 0) && n <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".prev").css({
							visibility: "hidden"
						}) : this.picker.find(".prev").css({
							visibility: "visible"
						});
						this.o.endDate !== 1 / 0 && n >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".next").css({
							visibility: "hidden"
						}) : this.picker.find(".next").css({
							visibility: "visible"
						})
				}
			}
		},
		click: function (t) {
			var r, c, o, e, f, s, l, a;
			t.preventDefault();
			t.stopPropagation();
			r = n(t.target);
			r.hasClass("datepicker-switch") && this.showMode(1);
			a = r.closest(".prev, .next");
			a.length > 0 && (c = i.modes[this.viewMode].navStep * (a.hasClass("prev") ? -1 : 1), 0 === this.viewMode ? (this.viewDate = this.moveMonth(this.viewDate, c), this._trigger("changeMonth", this.viewDate)) : (this.viewDate = this.moveYear(this.viewDate, c), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)), this.fill());
			r.hasClass("today") && !r.hasClass("day") && (this.showMode(-2), this._setDate(h(), "linked" === this.o.todayBtn ? null : "view"));
			r.hasClass("clear") && this.clearDates();
			r.hasClass("disabled") || (r.hasClass("day") && (o = parseInt(r.text(), 10) || 1, e = this.viewDate.getUTCFullYear(), f = this.viewDate.getUTCMonth(), r.hasClass("old") && (0 === f ? (f = 11, e -= 1, s = !0, l = !0) : (f -= 1, s = !0)), r.hasClass("new") && (11 === f ? (f = 0, e += 1, s = !0, l = !0) : (f += 1, s = !0)), this._setDate(u(e, f, o)), l && this._trigger("changeYear", this.viewDate), s && this._trigger("changeMonth", this.viewDate)), r.hasClass("month") && (this.viewDate.setUTCDate(1), o = 1, f = r.parent().find("span").index(r), e = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(f), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode ? (this._setDate(u(e, f, o)), this.showMode()) : this.showMode(-1), this.fill()), (r.hasClass("year") || r.hasClass("decade") || r.hasClass("century")) && (this.viewDate.setUTCDate(1), o = 1, f = 0, e = parseInt(r.text(), 10) || 0, this.viewDate.setUTCFullYear(e), r.hasClass("year") && (this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(u(e, f, o))), r.hasClass("decade") && (this._trigger("changeDecade", this.viewDate), 3 === this.o.minViewMode && this._setDate(u(e, f, o))), r.hasClass("century") && (this._trigger("changeCentury", this.viewDate), 4 === this.o.minViewMode && this._setDate(u(e, f, o))), this.showMode(-1), this.fill()));
			this.picker.is(":visible") && this._focused_from && n(this._focused_from).focus();
			delete this._focused_from
		},
		_toggle_multidate: function (n) {
			var t = this.dates.contains(n);
			if (n || this.dates.clear(), -1 !== t ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(t) : this.o.multidate === !1 ? (this.dates.clear(), this.dates.push(n)) : this.dates.push(n), "number" == typeof this.o.multidate)
				for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
		},
		_setDate: function (n, t) {
			t && "date" !== t || this._toggle_multidate(n && new Date(n));
			t && "view" !== t || (this.viewDate = n && new Date(n));
			this.fill();
			this.setValue();
			t && "view" === t || this._trigger("changeDate");
			this.inputField && this.inputField.change();
			!this.o.autoclose || t && "date" !== t || this.hide()
		},
		moveDay: function (n, t) {
			var i = new Date(n);
			return i.setUTCDate(n.getUTCDate() + t), i
		},
		moveWeek: function (n, t) {
			return this.moveDay(n, 7 * t)
		},
		moveMonth: function (n, t) {
			var f;
			if (!p(n)) return this.o.defaultViewDate;
			if (!t) return n;
			var r, u, i = new Date(n.valueOf()),
				e = i.getUTCDate(),
				o = i.getUTCMonth(),
				s = Math.abs(t);
			if (t = t > 0 ? 1 : -1, 1 === s) u = -1 === t ? function () {
				return i.getUTCMonth() === o
			} : function () {
				return i.getUTCMonth() !== r
			}, r = o + t, i.setUTCMonth(r), (0 > r || r > 11) && (r = (r + 12) % 12);
			else {
				for (f = 0; s > f; f++) i = this.moveMonth(i, t);
				r = i.getUTCMonth();
				i.setUTCDate(e);
				u = function () {
					return r !== i.getUTCMonth()
				}
			}
			for (; u();) i.setUTCDate(--e), i.setUTCMonth(r);
			return i
		},
		moveYear: function (n, t) {
			return this.moveMonth(n, 12 * t)
		},
		moveAvailableDate: function (n, t, i) {
			do {
				if (n = this[i](n, t), !this.dateWithinRange(n)) return !1;
				i = "moveDay"
			} while (this.dateIsDisabled(n));
			return n
		},
		weekOfDateIsDisabled: function (t) {
			return -1 !== n.inArray(t.getUTCDay(), this.o.daysOfWeekDisabled)
		},
		dateIsDisabled: function (t) {
			return this.weekOfDateIsDisabled(t) || n.grep(this.o.datesDisabled, function (n) {
				return y(t, n)
			}).length > 0
		},
		dateWithinRange: function (n) {
			return n >= this.o.startDate && n <= this.o.endDate
		},
		keydown: function (n) {
			if (!this.picker.is(":visible")) return void((40 === n.keyCode || 27 === n.keyCode) && (this.show(), n.stopPropagation()));
			var t, i, u = !1,
				r = this.focusDate || this.viewDate;
			switch (n.keyCode) {
				case 27:
					this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide();
					n.preventDefault();
					n.stopPropagation();
					break;
				case 37:
				case 38:
				case 39:
				case 40:
					if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
					t = 37 === n.keyCode || 38 === n.keyCode ? -1 : 1;
					0 === this.viewMode ? n.ctrlKey ? (i = this.moveAvailableDate(r, t, "moveYear"), i && this._trigger("changeYear", this.viewDate)) : n.shiftKey ? (i = this.moveAvailableDate(r, t, "moveMonth"), i && this._trigger("changeMonth", this.viewDate)) : 37 === n.keyCode || 39 === n.keyCode ? i = this.moveAvailableDate(r, t, "moveDay") : this.weekOfDateIsDisabled(r) || (i = this.moveAvailableDate(r, t, "moveWeek")) : 1 === this.viewMode ? ((38 === n.keyCode || 40 === n.keyCode) && (t = 4 * t), i = this.moveAvailableDate(r, t, "moveMonth")) : 2 === this.viewMode && ((38 === n.keyCode || 40 === n.keyCode) && (t = 4 * t), i = this.moveAvailableDate(r, t, "moveYear"));
					i && (this.focusDate = this.viewDate = i, this.setValue(), this.fill(), n.preventDefault());
					break;
				case 13:
					if (!this.o.forceParse) break;
					r = this.focusDate || this.dates.get(-1) || this.viewDate;
					this.o.keyboardNavigation && (this._toggle_multidate(r), u = !0);
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					this.picker.is(":visible") && (n.preventDefault(), n.stopPropagation(), this.o.autoclose && this.hide());
					break;
				case 9:
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide()
			}
			u && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), this.inputField && this.inputField.change())
		},
		showMode: function (n) {
			n && (this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + n)));
			this.picker.children("div").hide().filter(".datepicker-" + i.modes[this.viewMode].clsName).show();
			this.updateNavArrows()
		}
	};
	o = function (t, i) {
		n(t).data("datepicker", this);
		this.element = n(t);
		this.inputs = n.map(i.inputs, function (n) {
			return n.jquery ? n[0] : n
		});
		delete i.inputs;
		e.call(n(this.inputs), i).on("changeDate", n.proxy(this.dateUpdated, this));
		this.pickers = n.map(this.inputs, function (t) {
			return n(t).data("datepicker")
		});
		this.updateDates()
	};
	o.prototype = {
		updateDates: function () {
			this.dates = n.map(this.pickers, function (n) {
				return n.getUTCDate()
			});
			this.updateRanges()
		},
		updateRanges: function () {
			var t = n.map(this.dates, function (n) {
				return n.valueOf()
			});
			n.each(this.pickers, function (n, i) {
				i.setRange(t)
			})
		},
		dateUpdated: function (t) {
			var f;
			if (!this.updating && (this.updating = !0, f = n(t.target).data("datepicker"), "undefined" != typeof f)) {
				var i = f.getUTCDate(),
					e = n.inArray(t.target, this.inputs),
					r = e - 1,
					u = e + 1,
					o = this.inputs.length;
				if (-1 !== e) {
					if (n.each(this.pickers, function (n, t) {
							t.getUTCDate() || t.setUTCDate(i)
						}), i < this.dates[r])
						for (; r >= 0 && i < this.dates[r];) this.pickers[r--].setUTCDate(i);
					else if (i > this.dates[u])
						for (; o > u && i > this.dates[u];) this.pickers[u++].setUTCDate(i);
					this.updateDates();
					delete this.updating
				}
			}
		},
		remove: function () {
			n.map(this.pickers, function (n) {
				n.remove()
			});
			delete this.element.data().datepicker
		}
	};
	a = n.fn.datepicker;
	e = function (i) {
		var u = Array.apply(null, arguments),
			r;
		if (u.shift(), this.each(function () {
				var h = n(this),
					t = h.data("datepicker"),
					c = "object" == typeof i && i;
				if (!t) {
					var l = w(this, "date"),
						a = n.extend({}, s, l, c),
						v = b(a.language),
						e = n.extend({}, s, v, l, c);
					h.hasClass("input-daterange") || e.inputs ? (n.extend(e, {
						inputs: e.inputs || h.find("input").toArray()
					}), t = new o(this, e)) : t = new f(this, e);
					h.data("datepicker", t)
				}
				"string" == typeof i && "function" == typeof t[i] && (r = t[i].apply(t, u))
			}), r === t || r instanceof f || r instanceof o) return this;
		if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + i + " function)");
		return r
	};
	n.fn.datepicker = e;
	s = n.fn.datepicker.defaults = {
		assumeNearbyYear: !1,
		autoclose: !1,
		beforeShowDay: n.noop,
		beforeShowMonth: n.noop,
		beforeShowYear: n.noop,
		beforeShowDecade: n.noop,
		beforeShowCentury: n.noop,
		calendarWeeks: !1,
		clearBtn: !1,
		toggleActive: !1,
		daysOfWeekDisabled: [],
		daysOfWeekHighlighted: [],
		datesDisabled: [],
		endDate: 1 / 0,
		forceParse: !0,
		format: "mm/dd/yyyy",
		keyboardNavigation: !0,
		language: "en",
		minViewMode: 0,
		maxViewMode: 4,
		multidate: !1,
		multidateSeparator: ",",
		orientation: "auto",
		rtl: !1,
		startDate: -(1 / 0),
		startView: 0,
		todayBtn: !1,
		todayHighlight: !1,
		weekStart: 0,
		disableTouchKeyboard: !1,
		enableOnReadonly: !0,
		showOnFocus: !0,
		zIndexOffset: 10,
		container: "body",
		immediateUpdates: !1,
		title: "",
		templates: {
			leftArrow: "&laquo;",
			rightArrow: "&raquo;"
		}
	};
	v = n.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
	n.fn.datepicker.Constructor = f;
	r = n.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear",
			titleFormat: "MM yyyy"
		}
	};
	i = {
		modes: [{
			clsName: "days",
			navFnc: "Month",
			navStep: 1
		}, {
			clsName: "months",
			navFnc: "FullYear",
			navStep: 1
		}, {
			clsName: "years",
			navFnc: "FullYear",
			navStep: 10
		}, {
			clsName: "decades",
			navFnc: "FullDecade",
			navStep: 100
		}, {
			clsName: "centuries",
			navFnc: "FullCentury",
			navStep: 1e3
		}],
		isLeapYear: function (n) {
			return n % 4 == 0 && n % 100 != 0 || n % 400 == 0
		},
		getDaysInMonth: function (n, t) {
			return [31, i.isLeapYear(n) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
		parseFormat: function (n) {
			if ("function" == typeof n.toValue && "function" == typeof n.toDisplay) return n;
			var t = n.replace(this.validParts, "\x00").split("\x00"),
				i = n.match(this.validParts);
			if (!t || !t.length || !i || 0 === i.length) throw new Error("Invalid date format.");
			return {
				separators: t,
				parts: i
			}
		},
		parseDate: function (e, o, s, c) {
			function rt(n, t) {
				return t === !0 && (t = 10), 100 > n && (n += 2e3, n > (new Date).getFullYear() + t && (n -= 100)), n
			}

			function ut() {
				var n = this.slice(0, a[l].length),
					t = a[l].slice(0, n.length);
				return n.toLowerCase() === t.toLowerCase()
			}
			var p, st, tt, b;
			if (!e) return t;
			if (e instanceof Date) return e;
			if ("string" == typeof o && (o = i.parseFormat(o)), o.toValue) return o.toValue(e, o, s);
			var v, k, l, d, ft = /([\-+]\d+)([dmwy])/,
				a = e.match(/([\-+]\d+)([dmwy])/g),
				et = {
					d: "moveDay",
					m: "moveMonth",
					w: "moveWeek",
					y: "moveYear"
				},
				ot = {
					yesterday: "-1d",
					today: "+0d",
					tomorrow: "+1d"
				};
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)) {
				for (e = new Date, l = 0; l < a.length; l++) v = ft.exec(a[l]), k = parseInt(v[1]), d = et[v[2]], e = f.prototype[d](e, k);
				return u(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())
			}
			if ("undefined" != typeof ot[e] && (e = ot[e], a = e.match(/([\-+]\d+)([dmwy])/g), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e))) {
				for (e = new Date, l = 0; l < a.length; l++) v = ft.exec(a[l]), k = parseInt(v[1]), d = et[v[2]], e = f.prototype[d](e, k);
				return u(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())
			}
			a = e && e.match(this.nonpunctuation) || [];
			e = new Date;
			var w, g, nt = {},
				it = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
				y = {
					yyyy: function (n, t) {
						return n.setUTCFullYear(c ? rt(t, c) : t)
					},
					yy: function (n, t) {
						return n.setUTCFullYear(c ? rt(t, c) : t)
					},
					m: function (n, t) {
						if (isNaN(n)) return n;
						for (t -= 1; 0 > t;) t += 12;
						for (t %= 12, n.setUTCMonth(t); n.getUTCMonth() !== t;) n.setUTCDate(n.getUTCDate() - 1);
						return n
					},
					d: function (n, t) {
						return n.setUTCDate(t)
					}
				};
			if (y.M = y.MM = y.mm = y.m, y.dd = y.d, e = h(), p = o.parts.slice(), a.length !== p.length && (p = n(p).filter(function (t, i) {
					return -1 !== n.inArray(i, it)
				}).toArray()), a.length === p.length) {
				for (l = 0, st = p.length; st > l; l++) {
					if (w = parseInt(a[l], 10), v = p[l], isNaN(w)) switch (v) {
						case "MM":
							g = n(r[s].months).filter(ut);
							w = n.inArray(g[0], r[s].months) + 1;
							break;
						case "M":
							g = n(r[s].monthsShort).filter(ut);
							w = n.inArray(g[0], r[s].monthsShort) + 1
					}
					nt[v] = w
				}
				for (l = 0; l < it.length; l++) b = it[l], b in nt && !isNaN(nt[b]) && (tt = new Date(e), y[b](tt, nt[b]), isNaN(tt) || (e = tt))
			}
			return e
		},
		formatDate: function (t, u, f) {
			var e;
			if (!t) return "";
			if ("string" == typeof u && (u = i.parseFormat(u)), u.toDisplay) return u.toDisplay(t, u, f);
			e = {
				d: t.getUTCDate(),
				D: r[f].daysShort[t.getUTCDay()],
				DD: r[f].days[t.getUTCDay()],
				m: t.getUTCMonth() + 1,
				M: r[f].monthsShort[t.getUTCMonth()],
				MM: r[f].months[t.getUTCMonth()],
				yy: t.getUTCFullYear().toString().substring(2),
				yyyy: t.getUTCFullYear()
			};
			e.dd = (e.d < 10 ? "0" : "") + e.d;
			e.mm = (e.m < 10 ? "0" : "") + e.m;
			t = [];
			for (var s = n.extend([], u.separators), o = 0, h = u.parts.length; h >= o; o++) s.length && t.push(s.shift()), t.push(e[u.parts[o]]);
			return t.join("")
		},
		headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"><\/th><\/tr><tr><th class="prev">&laquo;<\/th><th colspan="5" class="datepicker-switch"><\/th><th class="next">&raquo;<\/th><\/tr><\/thead>',
		contTemplate: '<tbody><tr><td colspan="7"><\/td><\/tr><\/tbody>',
		footTemplate: '<tfoot><tr><th colspan="7" class="today"><\/th><\/tr><tr><th colspan="7" class="clear"><\/th><\/tr><\/tfoot>'
	};
	i.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + i.headTemplate + "<tbody><\/tbody>" + i.footTemplate + '<\/table><\/div><div class="datepicker-months"><table class="table-condensed">' + i.headTemplate + i.contTemplate + i.footTemplate + '<\/table><\/div><div class="datepicker-years"><table class="table-condensed">' + i.headTemplate + i.contTemplate + i.footTemplate + '<\/table><\/div><div class="datepicker-decades"><table class="table-condensed">' + i.headTemplate + i.contTemplate + i.footTemplate + '<\/table><\/div><div class="datepicker-centuries"><table class="table-condensed">' + i.headTemplate + i.contTemplate + i.footTemplate + "<\/table><\/div><\/div>";
	n.fn.datepicker.DPGlobal = i;
	n.fn.datepicker.noConflict = function () {
		return n.fn.datepicker = a, this
	};
	n.fn.datepicker.version = "1.6.1";
	n(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (t) {
		var i = n(this);
		i.data("datepicker") || (t.preventDefault(), e.call(i, "show"))
	});
	n(function () {
		e.call(n('[data-provide="datepicker-inline"]'))
	})
});
runBetslipScript = function () {
	var n = !0;
	$("#potentialWager").on("focus", function () {
		n && ($("#potentialWager").val(""), $("#WagerAmount").val(""), n = !1)
	});
	$("#PotentialReturnAmount").val() === undefined || $("#PotentialReturnAmount").val().indexOf(" ") < 0 && $("#PotentialReturnAmount").val() !== "?" && $("#PotentialReturnAmount").val(parseFloat($("#PotentialReturnAmount").val()).toFixed(2));
	$("#potentialWager").focus(function () {
		$.isNumeric($("#potentialWager").val()) && $("#potentialWager").val() !== 0 || ($("#potentialWager").val(""), $("#WagerAmount").val(""))
	});
	$("#potentialWager").blur(function () {
		console.log("blur");
		$("#potentialWager").val() === "" ? ($("#potentialWager").val(parseFloat($("#DefaultBetAmount").val()).toFixed(2)), $("#WagerAmount").val(parseFloat($("#DefaultBetAmount").val()).toFixed(2))) : ($("#WagerAmount").val(parseFloat($("#potentialWager").val()).toFixed(2)), $("#potentialWager").val(parseFloat($("#potentialWager").val()).toFixed(2)))
	});
	$("#potentialWager").mouseup(function () {
		$("#potentialWager").select()
	});
	$("#potentialWager").keyup(function () {
		setBetslipPotentialReturn()
	})
};
betslipItem = {
	outcomeId: "",
	sportTitle: "",
	eventTitle: "",
	MarketTitle: "",
	outcomeTitle: "",
	priceDecimal: ""
};
betslipBuilder = {
	totalOdds: "",
	wagerAmount: "",
	potentialReturn: "",
	Outcomes: []
};
promptFICANotification = !1;
pat = {},
	function () {
		function n(n, t, i, r) {
			var u = "application/x-www-form-urlencoded",
				f = null;
			return typeof t == "undefined" && (t = null), typeof i != "undefined" && (typeof i.contentType != "undefined" && (u = i.contentType), typeof i.dataType != "undefined" && (f = i.dataType)), $.ajax({
				url: n,
				type: r,
				dataType: f,
				contentType: u,
				data: t,
				async: !0,
				complete: function () {},
				success: function () {},
				error: function (n, t, i) {
					console.log("Error: ", i)
				}
			})
		}
		pat.get = function (t, i, r) {
			return $.when(n(t, i, r, "GET"))
		};
		pat.post = function (t, i, r) {
			return $.when(n(t, i, r, "POST"))
		}
	}();
var noFileSelectedText = "No file selected.",
	proofIdSize = !0,
	proofResidenceSize = !0,
	proofIdMobileSize = !0,
	proofResidenceMobileSize = !0;
window.XDomainRequest && jQuery.ajaxTransport(function (n) {
	if (n.crossDomain && n.async) {
		n.timeout && (n.xdrTimeout = n.timeout, delete n.timeout);
		var t;
		return {
			send: function (i, r) {
				function u(n, i, u, f) {
					t.onload = t.onerror = t.ontimeout = jQuery.noop;
					t = undefined;
					r(n, i, u, f)
				}
				t = new XDomainRequest;
				t.onload = function () {
					u(200, "OK", {
						text: t.responseText
					}, "Content-Type: " + t.contentType)
				};
				t.onerror = function () {
					u(404, "Not Found")
				};
				t.onprogress = jQuery.noop;
				t.ontimeout = function () {
					u(0, "timeout")
				};
				t.timeout = n.xdrTimeout || Number.MAX_VALUE;
				t.open(n.type, n.url);
				t.send(n.hasContent && n.data || null)
			},
			abort: function () {
				t && (t.onerror = jQuery.noop, t.abort())
			}
		}
	}
});
jQuery.support.cors = !0,
	function () {
		var n = this;
		if (n.$JSTools) return !1;
		String.prototype.reverse = function () {
			return this.split("").reverse().join("")
		};
		n.$JSTools = {
			sortObjectsByProperty: function (n, t, i, r) {
				var f, l, h, u;
				if (n.length <= 1 || !t) return n;
				for (var n = n.slice(0), s = t.isArray ? t.slice(0) : [t], t = s[0], e = [], o = [], c = !1, a = "Number" == r ? function (n, t) {
						return n - t
					} : void 0, u = 0; u < n.length; u++) e.push($JSTools.drillDownToProperty(n[u], t));
				for (e = e.sort(a), u = 0; u < e.length; u++)
					for (c = !1, f = 0; f < n.length; f++) c || "!%^&&^%!" == n[f] || $JSTools.drillDownToProperty(n[f], t) != e[u] || (o[u] = n[f], n[f] = "!%^&&^%!", c = !0);
				if (s[1]) {
					for (l = $JSTools.groupSortedObjectsByProperty(o, t), h = [], s.shift(), u = 0; u < l.length; u++) h = h.concat($JSTools.sortObjectsByProperty(l[u], s, i));
					o = h
				}
				return i ? o.reverse() : o
			},
			drillDownToProperty: function (n, t) {
				aPath = t.split(".");
				for (var i = 0; i < aPath.length; i++) {
					if (i == aPath.length - 1) return n[aPath[i]];
					n[aPath[i]] && (n = n[aPath[i]])
				}
			},
			groupSortedObjectsByProperty: function (n, t) {
				if (0 == n.length || !t) return n;
				for (var r = [
						[n[0]]
					], u = 0, i = 0; i < n.length; i++) n[i + 1] && ($JSTools.drillDownToProperty(n[i + 1], t) != $JSTools.drillDownToProperty(n[i], t) && (u++, r[u] = []), r[u].push(n[i + 1]));
				return r
			},
			encodeEntities: function (n) {
				return n = n || "", n.replace(/&/g, "&amp;").replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function (n) {
					var t = n.charCodeAt(0),
						i = n.charCodeAt(1);
					return "&#" + ((t - 55296) * 1024 + (i - 56320) + 65536) + ";"
				}).replace(/([^\#-~| |!])/g, function (n) {
					return "&#" + n.charCodeAt(0) + ";"
				}).replace(/</g, "&lt;").replace(/>/g, "&gt;")
			}
		}
	}.call(this),
	function (n) {
		function i(n) {
			return t.raw ? n : encodeURIComponent(n)
		}

		function u(n) {
			return t.raw ? n : decodeURIComponent(n)
		}

		function f(n) {
			return i(t.json ? JSON.stringify(n) : String(n))
		}

		function e(n) {
			n.indexOf('"') === 0 && (n = n.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
			try {
				return n = decodeURIComponent(n.replace(o, " ")), t.json ? JSON.parse(n) : n
			} catch (i) {}
		}

		function r(i, r) {
			var u = t.raw ? i : e(i);
			return n.isFunction(r) ? r(u) : u
		}
		var o = /\+/g,
			t = n.cookie = function (e, o, s) {
				var y, a, h, v, c, p;
				if (arguments.length > 1 && !n.isFunction(o)) return s = n.extend({}, t.defaults, s), typeof s.expires == "number" && (y = s.expires, a = s.expires = new Date, a.setTime(+a + y * 864e5)), document.cookie = [i(e), "=", f(o), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("");
				for (h = e ? undefined : {}, v = document.cookie ? document.cookie.split("; ") : [], c = 0, p = v.length; c < p; c++) {
					var w = v[c].split("="),
						b = u(w.shift()),
						l = w.join("=");
					if (e && e === b) {
						h = r(l, o);
						break
					}
					e || (l = r(l)) === undefined || (h[b] = l)
				}
				return h
			};
		t.defaults = {};
		n.removeCookie = function (t, i) {
			return n.cookie(t) === undefined ? !1 : (n.cookie(t, "", n.extend({}, i, {
				expires: -1
			})), !n.cookie(t))
		}
	}($);
window.GenesysWebChat = GenesysWebChat;
window.casinoChatIsActive = !1;
window.allowChatSend = !1;
var x = screen.width,
	y = screen.height,
	isMobileDevice = x <= 425;
! function (n) {
	function e(t, i, r) {
		if (r) {
			if ("object" != typeof t && (t = {}), "boolean" != typeof t.isMenu) {
				var f = r.children();
				t.isMenu = 1 == f.length && f.is(i.panelNodetype)
			}
			return t
		}
		return t = n.extend(!0, {}, n[u].defaults, t), ("top" == t.position || "bottom" == t.position) && ("back" == t.zposition || "next" == t.zposition) && (n[u].deprecated('Using position "' + t.position + '" in combination with zposition "' + t.zposition + '"', 'zposition "front"'), t.zposition = "front"), t
	}

	function s(t) {
		return t = n.extend(!0, {}, n[u].configuration, t), "string" != typeof t.pageSelector && (t.pageSelector = "> " + t.pageNodetype), t
	}

	function h() {
		r.$wndw = n(window);
		r.$html = n("html");
		r.$body = n("body");
		r.$allMenus = n();
		n.each([t, f, i], function (n, t) {
			t.add = function (n) {
				n = n.split(" ");
				for (var i in n) t[n[i]] = t.mm(n[i])
			}
		});
		t.mm = function (n) {
			return "mm-" + n
		};
		t.add("menu ismenu panel list subtitle selected label spacer current highest hidden page blocker modal background opened opening subopened subopen fullsubopen subclose");
		t.umm = function (n) {
			return "mm-" == n.slice(0, 3) && (n = n.slice(3)), n
		};
		f.mm = function (n) {
			return "mm-" + n
		};
		f.add("parent style");
		i.mm = function (n) {
			return n + ".mm"
		};
		i.add("toggle open opening opened close closing closed update setPage setSelected transitionend webkitTransitionEnd mousedown touchstart mouseup touchend scroll touchmove click keydown keyup resize");
		r.$wndw.on(i.keydown, function (n) {
			if (r.$html.hasClass(t.opened) && 9 == n.keyCode) return (n.preventDefault(), !1)
		});
		var e = 0;
		r.$wndw.on(i.resize, function (n, i) {
			if (i || r.$html.hasClass(t.opened)) {
				var u = r.$wndw.height();
				u != e && (e = u, r.$page.css("min-height", u))
			}
		});
		n[u]._c = t;
		n[u]._d = f;
		n[u]._e = i;
		n[u].glbl = r
	}

	function c(i, r) {
		if (i.hasClass(t.current)) return !1;
		var f = n("." + t.panel, r),
			u = f.filter("." + t.current);
		return f.removeClass(t.highest).removeClass(t.current).not(i).not(u).addClass(t.hidden), i.hasClass(t.opened) ? u.addClass(t.highest).removeClass(t.opened).removeClass(t.subopened) : (i.addClass(t.highest), u.addClass(t.subopened)), i.removeClass(t.hidden).removeClass(t.subopened).addClass(t.current).addClass(t.opened), "open"
	}

	function o(n, t, r) {
		var f = !1,
			u = function () {
				f || t.call(n[0]);
				f = !0
			};
		n.one(i.transitionend, u);
		n.one(i.webkitTransitionEnd, u);
		setTimeout(u, 1.1 * r)
	}
	var u = "mmenu";
	if (!n[u]) {
		var r = {
				$wndw: null,
				$html: null,
				$body: null,
				$page: null,
				$blck: null,
				$allMenus: null
			},
			t = {},
			f = {},
			i = {},
			l = 0,
			a = 0;
		n[u] = function (n, t, i) {
			return r.$allMenus = r.$allMenus.add(n), this.$menu = n, this.opts = t, this.conf = i, this.serialnr = l++, this._init(), this
		};
		n[u].prototype = {
			open: function () {
				var n = this;
				return this._openSetup(), setTimeout(function () {
					n._openFinish()
				}, 50), "open"
			},
			_openSetup: function () {
				a = r.$wndw.scrollTop();
				this.$menu.addClass(t.current);
				r.$allMenus.not(this.$menu).trigger(i.close);
				r.$page.data(f.style, r.$page.attr("style") || "");
				r.$wndw.trigger(i.resize, [!0]);
				this.opts.modal && r.$html.addClass(t.modal);
				this.opts.moveBackground && r.$html.addClass(t.background);
				"left" != this.opts.position && r.$html.addClass(t.mm(this.opts.position));
				"back" != this.opts.zposition && r.$html.addClass(t.mm(this.opts.zposition));
				this.opts.classes && r.$html.addClass(this.opts.classes);
				r.$html.addClass(t.opened);
				this.$menu.addClass(t.opened)
			},
			_openFinish: function () {
				var n = this;
				o(r.$page, function () {
					n.$menu.trigger(i.opened)
				}, this.conf.transitionDuration);
				r.$html.addClass(t.opening);
				this.$menu.trigger(i.opening)
			},
			close: function () {
				var n = this;
				return o(r.$page, function () {
					n.$menu.removeClass(t.current).removeClass(t.opened);
					r.$html.removeClass(t.opened).removeClass(t.modal).removeClass(t.background).removeClass(t.mm(n.opts.position)).removeClass(t.mm(n.opts.zposition));
					n.opts.classes && r.$html.removeClass(n.opts.classes);
					r.$wndw.off(i.resize).off(i.keydown);
					r.$page.attr("style", r.$page.data(f.style));
					n.$menu.trigger(i.closed)
				}, this.conf.transitionDuration), r.$html.removeClass(t.opening), this.$menu.trigger(i.closing), "close"
			},
			_init: function () {
				if (this.opts = e(this.opts, this.conf, this.$menu), this.direction = this.opts.slidingSubmenus ? "horizontal" : "vertical", this._initPage(r.$page), this._initMenu(), this._initBlocker(), this._initPanles(), this._initLinks(), this._initOpenClose(), this._bindCustomEvents(), n[u].addons)
					for (var t = 0; t < n[u].addons.length; t++) "function" == typeof this["_addon_" + n[u].addons[t]] && this["_addon_" + n[u].addons[t]]()
			},
			_bindCustomEvents: function () {
				var r = this,
					u;
				this.$menu.off(i.open + " " + i.close + " " + i.setPage + " " + i.update).on(i.open + " " + i.close + " " + i.setPage + " " + i.update, function (n) {
					n.stopPropagation()
				});
				this.$menu.on(i.open, function (i) {
					return n(this).hasClass(t.current) ? (i.stopImmediatePropagation(), !1) : r.open()
				}).on(i.close, function (i) {
					return n(this).hasClass(t.current) ? r.close() : (i.stopImmediatePropagation(), !1)
				}).on(i.setPage, function (n, t) {
					r._initPage(t);
					r._initOpenClose()
				});
				u = this.$menu.find(this.opts.isMenu && "horizontal" != this.direction ? "ul, ol" : "." + t.panel);
				u.off(i.toggle + " " + i.open + " " + i.close).on(i.toggle + " " + i.open + " " + i.close, function (n) {
					n.stopPropagation()
				});
				"horizontal" == this.direction ? u.on(i.open, function () {
					return c(n(this), r.$menu)
				}) : u.on(i.toggle, function () {
					var r = n(this);
					return r.triggerHandler(r.parent().hasClass(t.opened) ? i.close : i.open)
				}).on(i.open, function () {
					return n(this).parent().addClass(t.opened), "open"
				}).on(i.close, function () {
					return n(this).parent().removeClass(t.opened), "close"
				})
			},
			_initBlocker: function () {
				var u = this;
				r.$blck || (r.$blck = n('<div id="' + t.blocker + '" />').appendTo(r.$body));
				r.$blck.off(i.touchstart).on(i.touchstart, function (n) {
					n.preventDefault();
					n.stopPropagation();
					r.$blck.trigger(i.mousedown)
				}).on(i.mousedown, function (n) {
					n.preventDefault();
					r.$html.hasClass(t.modal) || u.$menu.trigger(i.close)
				})
			},
			_initPage: function (i) {
				i || (i = n(this.conf.pageSelector, r.$body), i.length > 1 && (n[u].debug("Multiple nodes found for the page-node, all nodes are wrapped in one <" + this.conf.pageNodetype + ">."), i = i.wrapAll("<" + this.conf.pageNodetype + " />").parent()));
				i.addClass(t.page);
				r.$page = i
			},
			_initMenu: function () {
				this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("*")).filter("[id]").each(function () {
					n(this).attr("id", t.mm(n(this).attr("id")))
				}));
				this.$menu.contents().each(function () {
					3 == n(this)[0].nodeType && n(this).remove()
				});
				this.$menu.prependTo("body").addClass(t.menu);
				this.$menu.addClass(t.mm(this.direction));
				this.opts.classes && this.$menu.addClass(this.opts.classes);
				this.opts.isMenu && this.$menu.addClass(t.ismenu);
				"left" != this.opts.position && this.$menu.addClass(t.mm(this.opts.position));
				"back" != this.opts.zposition && this.$menu.addClass(t.mm(this.opts.zposition))
			},
			_initPanles: function () {
				var o = this,
					u, r, h, s, e;
				this.__refactorClass(n("." + this.conf.listClass, this.$menu), "list");
				this.opts.isMenu && n("ul, ol", this.$menu).not(".mm-nolist").addClass(t.list);
				u = n("." + t.list + " > li", this.$menu);
				this.__refactorClass(u.filter("." + this.conf.selectedClass), "selected");
				this.__refactorClass(u.filter("." + this.conf.labelClass), "label");
				this.__refactorClass(u.filter("." + this.conf.spacerClass), "spacer");
				u.off(i.setSelected).on(i.setSelected, function (i, r) {
					i.stopPropagation();
					u.removeClass(t.selected);
					"boolean" != typeof r && (r = !0);
					r && n(this).addClass(t.selected)
				});
				this.__refactorClass(n("." + this.conf.panelClass, this.$menu), "panel");
				this.$menu.children().filter(this.conf.panelNodetype).add(this.$menu.find("." + t.list).children().children().filter(this.conf.panelNodetype)).addClass(t.panel);
				r = n("." + t.panel, this.$menu);
				r.each(function (i) {
					var r = n(this),
						u = r.attr("id") || t.mm("m" + o.serialnr + "-p" + i);
					r.attr("id", u)
				});
				r.find("." + t.panel).each(function () {
					var i = n(this),
						s = i.is("ul, ol") ? i : i.find("ul ,ol").first(),
						r = i.parent(),
						u = r.find("> a, > span"),
						h = r.closest("." + t.panel),
						e;
					(i.data(f.parent, r), r.parent().is("." + t.list)) && (e = n('<a class="' + t.subopen + '" href="#' + i.attr("id") + '" />').insertBefore(u), u.is("a") || e.addClass(t.fullsubopen), "horizontal" == o.direction && s.prepend('<li class="' + t.subtitle + '"><a class="' + t.subclose + '" href="#' + h.attr("id") + '">' + u.text() + "<\/a><\/li>"))
				});
				h = "horizontal" == this.direction ? i.open : i.toggle;
				(r.each(function () {
					var t = n(this),
						r = t.attr("id");
					n('a[href="#' + r + '"]', o.$menu).off(i.click).on(i.click, function (n) {
						n.preventDefault();
						t.trigger(h)
					})
				}), "horizontal" == this.direction) ? (s = n("." + t.list + " > li." + t.selected, this.$menu), s.add(s.parents("li")).parents("li").removeClass(t.selected).end().each(function () {
					var i = n(this),
						r = i.find("> ." + t.panel);
					r.length && (i.parents("." + t.panel).addClass(t.subopened), r.addClass(t.opened))
				}).closest("." + t.panel).addClass(t.opened).parents("." + t.panel).addClass(t.subopened)) : n("li." + t.selected, this.$menu).addClass(t.opened).parents("." + t.selected).removeClass(t.selected);
				e = r.filter("." + t.opened);
				e.length || (e = r.first());
				e.addClass(t.opened).last().addClass(t.current);
				"horizontal" == this.direction && r.find("." + t.panel).appendTo(this.$menu)
			},
			_initLinks: function () {
				var u = this;
				n("." + t.list + " > li > a", this.$menu).not("." + t.subopen).not("." + t.subclose).not('[rel="external"]').not('[target="_blank"]').off(i.click).on(i.click, function (f) {
					var e = n(this),
						s = e.attr("href"),
						o;
					u.__valueOrFn(u.opts.onClick.setSelected, e) && e.parent().trigger(i.setSelected);
					o = u.__valueOrFn(u.opts.onClick.preventDefault, e, "#" == s.slice(0, 1));
					o && f.preventDefault();
					u.__valueOrFn(u.opts.onClick.blockUI, e, !o) && r.$html.addClass(t.blocking);
					u.__valueOrFn(u.opts.onClick.close, e, o) && u.$menu.triggerHandler(i.close)
				})
			},
			_initOpenClose: function () {
				var f = this,
					u = this.$menu.attr("id");
				u && u.length && (this.conf.clone && (u = t.umm(u)), n('a[href="#' + u + '"]').off(i.click).on(i.click, function (n) {
					n.preventDefault();
					f.$menu.trigger(i.open)
				}));
				u = r.$page.attr("id");
				u && u.length && n('a[href="#' + u + '"]').off(i.click).on(i.click, function (n) {
					n.preventDefault();
					f.$menu.trigger(i.close)
				})
			},
			__valueOrFn: function (n, t, i) {
				return "function" == typeof n ? n.call(t[0]) : "undefined" == typeof n && "undefined" != typeof i ? i : n
			},
			__refactorClass: function (n, i) {
				n.removeClass(this.conf[i + "Class"]).addClass(t[i])
			}
		};
		n.fn[u] = function (t, i) {
			return r.$wndw || h(), t = e(t, i), i = s(i), this.each(function () {
				var r = n(this);
				r.data(u) || r.data(u, new n[u](r, t, i))
			})
		};
		n[u].version = "4.2.0";
		n[u].defaults = {
			position: "left",
			zposition: "back",
			moveBackground: !0,
			slidingSubmenus: !0,
			modal: !1,
			classes: "",
			onClick: {
				setSelected: !0
			}
		};
		n[u].configuration = {
				preventTabbing: !0,
				panelClass: "Panel",
				listClass: "List",
				selectedClass: "Selected",
				labelClass: "Label",
				spacerClass: "Spacer",
				pageNodetype: "div",
				panelNodetype: "ul, ol, div",
				transitionDuration: 400
			},
			function () {
				var i = window.document,
					t = window.navigator.userAgent,
					r = (document.createElement("div").style, "ontouchstart" in i),
					e = "WebkitOverflowScrolling" in i.documentElement.style,
					f = function () {
						return t.indexOf("Android") >= 0 ? 2.4 > parseFloat(t.slice(t.indexOf("Android") + 8)) : !1
					}();
				n[u].support = {
					touch: r,
					oldAndroidBrowser: f,
					overflowscrolling: function () {
						return r ? e ? !0 : f ? !1 : !0 : !0
					}()
				}
			}();
		n[u].debug = function () {};
		n[u].deprecated = function (n, t) {
			"undefined" != typeof console && "undefined" != typeof console.warn && console.warn("MMENU: " + n + " is deprecated, use " + t + " instead.")
		}
	}
}(jQuery);
$(window).click(function () {
		setTimeout(function () {
			$(".mm-menu").is(":visible") ? $("body").css({
				overflow: "hidden"
			}) : ($("#my-menu").fadeOut("fast"), $("body").css({
				overflow: "auto"
			}))
		}, 500)
	}),
	function (n) {
		function it(n, t, i) {
			switch (arguments.length) {
				case 2:
					return n != null ? n : t;
				case 3:
					return n != null ? n : t != null ? t : i;
				default:
					throw new Error("Implement me");
			}
		}

		function g(n, t) {
			return dr.call(n, t)
		}

		function vt() {
			return {
				empty: !1,
				unusedTokens: [],
				unusedInput: [],
				overflow: -2,
				charsLeftOver: 0,
				nullInput: !1,
				invalidMonth: null,
				invalidFormat: !1,
				userInvalidated: !1,
				iso: !1
			}
		}

		function pi(n) {
			t.suppressDeprecationWarnings === !1 && typeof console != "undefined" && console.warn && console.warn("Deprecation warning: " + n)
		}

		function o(n, t) {
			var i = !0;
			return nt(function () {
				return i && (pi(n), i = !1), t.apply(this, arguments)
			}, t)
		}

		function bu(n, t) {
			vi[n] || (pi(t), vi[n] = !0)
		}

		function wi(n, t) {
			return function (i) {
				return r(n.call(this, i), t)
			}
		}

		function ku(n, t) {
			return function (i) {
				return this.localeData().ordinal(n.call(this, i), t)
			}
		}

		function du(n, t) {
			var r = (t.year() - n.year()) * 12 + (t.month() - n.month()),
				i = n.clone().add(r, "months"),
				u, f;
			return t - i < 0 ? (u = n.clone().add(r - 1, "months"), f = (t - i) / (i - u)) : (u = n.clone().add(r + 1, "months"), f = (t - i) / (u - i)), -(r + f)
		}

		function gu(n, t, i) {
			var r;
			return i == null ? t : n.meridiemHour != null ? n.meridiemHour(t, i) : n.isPM != null ? (r = n.isPM(i), r && t < 12 && (t += 12), r || t !== 12 || (t = 0), t) : t
		}

		function bi() {}

		function et(n, i) {
			i !== !1 && er(n);
			ki(this, n);
			this._d = new Date(+n._d);
			at === !1 && (at = !0, t.updateOffset(this), at = !1)
		}

		function yt(n) {
			var i = ir(n),
				r = i.year || 0,
				u = i.quarter || 0,
				f = i.month || 0,
				e = i.week || 0,
				o = i.day || 0,
				s = i.hour || 0,
				h = i.minute || 0,
				c = i.second || 0,
				l = i.millisecond || 0;
			this._milliseconds = +l + c * 1e3 + h * 6e4 + s * 36e5;
			this._days = +o + e * 7;
			this._months = +f + u * 3 + r * 12;
			this._data = {};
			this._locale = t.localeData();
			this._bubble()
		}

		function nt(n, t) {
			for (var i in t) g(t, i) && (n[i] = t[i]);
			return g(t, "toString") && (n.toString = t.toString), g(t, "valueOf") && (n.valueOf = t.valueOf), n
		}

		function ki(n, t) {
			var u, i, r;
			if (typeof t._isAMomentObject != "undefined" && (n._isAMomentObject = t._isAMomentObject), typeof t._i != "undefined" && (n._i = t._i), typeof t._f != "undefined" && (n._f = t._f), typeof t._l != "undefined" && (n._l = t._l), typeof t._strict != "undefined" && (n._strict = t._strict), typeof t._tzm != "undefined" && (n._tzm = t._tzm), typeof t._isUTC != "undefined" && (n._isUTC = t._isUTC), typeof t._offset != "undefined" && (n._offset = t._offset), typeof t._pf != "undefined" && (n._pf = t._pf), typeof t._locale != "undefined" && (n._locale = t._locale), ut.length > 0)
				for (u in ut) i = ut[u], r = t[i], typeof r != "undefined" && (n[i] = r);
			return n
		}

		function h(n) {
			return n < 0 ? Math.ceil(n) : Math.floor(n)
		}

		function r(n, t, i) {
			for (var r = "" + Math.abs(n), u = n >= 0; r.length < t;) r = "0" + r;
			return (u ? i ? "+" : "" : "-") + r
		}

		function di(n, t) {
			var i = {
				milliseconds: 0,
				months: 0
			};
			return i.months = t.month() - n.month() + (t.year() - n.year()) * 12, n.clone().add(i.months, "M").isAfter(t) && --i.months, i.milliseconds = +t - +n.clone().add(i.months, "M"), i
		}

		function nf(n, t) {
			var i;
			return t = bt(t, n), n.isBefore(t) ? i = di(n, t) : (i = di(t, n), i.milliseconds = -i.milliseconds, i.months = -i.months), i
		}

		function gi(n, i) {
			return function (r, u) {
				var f, e;
				return u === null || isNaN(+u) || (bu(i, "moment()." + i + "(period, number) is deprecated. Please use moment()." + i + "(number, period)."), e = r, r = u, u = e), r = typeof r == "string" ? +r : r, f = t.duration(r, u), nr(this, f, n), this
			}
		}

		function nr(n, i, r, u) {
			var o = i._milliseconds,
				f = i._days,
				e = i._months;
			u = u == null ? !0 : u;
			o && n._d.setTime(+n._d + o * r);
			f && pr(n, "Date", ii(n, "Date") + f * r);
			e && yr(n, ii(n, "Month") + e * r);
			u && t.updateOffset(n, f || e)
		}

		function ot(n) {
			return Object.prototype.toString.call(n) === "[object Array]"
		}

		function pt(n) {
			return Object.prototype.toString.call(n) === "[object Date]" || n instanceof Date
		}

		function tr(n, t, r) {
			for (var e = Math.min(n.length, t.length), o = Math.abs(n.length - t.length), f = 0, u = 0; u < e; u++)(r && n[u] !== t[u] || !r && i(n[u]) !== i(t[u])) && f++;
			return f + o
		}

		function e(n) {
			if (n) {
				var t = n.toLowerCase().replace(/(.)s$/, "$1");
				n = pu[n] || wu[t] || t
			}
			return n
		}

		function ir(n) {
			var r = {},
				t;
			for (var i in n) g(n, i) && (t = e(i), t && (r[t] = n[i]));
			return r
		}

		function tf(i) {
			var r, u;
			if (i.indexOf("week") === 0) r = 7, u = "day";
			else if (i.indexOf("month") === 0) r = 12, u = "month";
			else return;
			t[i] = function (f, e) {
				var o, s, c = t._locale[i],
					h = [];
				if (typeof f == "number" && (e = f, f = n), s = function (n) {
						var i = t().utc().set(u, n);
						return c.call(t._locale, i, f || "")
					}, e != null) return s(e);
				for (o = 0; o < r; o++) h.push(s(o));
				return h
			}
		}

		function i(n) {
			var t = +n,
				i = 0;
			return t !== 0 && isFinite(t) && (i = t >= 0 ? Math.floor(t) : Math.ceil(t)), i
		}

		function wt(n, t) {
			return new Date(Date.UTC(n, t + 1, 0)).getUTCDate()
		}

		function rr(n, i, r) {
			return tt(t([n, 11, 31 + i - r]), i, r).week
		}

		function ur(n) {
			return fr(n) ? 366 : 365
		}

		function fr(n) {
			return n % 4 == 0 && n % 100 != 0 || n % 400 == 0
		}

		function er(n) {
			var t;
			n._a && n._pf.overflow === -2 && (t = n._a[l] < 0 || n._a[l] > 11 ? l : n._a[s] < 1 || n._a[s] > wt(n._a[c], n._a[l]) ? s : n._a[f] < 0 || n._a[f] > 24 || n._a[f] === 24 && (n._a[w] !== 0 || n._a[b] !== 0 || n._a[k] !== 0) ? f : n._a[w] < 0 || n._a[w] > 59 ? w : n._a[b] < 0 || n._a[b] > 59 ? b : n._a[k] < 0 || n._a[k] > 999 ? k : -1, n._pf._overflowDayOfYear && (t < c || t > s) && (t = s), n._pf.overflow = t)
		}

		function or(t) {
			return t._isValid == null && (t._isValid = !isNaN(t._d.getTime()) && t._pf.overflow < 0 && !t._pf.empty && !t._pf.invalidMonth && !t._pf.nullInput && !t._pf.invalidFormat && !t._pf.userInvalidated, t._strict && (t._isValid = t._isValid && t._pf.charsLeftOver === 0 && t._pf.unusedTokens.length === 0 && t._pf.bigHour === n)), t._isValid
		}

		function sr(n) {
			return n ? n.toLowerCase().replace("_", "-") : n
		}

		function rf(n) {
			for (var r = 0, i, t, f, u; r < n.length;) {
				for (u = sr(n[r]).split("-"), i = u.length, t = sr(n[r + 1]), t = t ? t.split("-") : null; i > 0;) {
					if (f = hr(u.slice(0, i).join("-")), f) return f;
					if (t && t.length >= i && tr(u, t, !0) >= i - 1) break;
					i--
				}
				r++
			}
			return null
		}

		function hr(n) {
			var i = null;
			if (!d[n] && ui) try {
				i = t.locale();
				require("./locale/" + n);
				t.locale(i)
			} catch (r) {}
			return d[n]
		}

		function bt(n, i) {
			var r, u;
			return i._isUTC ? (r = i.clone(), u = (t.isMoment(n) || pt(n) ? +n : +t(n)) - +r, r._d.setTime(+r._d + u), t.updateOffset(r, !1), r) : t(n).local()
		}

		function uf(n) {
			return n.match(/\[[\s\S]/) ? n.replace(/^\[|\]$/g, "") : n.replace(/\\/g, "")
		}

		function ff(n) {
			for (var i = n.match(fi), t = 0, r = i.length; t < r; t++) i[t] = a[i[t]] ? a[i[t]] : uf(i[t]);
			return function (u) {
				var f = "";
				for (t = 0; t < r; t++) f += i[t] instanceof Function ? i[t].call(u, n) : i[t];
				return f
			}
		}

		function kt(n, t) {
			return n.isValid() ? (t = cr(t, n.localeData()), lt[t] || (lt[t] = ff(t)), lt[t](n)) : n.localeData().invalidDate()
		}

		function cr(n, t) {
			function r(n) {
				return t.longDateFormat(n) || n
			}
			var i = 5;
			for (ft.lastIndex = 0; i >= 0 && ft.test(n);) n = n.replace(ft, r), ft.lastIndex = 0, i -= 1;
			return n
		}

		function ef(n, t) {
			var i = t._strict;
			switch (n) {
				case "Q":
					return oi;
				case "DDDD":
					return hi;
				case "YYYY":
				case "GGGG":
				case "gggg":
					return i ? cu : ru;
				case "Y":
				case "G":
				case "g":
					return au;
				case "YYYYYY":
				case "YYYYY":
				case "GGGGG":
				case "ggggg":
					return i ? lu : uu;
				case "S":
					if (i) return oi;
				case "SS":
					if (i) return si;
				case "SSS":
					if (i) return hi;
				case "DDD":
					return iu;
				case "MMM":
				case "MMMM":
				case "dd":
				case "ddd":
				case "dddd":
					return eu;
				case "a":
				case "A":
					return t._locale._meridiemParse;
				case "x":
					return su;
				case "X":
					return hu;
				case "Z":
				case "ZZ":
					return st;
				case "T":
					return ou;
				case "SSSS":
					return fu;
				case "MM":
				case "DD":
				case "YY":
				case "GG":
				case "gg":
				case "HH":
				case "hh":
				case "mm":
				case "ss":
				case "ww":
				case "WW":
					return i ? si : ei;
				case "M":
				case "D":
				case "d":
				case "H":
				case "h":
				case "m":
				case "s":
				case "w":
				case "W":
				case "e":
				case "E":
					return ei;
				case "Do":
					return i ? t._locale._ordinalParse : t._locale._ordinalParseLenient;
				default:
					return new RegExp(af(lf(n.replace("\\", "")), "i"))
			}
		}

		function dt(n) {
			n = n || "";
			var r = n.match(st) || [],
				f = r[r.length - 1] || [],
				t = (f + "").match(yu) || ["-", 0, 0],
				u = +(t[1] * 60) + i(t[2]);
			return t[0] === "+" ? u : -u
		}

		function of(n, r, u) {
			var o, e = u._a;
			switch (n) {
				case "Q":
					r != null && (e[l] = (i(r) - 1) * 3);
					break;
				case "M":
				case "MM":
					r != null && (e[l] = i(r) - 1);
					break;
				case "MMM":
				case "MMMM":
					o = u._locale.monthsParse(r, n, u._strict);
					o != null ? e[l] = o : u._pf.invalidMonth = r;
					break;
				case "D":
				case "DD":
					r != null && (e[s] = i(r));
					break;
				case "Do":
					r != null && (e[s] = i(parseInt(r.match(/\d{1,2}/)[0], 10)));
					break;
				case "DDD":
				case "DDDD":
					r != null && (u._dayOfYear = i(r));
					break;
				case "YY":
					e[c] = t.parseTwoDigitYear(r);
					break;
				case "YYYY":
				case "YYYYY":
				case "YYYYYY":
					e[c] = i(r);
					break;
				case "a":
				case "A":
					u._meridiem = r;
					break;
				case "h":
				case "hh":
					u._pf.bigHour = !0;
				case "H":
				case "HH":
					e[f] = i(r);
					break;
				case "m":
				case "mm":
					e[w] = i(r);
					break;
				case "s":
				case "ss":
					e[b] = i(r);
					break;
				case "S":
				case "SS":
				case "SSS":
				case "SSSS":
					e[k] = i(("0." + r) * 1e3);
					break;
				case "x":
					u._d = new Date(i(r));
					break;
				case "X":
					u._d = new Date(parseFloat(r) * 1e3);
					break;
				case "Z":
				case "ZZ":
					u._useUTC = !0;
					u._tzm = dt(r);
					break;
				case "dd":
				case "ddd":
				case "dddd":
					o = u._locale.weekdaysParse(r);
					o != null ? (u._w = u._w || {}, u._w.d = o) : u._pf.invalidWeekday = r;
					break;
				case "w":
				case "ww":
				case "W":
				case "WW":
				case "d":
				case "e":
				case "E":
					n = n.substr(0, 1);
				case "gggg":
				case "GGGG":
				case "GGGGG":
					n = n.substr(0, 2);
					r && (u._w = u._w || {}, u._w[n] = i(r));
					break;
				case "gg":
				case "GG":
					u._w = u._w || {};
					u._w[n] = t.parseTwoDigitYear(r)
			}
		}

		function sf(n) {
			var i, o, f, u, r, e, s;
			i = n._w;
			i.GG != null || i.W != null || i.E != null ? (r = 1, e = 4, o = it(i.GG, n._a[c], tt(t(), 1, 4).year), f = it(i.W, 1), u = it(i.E, 1)) : (r = n._locale._week.dow, e = n._locale._week.doy, o = it(i.gg, n._a[c], tt(t(), r, e).year), f = it(i.w, 1), i.d != null ? (u = i.d, u < r && ++f) : u = i.e != null ? i.e + r : r);
			s = ne(o, f, u, e, r);
			n._a[c] = s.year;
			n._dayOfYear = s.dayOfYear
		}

		function gt(n) {
			var t, i, r = [],
				u, e;
			if (!n._d) {
				for (u = cf(n), n._w && n._a[s] == null && n._a[l] == null && sf(n), n._dayOfYear && (e = it(n._a[c], u[c]), n._dayOfYear > ur(e) && (n._pf._overflowDayOfYear = !0), i = ti(e, 0, n._dayOfYear), n._a[l] = i.getUTCMonth(), n._a[s] = i.getUTCDate()), t = 0; t < 3 && n._a[t] == null; ++t) n._a[t] = r[t] = u[t];
				for (; t < 7; t++) n._a[t] = r[t] = n._a[t] == null ? t === 2 ? 1 : 0 : n._a[t];
				n._a[f] === 24 && n._a[w] === 0 && n._a[b] === 0 && n._a[k] === 0 && (n._nextDay = !0, n._a[f] = 0);
				n._d = (n._useUTC ? ti : bf).apply(null, r);
				n._tzm != null && n._d.setUTCMinutes(n._d.getUTCMinutes() - n._tzm);
				n._nextDay && (n._a[f] = 24)
			}
		}

		function hf(n) {
			var t;
			n._d || (t = ir(n._i), n._a = [t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], gt(n))
		}

		function cf(n) {
			var t = new Date;
			return n._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
		}

		function ni(i) {
			if (i._f === t.ISO_8601) {
				lr(i);
				return
			}
			i._a = [];
			i._pf.empty = !0;
			for (var r = "" + i._i, u, e, h, l = r.length, c = 0, s = cr(i._f, i._locale).match(fi) || [], o = 0; o < s.length; o++) e = s[o], u = (r.match(ef(e, i)) || [])[0], u && (h = r.substr(0, r.indexOf(u)), h.length > 0 && i._pf.unusedInput.push(h), r = r.slice(r.indexOf(u) + u.length), c += u.length), a[e] ? (u ? i._pf.empty = !1 : i._pf.unusedTokens.push(e), of(e, u, i)) : i._strict && !u && i._pf.unusedTokens.push(e);
			i._pf.charsLeftOver = l - c;
			r.length > 0 && i._pf.unusedInput.push(r);
			i._pf.bigHour === !0 && i._a[f] <= 12 && (i._pf.bigHour = n);
			i._a[f] = gu(i._locale, i._a[f], i._meridiem);
			gt(i);
			er(i)
		}

		function lf(n) {
			return n.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (n, t, i, r, u) {
				return t || i || r || u
			})
		}

		function af(n) {
			return n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
		}

		function vf(n) {
			var t, f, u, r, i;
			if (n._f.length === 0) {
				n._pf.invalidFormat = !0;
				n._d = new Date(NaN);
				return
			}
			for (r = 0; r < n._f.length; r++)(i = 0, t = ki({}, n), n._useUTC != null && (t._useUTC = n._useUTC), t._pf = vt(), t._f = n._f[r], ni(t), or(t)) && (i += t._pf.charsLeftOver, i += t._pf.unusedTokens.length * 10, t._pf.score = i, (u == null || i < u) && (u = i, f = t));
			nt(n, f || t)
		}

		function lr(n) {
			var t, i, r = n._i,
				u = vu.exec(r);
			if (u) {
				for (n._pf.iso = !0, t = 0, i = ht.length; t < i; t++)
					if (ht[t][1].exec(r)) {
						n._f = ht[t][0] + (u[6] || " ");
						break
					}
				for (t = 0, i = ct.length; t < i; t++)
					if (ct[t][1].exec(r)) {
						n._f += ct[t][0];
						break
					}
				r.match(st) && (n._f += "Z");
				ni(n)
			} else n._isValid = !1
		}

		function yf(n) {
			lr(n);
			n._isValid === !1 && (delete n._isValid, t.createFromInputFallback(n))
		}

		function pf(n, t) {
			for (var r = [], i = 0; i < n.length; ++i) r.push(t(n[i], i));
			return r
		}

		function wf(i) {
			var r = i._i,
				u;
			r === n ? i._d = new Date : pt(r) ? i._d = new Date(+r) : (u = gr.exec(r)) !== null ? i._d = new Date(+u[1]) : typeof r == "string" ? yf(i) : ot(r) ? (i._a = pf(r.slice(0), function (n) {
				return parseInt(n, 10)
			}), gt(i)) : typeof r == "object" ? hf(i) : typeof r == "number" ? i._d = new Date(r) : t.createFromInputFallback(i)
		}

		function bf(n, t, i, r, u, f, e) {
			var o = new Date(n, t, i, r, u, f, e);
			return n < 1970 && o.setFullYear(n), o
		}

		function ti(n) {
			var t = new Date(Date.UTC.apply(null, arguments));
			return n < 1970 && t.setUTCFullYear(n), t
		}

		function kf(n, t) {
			if (typeof n == "string")
				if (isNaN(n)) {
					if (n = t.weekdaysParse(n), typeof n != "number") return null
				} else n = parseInt(n, 10);
			return n
		}

		function df(n, t, i, r, u) {
			return u.relativeTime(t || 1, !!i, n, r)
		}

		function gf(n, i, r) {
			var u = t.duration(n).abs(),
				c = p(u.as("s")),
				e = p(u.as("m")),
				o = p(u.as("h")),
				s = p(u.as("d")),
				h = p(u.as("M")),
				l = p(u.as("y")),
				f = c < y.s && ["s", c] || e === 1 && ["m"] || e < y.m && ["mm", e] || o === 1 && ["h"] || o < y.h && ["hh", o] || s === 1 && ["d"] || s < y.d && ["dd", s] || h === 1 && ["M"] || h < y.M && ["MM", h] || l === 1 && ["y"] || ["yy", l];
			return f[2] = i, f[3] = +n > 0, f[4] = r, df.apply({}, f)
		}

		function tt(n, i, r) {
			var e = r - i,
				u = r - n.day(),
				f;
			return u > e && (u -= 7), u < e - 7 && (u += 7), f = t(n).add(u, "d"), {
				week: Math.ceil(f.dayOfYear() / 7),
				year: f.year()
			}
		}

		function ne(n, t, i, r, u) {
			var f = ti(n, 0, 1).getUTCDay(),
				o, e;
			return f = f === 0 ? 7 : f, i = i != null ? i : u, o = u - f + (f > r ? 7 : 0) - (f < u ? 7 : 0), e = 7 * (t - 1) + (i - u) + o + 1, {
				year: e > 0 ? n : n - 1,
				dayOfYear: e > 0 ? e : ur(n - 1) + e
			}
		}

		function ar(i) {
			var r = i._i,
				f = i._f,
				u;
			return (i._locale = i._locale || t.localeData(i._l), r === null || f === n && r === "") ? t.invalid({
				nullInput: !0
			}) : (typeof r == "string" && (i._i = r = i._locale.preparse(r)), t.isMoment(r)) ? new et(r, !0) : (f ? ot(f) ? vf(i) : ni(i) : wf(i), u = new et(i), u._nextDay && (u.add(1, "d"), u._nextDay = n), u)
		}

		function vr(n, i) {
			var u, r;
			if (i.length === 1 && ot(i[0]) && (i = i[0]), !i.length) return t();
			for (u = i[0], r = 1; r < i.length; ++r) i[r][n](u) && (u = i[r]);
			return u
		}

		function yr(n, t) {
			var i;
			return typeof t == "string" && (t = n.localeData().monthsParse(t), typeof t != "number") ? n : (i = Math.min(n.date(), wt(n.year(), t)), n._d["set" + (n._isUTC ? "UTC" : "") + "Month"](t, i), n)
		}

		function ii(n, t) {
			return n._d["get" + (n._isUTC ? "UTC" : "") + t]()
		}

		function pr(n, t, i) {
			return t === "Month" ? yr(n, i) : n._d["set" + (n._isUTC ? "UTC" : "") + t](i)
		}

		function v(n, i) {
			return function (r) {
				return r != null ? (pr(this, n, r), t.updateOffset(this, i), this) : ii(this, n)
			}
		}

		function wr(n) {
			return n * 400 / 146097
		}

		function br(n) {
			return n * 146097 / 400
		}

		function te(n) {
			t.duration.fn[n] = function () {
				return this._data[n]
			}
		}

		function kr(n) {
			typeof ender == "undefined" && (ri = rt.moment, rt.moment = n ? o("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", t) : t)
		}
		for (var t, rt = typeof global != "undefined" && (typeof window == "undefined" || window === global.window) ? global : this, ri, p = Math.round, dr = Object.prototype.hasOwnProperty, u, c = 0, l = 1, s = 2, f = 3, w = 4, b = 5, k = 6, d = {}, ut = [], ui = typeof module != "undefined" && module && module.exports, gr = /^\/?Date\((\-?\d+)/i, nu = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, tu = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, fi = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, ft = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, ei = /\d\d?/, iu = /\d{1,3}/, ru = /\d{1,4}/, uu = /[+\-]?\d{1,6}/, fu = /\d+/, eu = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, st = /Z|[\+\-]\d\d:?\d\d/gi, ou = /T/i, su = /[\+\-]?\d+/, hu = /[\+\-]?\d+(\.\d{1,3})?/, oi = /\d/, si = /\d\d/, hi = /\d{3}/, cu = /\d{4}/, lu = /[+-]?\d{6}/, au = /[+-]?\d+/, vu = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, ht = [
				["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
				["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
				["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
				["GGGG-[W]WW", /\d{4}-W\d{2}/],
				["YYYY-DDD", /\d{4}-\d{3}/]
			], ct = [
				["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
				["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
				["HH:mm", /(T| )\d\d:\d\d/],
				["HH", /(T| )\d\d/]
			], yu = /([\+\-]|\d\d)/gi, ie = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), ci = {
				Milliseconds: 1,
				Seconds: 1e3,
				Minutes: 6e4,
				Hours: 36e5,
				Days: 864e5,
				Months: 2592e6,
				Years: 31536e6
			}, pu = {
				ms: "millisecond",
				s: "second",
				m: "minute",
				h: "hour",
				d: "day",
				D: "date",
				w: "week",
				W: "isoWeek",
				M: "month",
				Q: "quarter",
				y: "year",
				DDD: "dayOfYear",
				e: "weekday",
				E: "isoWeekday",
				gg: "weekYear",
				GG: "isoWeekYear"
			}, wu = {
				dayofyear: "dayOfYear",
				isoweekday: "isoWeekday",
				isoweek: "isoWeek",
				weekyear: "weekYear",
				isoweekyear: "isoWeekYear"
			}, lt = {}, y = {
				s: 45,
				m: 45,
				h: 22,
				d: 26,
				M: 11
			}, li = "DDD w W M D d".split(" "), ai = "M D H h m s w W".split(" "), a = {
				M: function () {
					return this.month() + 1
				},
				MMM: function (n) {
					return this.localeData().monthsShort(this, n)
				},
				MMMM: function (n) {
					return this.localeData().months(this, n)
				},
				D: function () {
					return this.date()
				},
				DDD: function () {
					return this.dayOfYear()
				},
				d: function () {
					return this.day()
				},
				dd: function (n) {
					return this.localeData().weekdaysMin(this, n)
				},
				ddd: function (n) {
					return this.localeData().weekdaysShort(this, n)
				},
				dddd: function (n) {
					return this.localeData().weekdays(this, n)
				},
				w: function () {
					return this.week()
				},
				W: function () {
					return this.isoWeek()
				},
				YY: function () {
					return r(this.year() % 100, 2)
				},
				YYYY: function () {
					return r(this.year(), 4)
				},
				YYYYY: function () {
					return r(this.year(), 5)
				},
				YYYYYY: function () {
					var n = this.year(),
						t = n >= 0 ? "+" : "-";
					return t + r(Math.abs(n), 6)
				},
				gg: function () {
					return r(this.weekYear() % 100, 2)
				},
				gggg: function () {
					return r(this.weekYear(), 4)
				},
				ggggg: function () {
					return r(this.weekYear(), 5)
				},
				GG: function () {
					return r(this.isoWeekYear() % 100, 2)
				},
				GGGG: function () {
					return r(this.isoWeekYear(), 4)
				},
				GGGGG: function () {
					return r(this.isoWeekYear(), 5)
				},
				e: function () {
					return this.weekday()
				},
				E: function () {
					return this.isoWeekday()
				},
				a: function () {
					return this.localeData().meridiem(this.hours(), this.minutes(), !0)
				},
				A: function () {
					return this.localeData().meridiem(this.hours(), this.minutes(), !1)
				},
				H: function () {
					return this.hours()
				},
				h: function () {
					return this.hours() % 12 || 12
				},
				m: function () {
					return this.minutes()
				},
				s: function () {
					return this.seconds()
				},
				S: function () {
					return i(this.milliseconds() / 100)
				},
				SS: function () {
					return r(i(this.milliseconds() / 10), 2)
				},
				SSS: function () {
					return r(this.milliseconds(), 3)
				},
				SSSS: function () {
					return r(this.milliseconds(), 3)
				},
				Z: function () {
					var n = this.utcOffset(),
						t = "+";
					return n < 0 && (n = -n, t = "-"), t + r(i(n / 60), 2) + ":" + r(i(n) % 60, 2)
				},
				ZZ: function () {
					var n = this.utcOffset(),
						t = "+";
					return n < 0 && (n = -n, t = "-"), t + r(i(n / 60), 2) + r(i(n) % 60, 2)
				},
				z: function () {
					return this.zoneAbbr()
				},
				zz: function () {
					return this.zoneName()
				},
				x: function () {
					return this.valueOf()
				},
				X: function () {
					return this.unix()
				},
				Q: function () {
					return this.quarter()
				}
			}, vi = {}, yi = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"], at = !1; li.length;) u = li.pop(), a[u + "o"] = ku(a[u], u);
		while (ai.length) u = ai.pop(), a[u + u] = wi(a[u], 2);
		for (a.DDDD = wi(a.DDD, 3), nt(bi.prototype, {
				set: function (n) {
					var t;
					for (var i in n) t = n[i], typeof t == "function" ? this[i] = t : this["_" + i] = t;
					this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
				},
				_months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
				months: function (n) {
					return this._months[n.month()]
				},
				_monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
				monthsShort: function (n) {
					return this._monthsShort[n.month()]
				},
				monthsParse: function (n, i, r) {
					var u, f, e;
					for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), u = 0; u < 12; u++)
						if ((f = t.utc([2e3, u]), r && !this._longMonthsParse[u] && (this._longMonthsParse[u] = new RegExp("^" + this.months(f, "").replace(".", "") + "$", "i"), this._shortMonthsParse[u] = new RegExp("^" + this.monthsShort(f, "").replace(".", "") + "$", "i")), r || this._monthsParse[u] || (e = "^" + this.months(f, "") + "|^" + this.monthsShort(f, ""), this._monthsParse[u] = new RegExp(e.replace(".", ""), "i")), r && i === "MMMM" && this._longMonthsParse[u].test(n)) || r && i === "MMM" && this._shortMonthsParse[u].test(n) || !r && this._monthsParse[u].test(n)) return u
				},
				_weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
				weekdays: function (n) {
					return this._weekdays[n.day()]
				},
				_weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
				weekdaysShort: function (n) {
					return this._weekdaysShort[n.day()]
				},
				_weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
				weekdaysMin: function (n) {
					return this._weekdaysMin[n.day()]
				},
				weekdaysParse: function (n) {
					var i, r, u;
					for (this._weekdaysParse || (this._weekdaysParse = []), i = 0; i < 7; i++)
						if (this._weekdaysParse[i] || (r = t([2e3, 1]).day(i), u = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[i] = new RegExp(u.replace(".", ""), "i")), this._weekdaysParse[i].test(n)) return i
				},
				_longDateFormat: {
					LTS: "h:mm:ss A",
					LT: "h:mm A",
					L: "MM/DD/YYYY",
					LL: "MMMM D, YYYY",
					LLL: "MMMM D, YYYY LT",
					LLLL: "dddd, MMMM D, YYYY LT"
				},
				longDateFormat: function (n) {
					var t = this._longDateFormat[n];
					return !t && this._longDateFormat[n.toUpperCase()] && (t = this._longDateFormat[n.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (n) {
						return n.slice(1)
					}), this._longDateFormat[n] = t), t
				},
				isPM: function (n) {
					return (n + "").toLowerCase().charAt(0) === "p"
				},
				_meridiemParse: /[ap]\.?m?\.?/i,
				meridiem: function (n, t, i) {
					return n > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
				},
				_calendar: {
					sameDay: "[Today at] LT",
					nextDay: "[Tomorrow at] LT",
					nextWeek: "dddd [at] LT",
					lastDay: "[Yesterday at] LT",
					lastWeek: "[Last] dddd [at] LT",
					sameElse: "L"
				},
				calendar: function (n, t, i) {
					var r = this._calendar[n];
					return typeof r == "function" ? r.apply(t, [i]) : r
				},
				_relativeTime: {
					future: "in %s",
					past: "%s ago",
					s: "a few seconds",
					m: "a minute",
					mm: "%d minutes",
					h: "an hour",
					hh: "%d hours",
					d: "a day",
					dd: "%d days",
					M: "a month",
					MM: "%d months",
					y: "a year",
					yy: "%d years"
				},
				relativeTime: function (n, t, i, r) {
					var u = this._relativeTime[i];
					return typeof u == "function" ? u(n, t, i, r) : u.replace(/%d/i, n)
				},
				pastFuture: function (n, t) {
					var i = this._relativeTime[n > 0 ? "future" : "past"];
					return typeof i == "function" ? i(t) : i.replace(/%s/i, t)
				},
				ordinal: function (n) {
					return this._ordinal.replace("%d", n)
				},
				_ordinal: "%d",
				_ordinalParse: /\d{1,2}/,
				preparse: function (n) {
					return n
				},
				postformat: function (n) {
					return n
				},
				week: function (n) {
					return tt(n, this._week.dow, this._week.doy).week
				},
				_week: {
					dow: 0,
					doy: 6
				},
				firstDayOfWeek: function () {
					return this._week.dow
				},
				firstDayOfYear: function () {
					return this._week.doy
				},
				_invalidDate: "Invalid date",
				invalidDate: function () {
					return this._invalidDate
				}
			}), t = function (t, i, r, u) {
				var f;
				return typeof r == "boolean" && (u = r, r = n), f = {}, f._isAMomentObject = !0, f._i = t, f._f = i, f._l = r, f._strict = u, f._isUTC = !1, f._pf = vt(), ar(f)
			}, t.suppressDeprecationWarnings = !1, t.createFromInputFallback = o("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (n) {
				n._d = new Date(n._i + (n._useUTC ? " UTC" : ""))
			}), t.min = function () {
				var n = [].slice.call(arguments, 0);
				return vr("isBefore", n)
			}, t.max = function () {
				var n = [].slice.call(arguments, 0);
				return vr("isAfter", n)
			}, t.utc = function (t, i, r, u) {
				var f;
				return typeof r == "boolean" && (u = r, r = n), f = {}, f._isAMomentObject = !0, f._useUTC = !0, f._isUTC = !0, f._l = r, f._i = t, f._f = i, f._strict = u, f._pf = vt(), ar(f).utc()
			}, t.unix = function (n) {
				return t(n * 1e3)
			}, t.duration = function (n, r) {
				var u = n,
					e = null,
					o, c, h, l;
				return t.isDuration(n) ? u = {
					ms: n._milliseconds,
					d: n._days,
					M: n._months
				} : typeof n == "number" ? (u = {}, r ? u[r] = n : u.milliseconds = n) : (e = nu.exec(n)) ? (o = e[1] === "-" ? -1 : 1, u = {
					y: 0,
					d: i(e[s]) * o,
					h: i(e[f]) * o,
					m: i(e[w]) * o,
					s: i(e[b]) * o,
					ms: i(e[k]) * o
				}) : (e = tu.exec(n)) ? (o = e[1] === "-" ? -1 : 1, h = function (n) {
					var t = n && parseFloat(n.replace(",", "."));
					return (isNaN(t) ? 0 : t) * o
				}, u = {
					y: h(e[2]),
					M: h(e[3]),
					d: h(e[4]),
					h: h(e[5]),
					m: h(e[6]),
					s: h(e[7]),
					w: h(e[8])
				}) : u == null ? u = {} : typeof u == "object" && ("from" in u || "to" in u) && (l = nf(t(u.from), t(u.to)), u = {}, u.ms = l.milliseconds, u.M = l.months), c = new yt(u), t.isDuration(n) && g(n, "_locale") && (c._locale = n._locale), c
			}, t.version = "2.9.0", t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", t.ISO_8601 = function () {}, t.momentProperties = ut, t.updateOffset = function () {}, t.relativeTimeThreshold = function (t, i) {
				return y[t] === n ? !1 : i === n ? y[t] : (y[t] = i, !0)
			}, t.lang = o("moment.lang is deprecated. Use moment.locale instead.", function (n, i) {
				return t.locale(n, i)
			}), t.locale = function (n, i) {
				var r;
				return n && (r = typeof i != "undefined" ? t.defineLocale(n, i) : t.localeData(n), r && (t.duration._locale = t._locale = r)), t._locale._abbr
			}, t.defineLocale = function (n, i) {
				return i !== null ? (i.abbr = n, d[n] || (d[n] = new bi), d[n].set(i), t.locale(n), d[n]) : (delete d[n], null)
			}, t.langData = o("moment.langData is deprecated. Use moment.localeData instead.", function (n) {
				return t.localeData(n)
			}), t.localeData = function (n) {
				var i;
				if (n && n._locale && n._locale._abbr && (n = n._locale._abbr), !n) return t._locale;
				if (!ot(n)) {
					if (i = hr(n), i) return i;
					n = [n]
				}
				return rf(n)
			}, t.isMoment = function (n) {
				return n instanceof et || n != null && g(n, "_isAMomentObject")
			}, t.isDuration = function (n) {
				return n instanceof yt
			}, u = yi.length - 1; u >= 0; --u) tf(yi[u]);
		t.normalizeUnits = function (n) {
			return e(n)
		};
		t.invalid = function (n) {
			var i = t.utc(NaN);
			return n != null ? nt(i._pf, n) : i._pf.userInvalidated = !0, i
		};
		t.parseZone = function () {
			return t.apply(null, arguments).parseZone()
		};
		t.parseTwoDigitYear = function (n) {
			return i(n) + (i(n) > 68 ? 1900 : 2e3)
		};
		t.isDate = pt;
		nt(t.fn = et.prototype, {
			clone: function () {
				return t(this)
			},
			valueOf: function () {
				return +this._d - (this._offset || 0) * 6e4
			},
			unix: function () {
				return Math.floor(+this / 1e3)
			},
			toString: function () {
				return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
			},
			toDate: function () {
				return this._offset ? new Date(+this) : this._d
			},
			toISOString: function () {
				var n = t(this).utc();
				return 0 < n.year() && n.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : kt(n, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : kt(n, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
			},
			toArray: function () {
				var n = this;
				return [n.year(), n.month(), n.date(), n.hours(), n.minutes(), n.seconds(), n.milliseconds()]
			},
			isValid: function () {
				return or(this)
			},
			isDSTShifted: function () {
				return this._a ? this.isValid() && tr(this._a, (this._isUTC ? t.utc(this._a) : t(this._a)).toArray()) > 0 : !1
			},
			parsingFlags: function () {
				return nt({}, this._pf)
			},
			invalidAt: function () {
				return this._pf.overflow
			},
			utc: function (n) {
				return this.utcOffset(0, n)
			},
			local: function (n) {
				return this._isUTC && (this.utcOffset(0, n), this._isUTC = !1, n && this.subtract(this._dateUtcOffset(), "m")), this
			},
			format: function (n) {
				var i = kt(this, n || t.defaultFormat);
				return this.localeData().postformat(i)
			},
			add: gi(1, "add"),
			subtract: gi(-1, "subtract"),
			diff: function (n, t, i) {
				var f = bt(n, this),
					o = (f.utcOffset() - this.utcOffset()) * 6e4,
					u, r;
				return t = e(t), t === "year" || t === "month" || t === "quarter" ? (r = du(this, f), t === "quarter" ? r = r / 3 : t === "year" && (r = r / 12)) : (u = this - f, r = t === "second" ? u / 1e3 : t === "minute" ? u / 6e4 : t === "hour" ? u / 36e5 : t === "day" ? (u - o) / 864e5 : t === "week" ? (u - o) / 6048e5 : u), i ? r : h(r)
			},
			from: function (n, i) {
				return t.duration({
					to: this,
					from: n
				}).locale(this.locale()).humanize(!i)
			},
			fromNow: function (n) {
				return this.from(t(), n)
			},
			calendar: function (n) {
				var r = n || t(),
					u = bt(r, this).startOf("day"),
					i = this.diff(u, "days", !0),
					f = i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse";
				return this.format(this.localeData().calendar(f, this, t(r)))
			},
			isLeapYear: function () {
				return fr(this.year())
			},
			isDST: function () {
				return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
			},
			day: function (n) {
				var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
				return n != null ? (n = kf(n, this.localeData()), this.add(n - t, "d")) : t
			},
			month: v("Month", !0),
			startOf: function (n) {
				n = e(n);
				switch (n) {
					case "year":
						this.month(0);
					case "quarter":
					case "month":
						this.date(1);
					case "week":
					case "isoWeek":
					case "day":
						this.hours(0);
					case "hour":
						this.minutes(0);
					case "minute":
						this.seconds(0);
					case "second":
						this.milliseconds(0)
				}
				return n === "week" ? this.weekday(0) : n === "isoWeek" && this.isoWeekday(1), n === "quarter" && this.month(Math.floor(this.month() / 3) * 3), this
			},
			endOf: function (t) {
				return (t = e(t), t === n || t === "millisecond") ? this : this.startOf(t).add(1, t === "isoWeek" ? "week" : t).subtract(1, "ms")
			},
			isAfter: function (n, i) {
				var r;
				return i = e(typeof i != "undefined" ? i : "millisecond"), i === "millisecond" ? (n = t.isMoment(n) ? n : t(n), +this > +n) : (r = t.isMoment(n) ? +n : +t(n), r < +this.clone().startOf(i))
			},
			isBefore: function (n, i) {
				var r;
				return i = e(typeof i != "undefined" ? i : "millisecond"), i === "millisecond" ? (n = t.isMoment(n) ? n : t(n), +this < +n) : (r = t.isMoment(n) ? +n : +t(n), +this.clone().endOf(i) < r)
			},
			isBetween: function (n, t, i) {
				return this.isAfter(n, i) && this.isBefore(t, i)
			},
			isSame: function (n, i) {
				var r;
				return i = e(i || "millisecond"), i === "millisecond" ? (n = t.isMoment(n) ? n : t(n), +this == +n) : (r = +t(n), +this.clone().startOf(i) <= r && r <= +this.clone().endOf(i))
			},
			min: o("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function (n) {
				return n = t.apply(null, arguments), n < this ? this : n
			}),
			max: o("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function (n) {
				return n = t.apply(null, arguments), n > this ? this : n
			}),
			zone: o("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function (n, t) {
				return n != null ? (typeof n != "string" && (n = -n), this.utcOffset(n, t), this) : -this.utcOffset()
			}),
			utcOffset: function (n, i) {
				var r = this._offset || 0,
					u;
				return n != null ? (typeof n == "string" && (n = dt(n)), Math.abs(n) < 16 && (n = n * 60), !this._isUTC && i && (u = this._dateUtcOffset()), this._offset = n, this._isUTC = !0, u != null && this.add(u, "m"), r !== n && (!i || this._changeInProgress ? nr(this, t.duration(n - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? r : this._dateUtcOffset()
			},
			isLocal: function () {
				return !this._isUTC
			},
			isUtcOffset: function () {
				return this._isUTC
			},
			isUtc: function () {
				return this._isUTC && this._offset === 0
			},
			zoneAbbr: function () {
				return this._isUTC ? "UTC" : ""
			},
			zoneName: function () {
				return this._isUTC ? "Coordinated Universal Time" : ""
			},
			parseZone: function () {
				return this._tzm ? this.utcOffset(this._tzm) : typeof this._i == "string" && this.utcOffset(dt(this._i)), this
			},
			hasAlignedHourOffset: function (n) {
				return n = n ? t(n).utcOffset() : 0, (this.utcOffset() - n) % 60 == 0
			},
			daysInMonth: function () {
				return wt(this.year(), this.month())
			},
			dayOfYear: function (n) {
				var i = p((t(this).startOf("day") - t(this).startOf("year")) / 864e5) + 1;
				return n == null ? i : this.add(n - i, "d")
			},
			quarter: function (n) {
				return n == null ? Math.ceil((this.month() + 1) / 3) : this.month((n - 1) * 3 + this.month() % 3)
			},
			weekYear: function (n) {
				var t = tt(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
				return n == null ? t : this.add(n - t, "y")
			},
			isoWeekYear: function (n) {
				var t = tt(this, 1, 4).year;
				return n == null ? t : this.add(n - t, "y")
			},
			week: function (n) {
				var t = this.localeData().week(this);
				return n == null ? t : this.add((n - t) * 7, "d")
			},
			isoWeek: function (n) {
				var t = tt(this, 1, 4).week;
				return n == null ? t : this.add((n - t) * 7, "d")
			},
			weekday: function (n) {
				var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
				return n == null ? t : this.add(n - t, "d")
			},
			isoWeekday: function (n) {
				return n == null ? this.day() || 7 : this.day(this.day() % 7 ? n : n - 7)
			},
			isoWeeksInYear: function () {
				return rr(this.year(), 1, 4)
			},
			weeksInYear: function () {
				var n = this.localeData()._week;
				return rr(this.year(), n.dow, n.doy)
			},
			get: function (n) {
				return n = e(n), this[n]()
			},
			set: function (n, t) {
				var i;
				if (typeof n == "object")
					for (i in n) this.set(i, n[i]);
				else n = e(n), typeof this[n] == "function" && this[n](t);
				return this
			},
			locale: function (i) {
				var r;
				return i === n ? this._locale._abbr : (r = t.localeData(i), r != null && (this._locale = r), this)
			},
			lang: o("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
				return t === n ? this.localeData() : this.locale(t)
			}),
			localeData: function () {
				return this._locale
			},
			_dateUtcOffset: function () {
				return -Math.round(this._d.getTimezoneOffset() / 15) * 15
			}
		});
		t.fn.millisecond = t.fn.milliseconds = v("Milliseconds", !1);
		t.fn.second = t.fn.seconds = v("Seconds", !1);
		t.fn.minute = t.fn.minutes = v("Minutes", !1);
		t.fn.hour = t.fn.hours = v("Hours", !0);
		t.fn.date = v("Date", !0);
		t.fn.dates = o("dates accessor is deprecated. Use date instead.", v("Date", !0));
		t.fn.year = v("FullYear", !0);
		t.fn.years = o("years accessor is deprecated. Use year instead.", v("FullYear", !0));
		t.fn.days = t.fn.day;
		t.fn.months = t.fn.month;
		t.fn.weeks = t.fn.week;
		t.fn.isoWeeks = t.fn.isoWeek;
		t.fn.quarters = t.fn.quarter;
		t.fn.toJSON = t.fn.toISOString;
		t.fn.isUTC = t.fn.isUtc;
		nt(t.duration.fn = yt.prototype, {
			_bubble: function () {
				var o = this._milliseconds,
					t = this._days,
					i = this._months,
					n = this._data,
					u, f, e, r = 0;
				n.milliseconds = o % 1e3;
				u = h(o / 1e3);
				n.seconds = u % 60;
				f = h(u / 60);
				n.minutes = f % 60;
				e = h(f / 60);
				n.hours = e % 24;
				t += h(e / 24);
				r = h(wr(t));
				t -= h(br(r));
				i += h(t / 30);
				t %= 30;
				r += h(i / 12);
				i %= 12;
				n.days = t;
				n.months = i;
				n.years = r
			},
			abs: function () {
				return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
			},
			weeks: function () {
				return h(this.days() / 7)
			},
			valueOf: function () {
				return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + i(this._months / 12) * 31536e6
			},
			humanize: function (n) {
				var t = gf(this, !n, this.localeData());
				return n && (t = this.localeData().pastFuture(+this, t)), this.localeData().postformat(t)
			},
			add: function (n, i) {
				var r = t.duration(n, i);
				return this._milliseconds += r._milliseconds, this._days += r._days, this._months += r._months, this._bubble(), this
			},
			subtract: function (n, i) {
				var r = t.duration(n, i);
				return this._milliseconds -= r._milliseconds, this._days -= r._days, this._months -= r._months, this._bubble(), this
			},
			get: function (n) {
				return n = e(n), this[n.toLowerCase() + "s"]()
			},
			as: function (n) {
				var t, i;
				if (n = e(n), n === "month" || n === "year") return t = this._days + this._milliseconds / 864e5, i = this._months + wr(t) * 12, n === "month" ? i : i / 12;
				t = this._days + Math.round(br(this._months / 12));
				switch (n) {
					case "week":
						return t / 7 + this._milliseconds / 6048e5;
					case "day":
						return t + this._milliseconds / 864e5;
					case "hour":
						return t * 24 + this._milliseconds / 36e5;
					case "minute":
						return t * 1440 + this._milliseconds / 6e4;
					case "second":
						return t * 86400 + this._milliseconds / 1e3;
					case "millisecond":
						return Math.floor(t * 864e5) + this._milliseconds;
					default:
						throw new Error("Unknown unit " + n);
				}
			},
			lang: t.fn.lang,
			locale: t.fn.locale,
			toIsoString: o("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function () {
				return this.toISOString()
			}),
			toISOString: function () {
				var r = Math.abs(this.years()),
					u = Math.abs(this.months()),
					f = Math.abs(this.days()),
					n = Math.abs(this.hours()),
					t = Math.abs(this.minutes()),
					i = Math.abs(this.seconds() + this.milliseconds() / 1e3);
				return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (r ? r + "Y" : "") + (u ? u + "M" : "") + (f ? f + "D" : "") + (n || t || i ? "T" : "") + (n ? n + "H" : "") + (t ? t + "M" : "") + (i ? i + "S" : "") : "P0D"
			},
			localeData: function () {
				return this._locale
			},
			toJSON: function () {
				return this.toISOString()
			}
		});
		t.duration.fn.toString = t.duration.fn.toISOString;
		for (u in ci) g(ci, u) && te(u.toLowerCase());
		t.duration.fn.asMilliseconds = function () {
			return this.as("ms")
		};
		t.duration.fn.asSeconds = function () {
			return this.as("s")
		};
		t.duration.fn.asMinutes = function () {
			return this.as("m")
		};
		t.duration.fn.asHours = function () {
			return this.as("h")
		};
		t.duration.fn.asDays = function () {
			return this.as("d")
		};
		t.duration.fn.asWeeks = function () {
			return this.as("weeks")
		};
		t.duration.fn.asMonths = function () {
			return this.as("M")
		};
		t.duration.fn.asYears = function () {
			return this.as("y")
		};
		t.locale("en", {
			ordinalParse: /\d{1,2}(th|st|nd|rd)/,
			ordinal: function (n) {
				var t = n % 10,
					r = i(n % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
				return n + r
			}
		});
		ui ? module.exports = t : typeof define == "function" && define.amd ? (define(function (n, i, r) {
			return r.config && r.config() && r.config().noGlobal === !0 && (rt.moment = ri), t
		}), kr(!0)) : kr()
	}.call(this);
! function (n) {
	"use strict";
	if ("function" == typeof define && define.amd) define(["jquery", "moment"], n);
	else if ("object" == typeof exports) module.exports = n(require("jquery"), require("moment"));
	else {
		if ("undefined" == typeof jQuery) throw "bootstrap-datetimepicker requires jQuery to be loaded first";
		if ("undefined" == typeof moment) throw "bootstrap-datetimepicker requires Moment.js to be loaded first";
		n(jQuery, moment)
	}
}(function (n, t) {
	"use strict";
	if (!t) throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");
	var i = function (i, r) {
		var e, o, s, k, y, rt, b, u = {},
			d = !0,
			l = !1,
			f = !1,
			nt = 0,
			ot = [{
				clsName: "days",
				navFnc: "M",
				navStep: 1
			}, {
				clsName: "months",
				navFnc: "y",
				navStep: 1
			}, {
				clsName: "years",
				navFnc: "y",
				navStep: 10
			}, {
				clsName: "decades",
				navFnc: "y",
				navStep: 100
			}],
			vt = ["days", "months", "years", "decades"],
			bt = ["top", "bottom", "auto"],
			kt = ["left", "right", "auto"],
			dt = ["default", "top", "bottom"],
			gt = {
				up: 38,
				38: "up",
				down: 40,
				40: "down",
				left: 37,
				37: "left",
				right: 39,
				39: "right",
				tab: 9,
				9: "tab",
				escape: 27,
				27: "escape",
				enter: 13,
				13: "enter",
				pageUp: 33,
				33: "pageUp",
				pageDown: 34,
				34: "pageDown",
				shift: 16,
				16: "shift",
				control: 17,
				17: "control",
				space: 32,
				32: "space",
				t: 84,
				84: "t",
				"delete": 46,
				46: "delete"
			},
			st = {},
			yt = function () {
				return void 0 !== t.tz && void 0 !== r.timeZone && null !== r.timeZone && "" !== r.timeZone
			},
			g = function (n) {
				var i;
				return i = void 0 === n || null === n ? t() : t.isDate(n) || t.isMoment(n) ? t(n) : yt() ? t.tz(n, rt, r.useStrict, r.timeZone) : t(n, rt, r.useStrict), yt() && i.tz(r.timeZone), i
			},
			p = function (n) {
				if ("string" != typeof n || n.length > 1) throw new TypeError("isEnabled expects a single character string parameter");
				switch (n) {
					case "y":
						return y.indexOf("Y") !== -1;
					case "M":
						return y.indexOf("M") !== -1;
					case "d":
						return y.toLowerCase().indexOf("d") !== -1;
					case "h":
					case "H":
						return y.toLowerCase().indexOf("h") !== -1;
					case "m":
						return y.indexOf("m") !== -1;
					case "s":
						return y.indexOf("s") !== -1;
					default:
						return !1
				}
			},
			ht = function () {
				return p("h") || p("m") || p("s")
			},
			ct = function () {
				return p("y") || p("M") || p("d")
			},
			ei = function () {
				var t = n("<thead>").append(n("<tr>").append(n("<th>").addClass("prev").attr("data-action", "previous").append(n("<span>").addClass(r.icons.previous))).append(n("<th>").addClass("picker-switch").attr("data-action", "pickerSwitch").attr("colspan", r.calendarWeeks ? "6" : "5")).append(n("<th>").addClass("next").attr("data-action", "next").append(n("<span>").addClass(r.icons.next)))),
					i = n("<tbody>").append(n("<tr>").append(n("<td>").attr("colspan", r.calendarWeeks ? "8" : "7")));
				return [n("<div>").addClass("datepicker-days").append(n("<table>").addClass("table-condensed").append(t).append(n("<tbody>"))), n("<div>").addClass("datepicker-months").append(n("<table>").addClass("table-condensed").append(t.clone()).append(i.clone())), n("<div>").addClass("datepicker-years").append(n("<table>").addClass("table-condensed").append(t.clone()).append(i.clone())), n("<div>").addClass("datepicker-decades").append(n("<table>").addClass("table-condensed").append(t.clone()).append(i.clone()))]
			},
			oi = function () {
				var t = n("<tr>"),
					i = n("<tr>"),
					u = n("<tr>");
				return p("h") && (t.append(n("<td>").append(n("<a>").attr({
					href: "#",
					tabindex: "-1",
					title: r.tooltips.incrementHour
				}).addClass("btn").attr("data-action", "incrementHours").append(n("<span>").addClass(r.icons.up)))), i.append(n("<td>").append(n("<span>").addClass("timepicker-hour").attr({
					"data-time-component": "hours",
					title: r.tooltips.pickHour
				}).attr("data-action", "showHours"))), u.append(n("<td>").append(n("<a>").attr({
					href: "#",
					tabindex: "-1",
					title: r.tooltips.decrementHour
				}).addClass("btn").attr("data-action", "decrementHours").append(n("<span>").addClass(r.icons.down))))), p("m") && (p("h") && (t.append(n("<td>").addClass("separator")), i.append(n("<td>").addClass("separator").html(":")), u.append(n("<td>").addClass("separator"))), t.append(n("<td>").append(n("<a>").attr({
					href: "#",
					tabindex: "-1",
					title: r.tooltips.incrementMinute
				}).addClass("btn").attr("data-action", "incrementMinutes").append(n("<span>").addClass(r.icons.up)))), i.append(n("<td>").append(n("<span>").addClass("timepicker-minute").attr({
					"data-time-component": "minutes",
					title: r.tooltips.pickMinute
				}).attr("data-action", "showMinutes"))), u.append(n("<td>").append(n("<a>").attr({
					href: "#",
					tabindex: "-1",
					title: r.tooltips.decrementMinute
				}).addClass("btn").attr("data-action", "decrementMinutes").append(n("<span>").addClass(r.icons.down))))), p("s") && (p("m") && (t.append(n("<td>").addClass("separator")), i.append(n("<td>").addClass("separator").html(":")), u.append(n("<td>").addClass("separator"))), t.append(n("<td>").append(n("<a>").attr({
					href: "#",
					tabindex: "-1",
					title: r.tooltips.incrementSecond
				}).addClass("btn").attr("data-action", "incrementSeconds").append(n("<span>").addClass(r.icons.up)))), i.append(n("<td>").append(n("<span>").addClass("timepicker-second").attr({
					"data-time-component": "seconds",
					title: r.tooltips.pickSecond
				}).attr("data-action", "showSeconds"))), u.append(n("<td>").append(n("<a>").attr({
					href: "#",
					tabindex: "-1",
					title: r.tooltips.decrementSecond
				}).addClass("btn").attr("data-action", "decrementSeconds").append(n("<span>").addClass(r.icons.down))))), k || (t.append(n("<td>").addClass("separator")), i.append(n("<td>").append(n("<button>").addClass("btn btn-primary").attr({
					"data-action": "togglePeriod",
					tabindex: "-1",
					title: r.tooltips.togglePeriod
				}))), u.append(n("<td>").addClass("separator"))), n("<div>").addClass("timepicker-picker").append(n("<table>").addClass("table-condensed").append([t, i, u]))
			},
			si = function () {
				var i = n("<div>").addClass("timepicker-hours").append(n("<table>").addClass("table-condensed")),
					r = n("<div>").addClass("timepicker-minutes").append(n("<table>").addClass("table-condensed")),
					u = n("<div>").addClass("timepicker-seconds").append(n("<table>").addClass("table-condensed")),
					t = [oi()];
				return p("h") && t.push(i), p("m") && t.push(r), p("s") && t.push(u), t
			},
			hi = function () {
				var t = [];
				return r.showTodayButton && t.push(n("<td>").append(n("<a>").attr({
					"data-action": "today",
					title: r.tooltips.today
				}).append(n("<span>").addClass(r.icons.today)))), !r.sideBySide && ct() && ht() && t.push(n("<td>").append(n("<a>").attr({
					"data-action": "togglePicker",
					title: r.tooltips.selectTime
				}).append(n("<span>").addClass(r.icons.time)))), r.showClear && t.push(n("<td>").append(n("<a>").attr({
					"data-action": "clear",
					title: r.tooltips.clear
				}).append(n("<span>").addClass(r.icons.clear)))), r.showClose && t.push(n("<td>").append(n("<a>").attr({
					"data-action": "close",
					title: r.tooltips.close
				}).append(n("<span>").addClass(r.icons.close)))), n("<table>").addClass("table-condensed").append(n("<tbody>").append(n("<tr>").append(t)))
			},
			ci = function () {
				var t = n("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),
					f = n("<div>").addClass("datepicker").append(ei()),
					e = n("<div>").addClass("timepicker").append(si()),
					i = n("<ul>").addClass("list-unstyled"),
					u = n("<li>").addClass("picker-switch" + (r.collapse ? " accordion-toggle" : "")).append(hi());
				return r.inline && t.removeClass("dropdown-menu"), k && t.addClass("usetwentyfour"), p("s") && !k && t.addClass("wider"), r.sideBySide && ct() && ht() ? (t.addClass("timepicker-sbs"), "top" === r.toolbarPlacement && t.append(u), t.append(n("<div>").addClass("row").append(f.addClass("col-md-6")).append(e.addClass("col-md-6"))), "bottom" === r.toolbarPlacement && t.append(u), t) : ("top" === r.toolbarPlacement && i.append(u), ct() && i.append(n("<li>").addClass(r.collapse && ht() ? "collapse in" : "").append(f)), "default" === r.toolbarPlacement && i.append(u), ht() && i.append(n("<li>").addClass(r.collapse && ct() ? "collapse" : "").append(e)), "bottom" === r.toolbarPlacement && i.append(u), t.append(i))
			},
			li = function () {
				var t, u = {};
				return t = i.is("input") || r.inline ? i.data() : i.find("input").data(), t.dateOptions && t.dateOptions instanceof Object && (u = n.extend(!0, u, t.dateOptions)), n.each(r, function (n) {
					var i = "date" + n.charAt(0).toUpperCase() + n.slice(1);
					void 0 !== t[i] && (u[n] = t[i])
				}), u
			},
			pt = function () {
				var t, o = (l || i).position(),
					s = (l || i).offset(),
					u = r.widgetPositioning.vertical,
					e = r.widgetPositioning.horizontal;
				if (r.widgetParent) t = r.widgetParent.append(f);
				else if (i.is("input")) t = i.after(f).parent();
				else {
					if (r.inline) return void(t = i.append(f));
					t = i;
					i.children().first().after(f)
				}
				if ("auto" === u && (u = s.top + 1.5 * f.height() >= n(window).height() + n(window).scrollTop() && f.height() + i.outerHeight() < s.top ? "top" : "bottom"), "auto" === e && (e = t.width() < s.left + f.outerWidth() / 2 && s.left + f.outerWidth() > n(window).width() ? "right" : "left"), "top" === u ? f.addClass("top").removeClass("bottom") : f.addClass("bottom").removeClass("top"), "right" === e ? f.addClass("pull-right") : f.removeClass("pull-right"), "static" === t.css("position") && (t = t.parents().filter(function () {
						return "static" !== n(this).css("position")
					}).first()), 0 === t.length) throw new Error("datetimepicker component should be placed within a non-static positioned container");
				f.css({
					top: "top" === u ? "auto" : o.top + i.outerHeight(),
					bottom: "top" === u ? t.outerHeight() - (t === i ? 0 : o.top) : "auto",
					left: "left" === e ? t === i ? 0 : o.left : "auto",
					right: "left" === e ? "auto" : t.outerWidth() - i.outerWidth() - (t === i ? 0 : o.left)
				})
			},
			it = function (n) {
				"dp.change" === n.type && (n.date && n.date.isSame(n.oldDate) || !n.date && !n.oldDate) || i.trigger(n)
			},
			ut = function (n) {
				"y" === n && (n = "YYYY");
				it({
					type: "dp.update",
					change: n,
					viewDate: o.clone()
				})
			},
			ft = function (n) {
				f && (n && (b = Math.max(nt, Math.min(3, b + n))), f.find(".datepicker > div").hide().filter(".datepicker-" + ot[b].clsName).show())
			},
			ai = function () {
				var t = n("<tr>"),
					i = o.clone().startOf("w").startOf("d");
				for (r.calendarWeeks === !0 && t.append(n("<th>").addClass("cw").text("#")); i.isBefore(o.clone().endOf("w"));) t.append(n("<th>").addClass("dow").text(i.format("dd"))), i.add(1, "d");
				f.find(".datepicker-days thead").append(t)
			},
			vi = function (n) {
				return r.disabledDates[n.format("YYYY-MM-DD")] === !0
			},
			yi = function (n) {
				return r.enabledDates[n.format("YYYY-MM-DD")] === !0
			},
			pi = function (n) {
				return r.disabledHours[n.format("H")] === !0
			},
			wi = function (n) {
				return r.enabledHours[n.format("H")] === !0
			},
			c = function (t, i) {
				if (!t.isValid() || r.disabledDates && "d" === i && vi(t) || r.enabledDates && "d" === i && !yi(t) || r.minDate && t.isBefore(r.minDate, i) || r.maxDate && t.isAfter(r.maxDate, i) || r.daysOfWeekDisabled && "d" === i && r.daysOfWeekDisabled.indexOf(t.day()) !== -1 || r.disabledHours && ("h" === i || "m" === i || "s" === i) && pi(t) || r.enabledHours && ("h" === i || "m" === i || "s" === i) && !wi(t)) return !1;
				if (r.disabledTimeIntervals && ("h" === i || "m" === i || "s" === i)) {
					var u = !1;
					if (n.each(r.disabledTimeIntervals, function () {
							if (t.isBetween(this[0], this[1])) return u = !0, !1
						}), u) return !1
				}
				return !0
			},
			bi = function () {
				for (var i = [], t = o.clone().startOf("y").startOf("d"); t.isSame(o, "y");) i.push(n("<span>").attr("data-action", "selectMonth").addClass("month").text(t.format("MMM"))), t.add(1, "M");
				f.find(".datepicker-months td").empty().append(i)
			},
			ki = function () {
				var i = f.find(".datepicker-months"),
					t = i.find("th"),
					u = i.find("tbody").find("span");
				t.eq(0).find("span").attr("title", r.tooltips.prevYear);
				t.eq(1).attr("title", r.tooltips.selectYear);
				t.eq(2).find("span").attr("title", r.tooltips.nextYear);
				i.find(".disabled").removeClass("disabled");
				c(o.clone().subtract(1, "y"), "y") || t.eq(0).addClass("disabled");
				t.eq(1).text(o.year());
				c(o.clone().add(1, "y"), "y") || t.eq(2).addClass("disabled");
				u.removeClass("active");
				e.isSame(o, "y") && !d && u.eq(e.month()).addClass("active");
				u.each(function (t) {
					c(o.clone().month(t), "M") || n(this).addClass("disabled")
				})
			},
			di = function () {
				var i = f.find(".datepicker-years"),
					t = i.find("th"),
					n = o.clone().subtract(5, "y"),
					u = o.clone().add(6, "y"),
					s = "";
				for (t.eq(0).find("span").attr("title", r.tooltips.prevDecade), t.eq(1).attr("title", r.tooltips.selectDecade), t.eq(2).find("span").attr("title", r.tooltips.nextDecade), i.find(".disabled").removeClass("disabled"), r.minDate && r.minDate.isAfter(n, "y") && t.eq(0).addClass("disabled"), t.eq(1).text(n.year() + "-" + u.year()), r.maxDate && r.maxDate.isBefore(u, "y") && t.eq(2).addClass("disabled"); !n.isAfter(u, "y");) s += '<span data-action="selectYear" class="year' + (n.isSame(e, "y") && !d ? " active" : "") + (c(n, "y") ? "" : " disabled") + '">' + n.year() + "<\/span>", n.add(1, "y");
				i.find("td").html(s)
			},
			gi = function () {
				var u, s = f.find(".datepicker-decades"),
					i = s.find("th"),
					n = t({
						y: o.year() - o.year() % 100 - 1
					}),
					h = n.clone().add(100, "y"),
					y = n.clone(),
					a = !1,
					v = !1,
					l = "";
				for (i.eq(0).find("span").attr("title", r.tooltips.prevCentury), i.eq(2).find("span").attr("title", r.tooltips.nextCentury), s.find(".disabled").removeClass("disabled"), (n.isSame(t({
						y: 1900
					})) || r.minDate && r.minDate.isAfter(n, "y")) && i.eq(0).addClass("disabled"), i.eq(1).text(n.year() + "-" + h.year()), (n.isSame(t({
						y: 2e3
					})) || r.maxDate && r.maxDate.isBefore(h, "y")) && i.eq(2).addClass("disabled"); !n.isAfter(h, "y");) u = n.year() + 12, a = r.minDate && r.minDate.isAfter(n, "y") && r.minDate.year() <= u, v = r.maxDate && r.maxDate.isAfter(n, "y") && r.maxDate.year() <= u, l += '<span data-action="selectDecade" class="decade' + (e.isAfter(n) && e.year() <= u ? " active" : "") + (c(n, "y") || a || v ? "" : " disabled") + '" data-selection="' + (n.year() + 6) + '">' + (n.year() + 1) + " - " + (n.year() + 12) + "<\/span>", n.add(12, "y");
				l += "<span><\/span><span><\/span><span><\/span>";
				s.find("td").html(l);
				i.eq(1).text(y.year() + 1 + "-" + n.year())
			},
			et = function () {
				var t, s, h, l = f.find(".datepicker-days"),
					u = l.find("th"),
					a = [],
					i = [];
				if (ct()) {
					for (u.eq(0).find("span").attr("title", r.tooltips.prevMonth), u.eq(1).attr("title", r.tooltips.selectMonth), u.eq(2).find("span").attr("title", r.tooltips.nextMonth), l.find(".disabled").removeClass("disabled"), u.eq(1).text(o.format(r.dayViewHeaderFormat)), c(o.clone().subtract(1, "M"), "M") || u.eq(0).addClass("disabled"), c(o.clone().add(1, "M"), "M") || u.eq(2).addClass("disabled"), t = o.clone().startOf("M").startOf("w").startOf("d"), h = 0; h < 42; h++) 0 === t.weekday() && (s = n("<tr>"), r.calendarWeeks && s.append('<td class="cw">' + t.week() + "<\/td>"), a.push(s)), i = ["day"], t.isBefore(o, "M") && i.push("old"), t.isAfter(o, "M") && i.push("new"), t.isSame(e, "d") && !d && i.push("active"), c(t, "d") || i.push("disabled"), t.isSame(g(), "d") && i.push("today"), 0 !== t.day() && 6 !== t.day() || i.push("weekend"), it({
						type: "dp.classify",
						date: t,
						classNames: i
					}), s.append('<td data-action="selectDay" data-day="' + t.format("L") + '" class="' + i.join(" ") + '">' + t.date() + "<\/td>"), t.add(1, "d");
					l.find("tbody").empty().append(a);
					ki();
					di();
					gi()
				}
			},
			nr = function () {
				var u = f.find(".timepicker-hours table"),
					t = o.clone().startOf("d"),
					r = [],
					i = n("<tr>");
				for (o.hour() > 11 && !k && t.hour(12); t.isSame(o, "d") && (k || o.hour() < 12 && t.hour() < 12 || o.hour() > 11);) t.hour() % 4 == 0 && (i = n("<tr>"), r.push(i)), i.append('<td data-action="selectHour" class="hour' + (c(t, "h") ? "" : " disabled") + '">' + t.format(k ? "HH" : "hh") + "<\/td>"), t.add(1, "h");
				u.empty().append(r)
			},
			tr = function () {
				for (var s = f.find(".timepicker-minutes table"), t = o.clone().startOf("h"), u = [], i = n("<tr>"), e = 1 === r.stepping ? 5 : r.stepping; o.isSame(t, "h");) t.minute() % (4 * e) == 0 && (i = n("<tr>"), u.push(i)), i.append('<td data-action="selectMinute" class="minute' + (c(t, "m") ? "" : " disabled") + '">' + t.format("mm") + "<\/td>"), t.add(e, "m");
				s.empty().append(u)
			},
			ir = function () {
				for (var u = f.find(".timepicker-seconds table"), t = o.clone().startOf("m"), r = [], i = n("<tr>"); o.isSame(t, "m");) t.second() % 20 == 0 && (i = n("<tr>"), r.push(i)), i.append('<td data-action="selectSecond" class="second' + (c(t, "s") ? "" : " disabled") + '">' + t.format("ss") + "<\/td>"), t.add(5, "s");
				u.empty().append(r)
			},
			rr = function () {
				var n, i, t = f.find(".timepicker span[data-time-component]");
				k || (n = f.find(".timepicker [data-action=togglePeriod]"), i = e.clone().add(e.hours() >= 12 ? -12 : 12, "h"), n.text(e.format("A")), c(i, "h") ? n.removeClass("disabled") : n.addClass("disabled"));
				t.filter("[data-time-component=hours]").text(e.format(k ? "HH" : "hh"));
				t.filter("[data-time-component=minutes]").text(e.format("mm"));
				t.filter("[data-time-component=seconds]").text(e.format("ss"));
				nr();
				tr();
				ir()
			},
			a = function () {
				f && (et(), rr())
			},
			h = function (n) {
				var t = d ? null : e;
				if (!n) return d = !0, s.val(""), i.data("date", ""), it({
					type: "dp.change",
					date: !1,
					oldDate: t
				}), void a();
				if (n = n.clone().locale(r.locale), yt() && n.tz(r.timeZone), 1 !== r.stepping)
					for (n.minutes(Math.round(n.minutes() / r.stepping) * r.stepping).seconds(0); r.minDate && n.isBefore(r.minDate);) n.add(r.stepping, "minutes");
				c(n) ? (e = n, o = e.clone(), s.val(e.format(y)), i.data("date", e.format(y)), d = !1, a(), it({
					type: "dp.change",
					date: e.clone(),
					oldDate: t
				})) : (r.keepInvalid ? it({
					type: "dp.change",
					date: n,
					oldDate: t
				}) : s.val(d ? "" : e.format(y)), it({
					type: "dp.error",
					date: n,
					oldDate: t
				}))
			},
			v = function () {
				var t = !1;
				return f ? (f.find(".collapse").each(function () {
					var i = n(this).data("collapse");
					return !i || !i.transitioning || (t = !0, !1)
				}), t ? u : (l && l.hasClass("btn") && l.toggleClass("active"), f.hide(), n(window).off("resize", pt), f.off("click", "[data-action]"), f.off("mousedown", !1), f.remove(), f = !1, it({
					type: "dp.hide",
					date: e.clone()
				}), s.blur(), b = 0, o = e.clone(), u)) : u
			},
			ni = function () {
				h(null)
			},
			tt = function (n) {
				return void 0 === r.parseInputDate ? (!t.isMoment(n) || n instanceof Date) && (n = g(n)) : n = r.parseInputDate(n), n
			},
			lt = {
				next: function () {
					var n = ot[b].navFnc;
					o.add(ot[b].navStep, n);
					et();
					ut(n)
				},
				previous: function () {
					var n = ot[b].navFnc;
					o.subtract(ot[b].navStep, n);
					et();
					ut(n)
				},
				pickerSwitch: function () {
					ft(1)
				},
				selectMonth: function (t) {
					var i = n(t.target).closest("tbody").find("span").index(n(t.target));
					o.month(i);
					b === nt ? (h(e.clone().year(o.year()).month(o.month())), r.inline || v()) : (ft(-1), et());
					ut("M")
				},
				selectYear: function (t) {
					var i = parseInt(n(t.target).text(), 10) || 0;
					o.year(i);
					b === nt ? (h(e.clone().year(o.year())), r.inline || v()) : (ft(-1), et());
					ut("YYYY")
				},
				selectDecade: function (t) {
					var i = parseInt(n(t.target).data("selection"), 10) || 0;
					o.year(i);
					b === nt ? (h(e.clone().year(o.year())), r.inline || v()) : (ft(-1), et());
					ut("YYYY")
				},
				selectDay: function (t) {
					var i = o.clone();
					n(t.target).is(".old") && i.subtract(1, "M");
					n(t.target).is(".new") && i.add(1, "M");
					h(i.date(parseInt(n(t.target).text(), 10)));
					ht() || r.keepOpen || r.inline || v()
				},
				incrementHours: function () {
					var n = e.clone().add(1, "h");
					c(n, "h") && h(n)
				},
				incrementMinutes: function () {
					var n = e.clone().add(r.stepping, "m");
					c(n, "m") && h(n)
				},
				incrementSeconds: function () {
					var n = e.clone().add(1, "s");
					c(n, "s") && h(n)
				},
				decrementHours: function () {
					var n = e.clone().subtract(1, "h");
					c(n, "h") && h(n)
				},
				decrementMinutes: function () {
					var n = e.clone().subtract(r.stepping, "m");
					c(n, "m") && h(n)
				},
				decrementSeconds: function () {
					var n = e.clone().subtract(1, "s");
					c(n, "s") && h(n)
				},
				togglePeriod: function () {
					h(e.clone().add(e.hours() >= 12 ? -12 : 12, "h"))
				},
				togglePicker: function (t) {
					var f, u = n(t.target),
						e = u.closest("ul"),
						i = e.find(".in"),
						o = e.find(".collapse:not(.in)");
					if (i && i.length) {
						if (f = i.data("collapse"), f && f.transitioning) return;
						i.collapse ? (i.collapse("hide"), o.collapse("show")) : (i.removeClass("in"), o.addClass("in"));
						u.is("span") ? u.toggleClass(r.icons.time + " " + r.icons.date) : u.find("span").toggleClass(r.icons.time + " " + r.icons.date)
					}
				},
				showPicker: function () {
					f.find(".timepicker > div:not(.timepicker-picker)").hide();
					f.find(".timepicker .timepicker-picker").show()
				},
				showHours: function () {
					f.find(".timepicker .timepicker-picker").hide();
					f.find(".timepicker .timepicker-hours").show()
				},
				showMinutes: function () {
					f.find(".timepicker .timepicker-picker").hide();
					f.find(".timepicker .timepicker-minutes").show()
				},
				showSeconds: function () {
					f.find(".timepicker .timepicker-picker").hide();
					f.find(".timepicker .timepicker-seconds").show()
				},
				selectHour: function (t) {
					var i = parseInt(n(t.target).text(), 10);
					k || (e.hours() >= 12 ? 12 !== i && (i += 12) : 12 === i && (i = 0));
					h(e.clone().hours(i));
					lt.showPicker.call(u)
				},
				selectMinute: function (t) {
					h(e.clone().minutes(parseInt(n(t.target).text(), 10)));
					lt.showPicker.call(u)
				},
				selectSecond: function (t) {
					h(e.clone().seconds(parseInt(n(t.target).text(), 10)));
					lt.showPicker.call(u)
				},
				clear: ni,
				today: function () {
					var n = g();
					c(n, "d") && h(n)
				},
				close: v
			},
			ur = function (t) {
				return !n(t.currentTarget).is(".disabled") && (lt[n(t.currentTarget).data("action")].apply(u, arguments), !1)
			},
			w = function () {
				var t, i = {
					year: function (n) {
						return n.month(0).date(1).hours(0).seconds(0).minutes(0)
					},
					month: function (n) {
						return n.date(1).hours(0).seconds(0).minutes(0)
					},
					day: function (n) {
						return n.hours(0).seconds(0).minutes(0)
					},
					hour: function (n) {
						return n.seconds(0).minutes(0)
					},
					minute: function (n) {
						return n.seconds(0)
					}
				};
				return s.prop("disabled") || !r.ignoreReadonly && s.prop("readonly") || f ? u : (void 0 !== s.val() && 0 !== s.val().trim().length ? h(tt(s.val().trim())) : d && r.useCurrent && (r.inline || s.is("input") && 0 === s.val().trim().length) && (t = g(), "string" == typeof r.useCurrent && (t = i[r.useCurrent](t)), h(t)), f = ci(), ai(), bi(), f.find(".timepicker-hours").hide(), f.find(".timepicker-minutes").hide(), f.find(".timepicker-seconds").hide(), a(), ft(), n(window).on("resize", pt), f.on("click", "[data-action]", ur), f.on("mousedown", !1), l && l.hasClass("btn") && l.toggleClass("active"), pt(), f.show(), r.focusOnShow && !s.is(":focus") && s.focus(), it({
					type: "dp.show"
				}), u)
			},
			wt = function () {
				return f ? v() : w()
			},
			ti = function (n) {
				var t, e, i, o, s = null,
					c = [],
					l = {},
					h = n.which,
					a = "p";
				st[h] = a;
				for (t in st) st.hasOwnProperty(t) && st[t] === a && (c.push(t), parseInt(t, 10) !== h && (l[t] = !0));
				for (t in r.keyBinds)
					if (r.keyBinds.hasOwnProperty(t) && "function" == typeof r.keyBinds[t] && (i = t.split(" "), i.length === c.length && gt[h] === i[i.length - 1])) {
						for (o = !0, e = i.length - 2; e >= 0; e--)
							if (!(gt[i[e]] in l)) {
								o = !1;
								break
							}
						if (o) {
							s = r.keyBinds[t];
							break
						}
					}
				s && (s.call(u, f), n.stopPropagation(), n.preventDefault())
			},
			ii = function (n) {
				st[n.which] = "r";
				n.stopPropagation();
				n.preventDefault()
			},
			ri = function (t) {
				var i = n(t.target).val().trim(),
					r = i ? tt(i) : null;
				return h(r), t.stopImmediatePropagation(), !1
			},
			fr = function () {
				s.on({
					change: ri,
					blur: r.debug ? "" : v,
					keydown: ti,
					keyup: ii,
					focus: r.allowInputToggle ? w : ""
				});
				i.is("input") ? s.on({
					focus: w
				}) : l && (l.on("click", wt), l.on("mousedown", !1))
			},
			er = function () {
				s.off({
					change: ri,
					blur: blur,
					keydown: ti,
					keyup: ii,
					focus: r.allowInputToggle ? v : ""
				});
				i.is("input") ? s.off({
					focus: w
				}) : l && (l.off("click", wt), l.off("mousedown", !1))
			},
			ui = function (t) {
				var i = {};
				return n.each(t, function () {
					var n = tt(this);
					n.isValid() && (i[n.format("YYYY-MM-DD")] = !0)
				}), !!Object.keys(i).length && i
			},
			fi = function (t) {
				var i = {};
				return n.each(t, function () {
					i[this] = !0
				}), !!Object.keys(i).length && i
			},
			at = function () {
				var n = r.format || "L LT";
				y = n.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (n) {
					var t = e.localeData().longDateFormat(n) || n;
					return t.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (n) {
						return e.localeData().longDateFormat(n) || n
					})
				});
				rt = r.extraFormats ? r.extraFormats.slice() : [];
				rt.indexOf(n) < 0 && rt.indexOf(y) < 0 && rt.push(y);
				k = y.toLowerCase().indexOf("a") < 1 && y.replace(/\[.*?\]/g, "").indexOf("h") < 1;
				p("y") && (nt = 2);
				p("M") && (nt = 1);
				p("d") && (nt = 0);
				b = Math.max(nt, b);
				d || h(e)
			};
		if (u.destroy = function () {
				v();
				er();
				i.removeData("DateTimePicker");
				i.removeData("date")
			}, u.toggle = wt, u.show = w, u.hide = v, u.disable = function () {
				return v(), l && l.hasClass("btn") && l.addClass("disabled"), s.prop("disabled", !0), u
			}, u.enable = function () {
				return l && l.hasClass("btn") && l.removeClass("disabled"), s.prop("disabled", !1), u
			}, u.ignoreReadonly = function (n) {
				if (0 === arguments.length) return r.ignoreReadonly;
				if ("boolean" != typeof n) throw new TypeError("ignoreReadonly () expects a boolean parameter");
				return r.ignoreReadonly = n, u
			}, u.options = function (t) {
				if (0 === arguments.length) return n.extend(!0, {}, r);
				if (!(t instanceof Object)) throw new TypeError("options() options parameter should be an object");
				return n.extend(!0, r, t), n.each(r, function (n, t) {
					if (void 0 === u[n]) throw new TypeError("option " + n + " is not recognized!");
					u[n](t)
				}), u
			}, u.date = function (n) {
				if (0 === arguments.length) return d ? null : e.clone();
				if (!(null === n || "string" == typeof n || t.isMoment(n) || n instanceof Date)) throw new TypeError("date() parameter must be one of [null, string, moment or Date]");
				return h(null === n ? null : tt(n)), u
			}, u.format = function (n) {
				if (0 === arguments.length) return r.format;
				if ("string" != typeof n && ("boolean" != typeof n || n !== !1)) throw new TypeError("format() expects a string or boolean:false parameter " + n);
				return r.format = n, y && at(), u
			}, u.timeZone = function (n) {
				if (0 === arguments.length) return r.timeZone;
				if ("string" != typeof n) throw new TypeError("newZone() expects a string parameter");
				return r.timeZone = n, u
			}, u.dayViewHeaderFormat = function (n) {
				if (0 === arguments.length) return r.dayViewHeaderFormat;
				if ("string" != typeof n) throw new TypeError("dayViewHeaderFormat() expects a string parameter");
				return r.dayViewHeaderFormat = n, u
			}, u.extraFormats = function (n) {
				if (0 === arguments.length) return r.extraFormats;
				if (n !== !1 && !(n instanceof Array)) throw new TypeError("extraFormats() expects an array or false parameter");
				return r.extraFormats = n, rt && at(), u
			}, u.disabledDates = function (t) {
				if (0 === arguments.length) return r.disabledDates ? n.extend({}, r.disabledDates) : r.disabledDates;
				if (!t) return r.disabledDates = !1, a(), u;
				if (!(t instanceof Array)) throw new TypeError("disabledDates() expects an array parameter");
				return r.disabledDates = ui(t), r.enabledDates = !1, a(), u
			}, u.enabledDates = function (t) {
				if (0 === arguments.length) return r.enabledDates ? n.extend({}, r.enabledDates) : r.enabledDates;
				if (!t) return r.enabledDates = !1, a(), u;
				if (!(t instanceof Array)) throw new TypeError("enabledDates() expects an array parameter");
				return r.enabledDates = ui(t), r.disabledDates = !1, a(), u
			}, u.daysOfWeekDisabled = function (n) {
				if (0 === arguments.length) return r.daysOfWeekDisabled.splice(0);
				if ("boolean" == typeof n && !n) return r.daysOfWeekDisabled = !1, a(), u;
				if (!(n instanceof Array)) throw new TypeError("daysOfWeekDisabled() expects an array parameter");
				if (r.daysOfWeekDisabled = n.reduce(function (n, t) {
						return t = parseInt(t, 10), t > 6 || t < 0 || isNaN(t) ? n : (n.indexOf(t) === -1 && n.push(t), n)
					}, []).sort(), r.useCurrent && !r.keepInvalid) {
					for (var t = 0; !c(e, "d");) {
						if (e.add(1, "d"), 31 === t) throw "Tried 31 times to find a valid date";
						t++
					}
					h(e)
				}
				return a(), u
			}, u.maxDate = function (n) {
				if (0 === arguments.length) return r.maxDate ? r.maxDate.clone() : r.maxDate;
				if ("boolean" == typeof n && n === !1) return r.maxDate = !1, a(), u;
				"string" == typeof n && ("now" !== n && "moment" !== n || (n = g()));
				var t = tt(n);
				if (!t.isValid()) throw new TypeError("maxDate() Could not parse date parameter: " + n);
				if (r.minDate && t.isBefore(r.minDate)) throw new TypeError("maxDate() date parameter is before options.minDate: " + t.format(y));
				return r.maxDate = t, r.useCurrent && !r.keepInvalid && e.isAfter(n) && h(r.maxDate), o.isAfter(t) && (o = t.clone().subtract(r.stepping, "m")), a(), u
			}, u.minDate = function (n) {
				if (0 === arguments.length) return r.minDate ? r.minDate.clone() : r.minDate;
				if ("boolean" == typeof n && n === !1) return r.minDate = !1, a(), u;
				"string" == typeof n && ("now" !== n && "moment" !== n || (n = g()));
				var t = tt(n);
				if (!t.isValid()) throw new TypeError("minDate() Could not parse date parameter: " + n);
				if (r.maxDate && t.isAfter(r.maxDate)) throw new TypeError("minDate() date parameter is after options.maxDate: " + t.format(y));
				return r.minDate = t, r.useCurrent && !r.keepInvalid && e.isBefore(n) && h(r.minDate), o.isBefore(t) && (o = t.clone().add(r.stepping, "m")), a(), u
			}, u.defaultDate = function (n) {
				if (0 === arguments.length) return r.defaultDate ? r.defaultDate.clone() : r.defaultDate;
				if (!n) return r.defaultDate = !1, u;
				"string" == typeof n && (n = "now" === n || "moment" === n ? g() : g(n));
				var t = tt(n);
				if (!t.isValid()) throw new TypeError("defaultDate() Could not parse date parameter: " + n);
				if (!c(t)) throw new TypeError("defaultDate() date passed is invalid according to component setup validations");
				return r.defaultDate = t, (r.defaultDate && r.inline || "" === s.val().trim()) && h(r.defaultDate), u
			}, u.locale = function (n) {
				if (0 === arguments.length) return r.locale;
				if (!t.localeData(n)) throw new TypeError("locale() locale " + n + " is not loaded from moment locales!");
				return r.locale = n, e.locale(r.locale), o.locale(r.locale), y && at(), f && (v(), w()), u
			}, u.stepping = function (n) {
				return 0 === arguments.length ? r.stepping : (n = parseInt(n, 10), (isNaN(n) || n < 1) && (n = 1), r.stepping = n, u)
			}, u.useCurrent = function (n) {
				var t = ["year", "month", "day", "hour", "minute"];
				if (0 === arguments.length) return r.useCurrent;
				if ("boolean" != typeof n && "string" != typeof n) throw new TypeError("useCurrent() expects a boolean or string parameter");
				if ("string" == typeof n && t.indexOf(n.toLowerCase()) === -1) throw new TypeError("useCurrent() expects a string parameter of " + t.join(", "));
				return r.useCurrent = n, u
			}, u.collapse = function (n) {
				if (0 === arguments.length) return r.collapse;
				if ("boolean" != typeof n) throw new TypeError("collapse() expects a boolean parameter");
				return r.collapse === n ? u : (r.collapse = n, f && (v(), w()), u)
			}, u.icons = function (t) {
				if (0 === arguments.length) return n.extend({}, r.icons);
				if (!(t instanceof Object)) throw new TypeError("icons() expects parameter to be an Object");
				return n.extend(r.icons, t), f && (v(), w()), u
			}, u.tooltips = function (t) {
				if (0 === arguments.length) return n.extend({}, r.tooltips);
				if (!(t instanceof Object)) throw new TypeError("tooltips() expects parameter to be an Object");
				return n.extend(r.tooltips, t), f && (v(), w()), u
			}, u.useStrict = function (n) {
				if (0 === arguments.length) return r.useStrict;
				if ("boolean" != typeof n) throw new TypeError("useStrict() expects a boolean parameter");
				return r.useStrict = n, u
			}, u.sideBySide = function (n) {
				if (0 === arguments.length) return r.sideBySide;
				if ("boolean" != typeof n) throw new TypeError("sideBySide() expects a boolean parameter");
				return r.sideBySide = n, f && (v(), w()), u
			}, u.viewMode = function (n) {
				if (0 === arguments.length) return r.viewMode;
				if ("string" != typeof n) throw new TypeError("viewMode() expects a string parameter");
				if (vt.indexOf(n) === -1) throw new TypeError("viewMode() parameter must be one of (" + vt.join(", ") + ") value");
				return r.viewMode = n, b = Math.max(vt.indexOf(n), nt), ft(), u
			}, u.toolbarPlacement = function (n) {
				if (0 === arguments.length) return r.toolbarPlacement;
				if ("string" != typeof n) throw new TypeError("toolbarPlacement() expects a string parameter");
				if (dt.indexOf(n) === -1) throw new TypeError("toolbarPlacement() parameter must be one of (" + dt.join(", ") + ") value");
				return r.toolbarPlacement = n, f && (v(), w()), u
			}, u.widgetPositioning = function (t) {
				if (0 === arguments.length) return n.extend({}, r.widgetPositioning);
				if ("[object Object]" !== {}.toString.call(t)) throw new TypeError("widgetPositioning() expects an object variable");
				if (t.horizontal) {
					if ("string" != typeof t.horizontal) throw new TypeError("widgetPositioning() horizontal variable must be a string");
					if (t.horizontal = t.horizontal.toLowerCase(), kt.indexOf(t.horizontal) === -1) throw new TypeError("widgetPositioning() expects horizontal parameter to be one of (" + kt.join(", ") + ")");
					r.widgetPositioning.horizontal = t.horizontal
				}
				if (t.vertical) {
					if ("string" != typeof t.vertical) throw new TypeError("widgetPositioning() vertical variable must be a string");
					if (t.vertical = t.vertical.toLowerCase(), bt.indexOf(t.vertical) === -1) throw new TypeError("widgetPositioning() expects vertical parameter to be one of (" + bt.join(", ") + ")");
					r.widgetPositioning.vertical = t.vertical
				}
				return a(), u
			}, u.calendarWeeks = function (n) {
				if (0 === arguments.length) return r.calendarWeeks;
				if ("boolean" != typeof n) throw new TypeError("calendarWeeks() expects parameter to be a boolean value");
				return r.calendarWeeks = n, a(), u
			}, u.showTodayButton = function (n) {
				if (0 === arguments.length) return r.showTodayButton;
				if ("boolean" != typeof n) throw new TypeError("showTodayButton() expects a boolean parameter");
				return r.showTodayButton = n, f && (v(), w()), u
			}, u.showClear = function (n) {
				if (0 === arguments.length) return r.showClear;
				if ("boolean" != typeof n) throw new TypeError("showClear() expects a boolean parameter");
				return r.showClear = n, f && (v(), w()), u
			}, u.widgetParent = function (t) {
				if (0 === arguments.length) return r.widgetParent;
				if ("string" == typeof t && (t = n(t)), null !== t && "string" != typeof t && !(t instanceof n)) throw new TypeError("widgetParent() expects a string or a jQuery object parameter");
				return r.widgetParent = t, f && (v(), w()), u
			}, u.keepOpen = function (n) {
				if (0 === arguments.length) return r.keepOpen;
				if ("boolean" != typeof n) throw new TypeError("keepOpen() expects a boolean parameter");
				return r.keepOpen = n, u
			}, u.focusOnShow = function (n) {
				if (0 === arguments.length) return r.focusOnShow;
				if ("boolean" != typeof n) throw new TypeError("focusOnShow() expects a boolean parameter");
				return r.focusOnShow = n, u
			}, u.inline = function (n) {
				if (0 === arguments.length) return r.inline;
				if ("boolean" != typeof n) throw new TypeError("inline() expects a boolean parameter");
				return r.inline = n, u
			}, u.clear = function () {
				return ni(), u
			}, u.keyBinds = function (n) {
				return 0 === arguments.length ? r.keyBinds : (r.keyBinds = n, u)
			}, u.getMoment = function (n) {
				return g(n)
			}, u.debug = function (n) {
				if ("boolean" != typeof n) throw new TypeError("debug() expects a boolean parameter");
				return r.debug = n, u
			}, u.allowInputToggle = function (n) {
				if (0 === arguments.length) return r.allowInputToggle;
				if ("boolean" != typeof n) throw new TypeError("allowInputToggle() expects a boolean parameter");
				return r.allowInputToggle = n, u
			}, u.showClose = function (n) {
				if (0 === arguments.length) return r.showClose;
				if ("boolean" != typeof n) throw new TypeError("showClose() expects a boolean parameter");
				return r.showClose = n, u
			}, u.keepInvalid = function (n) {
				if (0 === arguments.length) return r.keepInvalid;
				if ("boolean" != typeof n) throw new TypeError("keepInvalid() expects a boolean parameter");
				return r.keepInvalid = n, u
			}, u.datepickerInput = function (n) {
				if (0 === arguments.length) return r.datepickerInput;
				if ("string" != typeof n) throw new TypeError("datepickerInput() expects a string parameter");
				return r.datepickerInput = n, u
			}, u.parseInputDate = function (n) {
				if (0 === arguments.length) return r.parseInputDate;
				if ("function" != typeof n) throw new TypeError("parseInputDate() sholud be as function");
				return r.parseInputDate = n, u
			}, u.disabledTimeIntervals = function (t) {
				if (0 === arguments.length) return r.disabledTimeIntervals ? n.extend({}, r.disabledTimeIntervals) : r.disabledTimeIntervals;
				if (!t) return r.disabledTimeIntervals = !1, a(), u;
				if (!(t instanceof Array)) throw new TypeError("disabledTimeIntervals() expects an array parameter");
				return r.disabledTimeIntervals = t, a(), u
			}, u.disabledHours = function (t) {
				if (0 === arguments.length) return r.disabledHours ? n.extend({}, r.disabledHours) : r.disabledHours;
				if (!t) return r.disabledHours = !1, a(), u;
				if (!(t instanceof Array)) throw new TypeError("disabledHours() expects an array parameter");
				if (r.disabledHours = fi(t), r.enabledHours = !1, r.useCurrent && !r.keepInvalid) {
					for (var i = 0; !c(e, "h");) {
						if (e.add(1, "h"), 24 === i) throw "Tried 24 times to find a valid date";
						i++
					}
					h(e)
				}
				return a(), u
			}, u.enabledHours = function (t) {
				if (0 === arguments.length) return r.enabledHours ? n.extend({}, r.enabledHours) : r.enabledHours;
				if (!t) return r.enabledHours = !1, a(), u;
				if (!(t instanceof Array)) throw new TypeError("enabledHours() expects an array parameter");
				if (r.enabledHours = fi(t), r.disabledHours = !1, r.useCurrent && !r.keepInvalid) {
					for (var i = 0; !c(e, "h");) {
						if (e.add(1, "h"), 24 === i) throw "Tried 24 times to find a valid date";
						i++
					}
					h(e)
				}
				return a(), u
			}, u.viewDate = function (n) {
				if (0 === arguments.length) return o.clone();
				if (!n) return o = e.clone(), u;
				if (!("string" == typeof n || t.isMoment(n) || n instanceof Date)) throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");
				return o = tt(n), ut(), u
			}, i.is("input")) s = i;
		else if (s = i.find(r.datepickerInput), 0 === s.length) s = i.find("input");
		else if (!s.is("input")) throw new Error('CSS class "' + r.datepickerInput + '" cannot be applied to non input element');
		if (i.hasClass("input-group") && (l = 0 === i.find(".datepickerbutton").length ? i.find(".input-group-addon") : i.find(".datepickerbutton")), !r.inline && !s.is("input")) throw new Error("Could not initialize DateTimePicker without an input element");
		return e = g(), o = e.clone(), n.extend(!0, r, li()), u.options(r), at(), fr(), s.prop("disabled") && u.disable(), s.is("input") && 0 !== s.val().trim().length ? h(tt(s.val().trim())) : r.defaultDate && void 0 === s.attr("placeholder") && h(r.defaultDate), r.inline && w(), u
	};
	return n.fn.datetimepicker = function (t) {
		t = t || {};
		var r, f = Array.prototype.slice.call(arguments, 1),
			u = !0;
		if ("object" == typeof t) return this.each(function () {
			var u, r = n(this);
			r.data("DateTimePicker") || (u = n.extend(!0, {}, n.fn.datetimepicker.defaults, t), r.data("DateTimePicker", i(r, u)))
		});
		if ("string" == typeof t) return this.each(function () {
			var e = n(this),
				i = e.data("DateTimePicker");
			if (!i) throw new Error('bootstrap-datetimepicker("' + t + '") method was called on an element that is not using DateTimePicker');
			r = i[t].apply(i, f);
			u = r === i
		}), u || n.inArray(t, ["destroy", "hide", "show", "toggle"]) > -1 ? this : r;
		throw new TypeError("Invalid arguments for DateTimePicker: " + t);
	}, n.fn.datetimepicker.defaults = {
		timeZone: "",
		format: !1,
		dayViewHeaderFormat: "MMMM YYYY",
		extraFormats: !1,
		stepping: 1,
		minDate: !1,
		maxDate: !1,
		useCurrent: !0,
		collapse: !0,
		locale: t.locale(),
		defaultDate: !1,
		disabledDates: !1,
		enabledDates: !1,
		icons: {
			time: "glyphicon glyphicon-time",
			date: "glyphicon glyphicon-calendar",
			up: "glyphicon glyphicon-chevron-up",
			down: "glyphicon glyphicon-chevron-down",
			previous: "glyphicon glyphicon-chevron-left",
			next: "glyphicon glyphicon-chevron-right",
			today: "glyphicon glyphicon-screenshot",
			clear: "glyphicon glyphicon-trash",
			close: "glyphicon glyphicon-remove"
		},
		tooltips: {
			today: "Go to today",
			clear: "Clear selection",
			close: "Close the picker",
			selectMonth: "Select Month",
			prevMonth: "Previous Month",
			nextMonth: "Next Month",
			selectYear: "Select Year",
			prevYear: "Previous Year",
			nextYear: "Next Year",
			selectDecade: "Select Decade",
			prevDecade: "Previous Decade",
			nextDecade: "Next Decade",
			prevCentury: "Previous Century",
			nextCentury: "Next Century",
			pickHour: "Pick Hour",
			incrementHour: "Increment Hour",
			decrementHour: "Decrement Hour",
			pickMinute: "Pick Minute",
			incrementMinute: "Increment Minute",
			decrementMinute: "Decrement Minute",
			pickSecond: "Pick Second",
			incrementSecond: "Increment Second",
			decrementSecond: "Decrement Second",
			togglePeriod: "Toggle Period",
			selectTime: "Select Time"
		},
		useStrict: !1,
		sideBySide: !1,
		daysOfWeekDisabled: !1,
		calendarWeeks: !1,
		viewMode: "days",
		toolbarPlacement: "default",
		showTodayButton: !1,
		showClear: !1,
		showClose: !1,
		widgetPositioning: {
			horizontal: "auto",
			vertical: "auto"
		},
		widgetParent: null,
		ignoreReadonly: !1,
		keepOpen: !1,
		focusOnShow: !0,
		inline: !1,
		keepInvalid: !1,
		datepickerInput: ".datepickerinput",
		keyBinds: {
			up: function (n) {
				if (n) {
					var t = this.date() || this.getMoment();
					n.find(".datepicker").is(":visible") ? this.date(t.clone().subtract(7, "d")) : this.date(t.clone().add(this.stepping(), "m"))
				}
			},
			down: function (n) {
				if (!n) return void this.show();
				var t = this.date() || this.getMoment();
				n.find(".datepicker").is(":visible") ? this.date(t.clone().add(7, "d")) : this.date(t.clone().subtract(this.stepping(), "m"))
			},
			"control up": function (n) {
				if (n) {
					var t = this.date() || this.getMoment();
					n.find(".datepicker").is(":visible") ? this.date(t.clone().subtract(1, "y")) : this.date(t.clone().add(1, "h"))
				}
			},
			"control down": function (n) {
				if (n) {
					var t = this.date() || this.getMoment();
					n.find(".datepicker").is(":visible") ? this.date(t.clone().add(1, "y")) : this.date(t.clone().subtract(1, "h"))
				}
			},
			left: function (n) {
				if (n) {
					var t = this.date() || this.getMoment();
					n.find(".datepicker").is(":visible") && this.date(t.clone().subtract(1, "d"))
				}
			},
			right: function (n) {
				if (n) {
					var t = this.date() || this.getMoment();
					n.find(".datepicker").is(":visible") && this.date(t.clone().add(1, "d"))
				}
			},
			pageUp: function (n) {
				if (n) {
					var t = this.date() || this.getMoment();
					n.find(".datepicker").is(":visible") && this.date(t.clone().subtract(1, "M"))
				}
			},
			pageDown: function (n) {
				if (n) {
					var t = this.date() || this.getMoment();
					n.find(".datepicker").is(":visible") && this.date(t.clone().add(1, "M"))
				}
			},
			enter: function () {
				this.hide()
			},
			escape: function () {
				this.hide()
			},
			"control space": function (n) {
				n && n.find(".timepicker").is(":visible") && n.find('.btn[data-action="togglePeriod"]').click()
			},
			t: function () {
				this.date(this.getMoment())
			},
			"delete": function () {
				this.clear()
			}
		},
		debug: !1,
		allowInputToggle: !1,
		disabledTimeIntervals: !1,
		disabledHours: !1,
		enabledHours: !1,
		viewDate: !1
	}, n.fn.datetimepicker
})
